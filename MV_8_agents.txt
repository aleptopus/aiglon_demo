# -*- coding: utf-8 -*-
import pandas as pd
import datetime
import pytz
import os
import re
from typing import Dict, Optional, Tuple, List, Callable
import traceback
from collections import defaultdict

# --- Configuration & Constantes ---
LOCAL_TZ = pytz.timezone('Europe/Paris')
UTC_TZ = pytz.utc

# Définition des périodes
PERIODS = {
    "Hiv": [("01-01", "05-04"), ("12-13", "12-31")],
    "Cha": [("05-05", "10-13")],
    "Cre": [("10-14", "12-12")],
}
GRILLE_FILE_PATTERN = "Vacs_{}{}.csv" # Ex: Vacs_SemCha.csv

# Noms de fichiers (à placer dans le dossier du script)
STAFFING_MAP_FILENAME = "MV_staffings.csv"
SIV_RULES_FILENAME = "repartition_agents_SIV.csv"
GRILLES_DIR_NAME = "grilles_vacations" # Ce dossier restera un sous-dossier DANS le dossier du script

# Hypothèse SIV par défaut
DEFAULT_SIV_HYPOTHESIS = 'VFR fort'


class LFLLCapacityCalculator:
    def __init__(self, base_dir: str, output_dir: str = "outputs"):
        """
        Initialise le calculateur de capacité.
        :param base_dir: Le chemin du dossier où se trouvent le script et les fichiers de données.
        :param output_dir: Le chemin du dossier pour les fichiers de sortie.
        """
        self.base_dir = base_dir
        self.output_dir = os.path.join(self.base_dir, output_dir) # Créer le dossier "outputs" DANS le dossier du script

        os.makedirs(self.output_dir, exist_ok=True)
        
        # Le dossier des grilles est un sous-dossier de base_dir
        self.grids_abs_dir = os.path.join(self.base_dir, GRILLES_DIR_NAME)
        os.makedirs(self.grids_abs_dir, exist_ok=True) # Assure que le dossier des grilles existe

        # Les fichiers de données sont directement dans base_dir
        self.staffing_map_file_path = os.path.join(self.base_dir, STAFFING_MAP_FILENAME)
        self.siv_rules_file_path = os.path.join(self.base_dir, SIV_RULES_FILENAME)

        self.staffing_lookup: Optional[Callable[[int], int]] = None
        self.siv_rules_data: Optional[pd.DataFrame] = None
        self.loaded_vacation_grids: Dict[str, pd.DataFrame] = {}

        self.siv_period_mapping = {
            "Hiv": "période hiver",
            "Cha": "période chargée",
            "Cre": "période creuse",
        }
        self.siv_agents_col_name = "Nombre_agents_SIV"


    def _try_load_csv(self, filepath: str, sep: str = ';') -> Optional[pd.DataFrame]:
        """Tente de charger un CSV avec plusieurs encodages."""
        if not os.path.exists(filepath):
            print(f"❌ Fichier non trouvé: {filepath}")
            return None
        for encoding in ['utf-8-sig', 'utf-8', 'latin1', 'cp1252']:
            try:
                return pd.read_csv(filepath, sep=sep, encoding=encoding, dtype=str)
            except UnicodeDecodeError:
                continue
            except Exception as e:
                print(f"⚠️ Erreur de lecture inattendue pour {filepath} avec {encoding}: {e}")
                continue
        print(f"❌ Impossible de lire {filepath} avec les encodages testés.")
        return None

    def get_period_and_day_type(self, date_obj: datetime.date) -> Tuple[str, str]:
        """Détermine la période et le type de jour."""
        date_month_day = date_obj.strftime("%m-%d")
        period_name = None
        for name, date_ranges in PERIODS.items():
            for start_str, end_str in date_ranges:
                if start_str > end_str:
                    if date_month_day >= start_str or date_month_day <= end_str:
                        period_name = name; break
                elif start_str <= date_month_day <= end_str:
                    period_name = name; break
            if period_name: break
        if not period_name:
            if date_obj.month <= 4: period_name = "Hiv"
            elif date_obj.month <= 9: period_name = "Cha"
            else: period_name = "Cre"
            print(f"⚠️ Date {date_obj.strftime('%Y-%m-%d')} hors période explicitement définie. Utilisation de fallback: {period_name}")

        day_type = "Sem" if 0 <= date_obj.weekday() <= 4 else ("Sam" if date_obj.weekday() == 5 else "Dim")
        return period_name, day_type

    def load_staffing_map_once(self):
        """Charge la table d'armement (MV_staffings.csv) une seule fois."""
        if self.staffing_lookup is not None:
            return

        print(f"📊 Chargement de la table d'armement: {self.staffing_map_file_path}")
        df = self._try_load_csv(self.staffing_map_file_path)
        if df is None:
            raise FileNotFoundError(f"Le fichier de staffing map '{self.staffing_map_file_path}' est introuvable ou illisible.")

        try:
            df.columns = df.columns.str.strip()
            required_cols = ['Nombre agents disponibles', 'Avions max par heure']
            if not all(col in df.columns for col in required_cols):
                raise KeyError(f"Colonnes manquantes dans staffing map. Attendues: {required_cols}, Reçues: {df.columns.tolist()}")

            df['Nombre agents disponibles'] = pd.to_numeric(df['Nombre agents disponibles'])
            df['Avions max par heure'] = pd.to_numeric(df['Avions max par heure'])
            
            mapping = df.set_index('Nombre agents disponibles')['Avions max par heure'].to_dict()
            
            if not mapping:
                print("❌ Table d'armement vide ou mal formatée.")
                max_agents_in_map, max_capacity_in_map = 0,0
            else:
                max_agents_in_map = max(mapping.keys()) if mapping else 0
                max_capacity_in_map = mapping.get(max_agents_in_map, 0) if mapping else 0

            def lookup(agents_count: float) -> int:
                agents_rounded = max(0, int(round(agents_count)))
                if agents_rounded in mapping:
                    return mapping[agents_rounded]
                elif agents_rounded > max_agents_in_map and mapping:
                    return max_capacity_in_map
                elif agents_rounded < min(mapping.keys()) and mapping:
                    return mapping.get(0,0)
                else:
                    if not mapping: return 0
                    lower_keys = [k for k in mapping.keys() if k <= agents_rounded]
                    if not lower_keys: return mapping.get(0,0)
                    return mapping[max(lower_keys)]
            
            self.staffing_lookup = lookup
            print(f"✓ Table d'armement chargée ({len(mapping)} entrées).")
        except Exception as e:
            print(f"❌ Erreur lors du traitement de la table d'armement: {e}")
            traceback.print_exc()
            raise

    def load_siv_rules_once(self):
        """Charge les règles SIV (repartition_agents_SIV.csv) une seule fois."""
        if self.siv_rules_data is not None:
            return

        print(f"📊 Chargement des règles SIV: {self.siv_rules_file_path}")
        df_siv = self._try_load_csv(self.siv_rules_file_path)
        if df_siv is None:
            print("⚠️ Fichier SIV non chargé, aucune réduction SIV ne sera appliquée.")
            self.siv_rules_data = pd.DataFrame()
            return

        try:
            df_siv.columns = df_siv.columns.str.strip()
            original_siv_col_name = "Nombre d'agents SIV"
            if original_siv_col_name in df_siv.columns:
                df_siv.rename(columns={original_siv_col_name: self.siv_agents_col_name}, inplace=True)

            expected_cols = ['Type jour', 'Période', 'Hypothèse VFR', 'Heure UTC', self.siv_agents_col_name]
            if not all(col in df_siv.columns for col in expected_cols):
                print(f"  ❌ Colonnes SIV manquantes. Attendues (après renommage): {expected_cols}. Reçues: {df_siv.columns.tolist()}")
                self.siv_rules_data = pd.DataFrame()
                return

            df_siv['Heure UTC'] = df_siv['Heure UTC'].str.replace('h', ':', regex=False).str.strip()
            df_siv[self.siv_agents_col_name] = pd.to_numeric(df_siv[self.siv_agents_col_name], errors='coerce').fillna(0).astype(int)
            
            # Standardisation des valeurs pour faciliter les jointures
            df_siv['Type jour'] = df_siv['Type jour'].str.strip()
            df_siv['Période'] = df_siv['Période'].str.strip()
            df_siv['Hypothèse VFR'] = df_siv['Hypothèse VFR'].str.strip()

            self.siv_rules_data = df_siv
            print(f"✓ Règles SIV chargées ({len(self.siv_rules_data)} lignes).")
        except Exception as e:
            print(f"❌ Erreur lors du traitement des règles SIV: {e}")
            traceback.print_exc()
            self.siv_rules_data = pd.DataFrame()

    def get_vacation_grid(self, period_code: str, day_type: str) -> Optional[pd.DataFrame]:
        """Charge une grille de vacation spécifique si pas déjà en cache, ou la retourne du cache."""
        grid_filename = GRILLE_FILE_PATTERN.format(day_type, period_code)
        grid_filepath = os.path.join(self.grids_abs_dir, grid_filename)

        if grid_filename in self.loaded_vacation_grids:
            return self.loaded_vacation_grids[grid_filename]

        print(f"📄 Chargement de la grille de vacation: {grid_filepath}")
        df_grid = self._try_load_csv(grid_filepath)
        if df_grid is None:
            print(f"⚠️ Grille {grid_filename} non trouvée ou illisible. Les agents pour {day_type}/{period_code} ne seront pas planifiés.")
            self.loaded_vacation_grids[grid_filename] = pd.DataFrame()
            return pd.DataFrame()
        
        df_grid.columns = df_grid.columns.str.strip()
        if 'Vacation' not in df_grid.columns or 'Priorité' not in df_grid.columns:
            print(f"❌ Colonnes 'Vacation' ou 'Priorité' manquantes dans {grid_filename}.")
            self.loaded_vacation_grids[grid_filename] = pd.DataFrame()
            return pd.DataFrame()
        
        df_grid['Priorité'] = pd.to_numeric(df_grid['Priorité'], errors='coerce').fillna(9999).astype(int)

        df_grid['NormalizedVacation'] = df_grid['Vacation'].astype(str).str.strip().str.upper()
        df_grid.attrs['time_cols'] = [col for col in df_grid.columns if re.match(r'^\d{2}:\d{2}(:\d{2})?$', col)]

        self.loaded_vacation_grids[grid_filename] = df_grid
        print(f"✓ Grille {grid_filename} chargée ({len(df_grid)} lignes).")
        return df_grid

    def _map_agents_to_grid_profiles(self, grid_df: pd.DataFrame) -> Dict[int, pd.Series]:
        """
        Simule la sélection des agents basés sur les règles fixes:
        Les 7 premières vacations par ordre de priorité, hors types 'Chef' (JC, MC, NC).
        """
        if grid_df.empty:
            print("  Grille de vacation vide, aucun agent simulé.")
            return {}

        agent_profile_map = {}
        agent_id_counter = 0

        # S'assurer que la grille est triée par priorité
        grid_df_sorted = grid_df.sort_values(by='Priorité', ascending=True)

        # Exclure les vacations de type "chef" (JC, MC, NC)
        chef_vacations = ['JC', 'MC', 'NC']
        non_chef_profiles = grid_df_sorted[
            ~grid_df_sorted['NormalizedVacation'].isin(chef_vacations)
        ]

        # Sélectionner les 7 premiers profils restants
        selected_profiles = non_chef_profiles.head(7)

        if selected_profiles.empty:
            print("  ⚠️ Aucun profil non-chef disponible ou assez de profils pour la simulation.")
            return {}

        for _, profile_row in selected_profiles.iterrows():
            agent_profile_map[agent_id_counter] = profile_row
            agent_id_counter += 1

        print(f"  ✓ Simulé {len(agent_profile_map)} agents (7 premiers hors chef) mappés à des profils de grille.")
        return agent_profile_map

    def calculate_daily_capacity(self, date_obj: datetime.date) -> pd.Series:
        """Calcule la capacité pour une journée donnée en utilisant les agents simulés."""
        
        period_code, day_type = self.get_period_and_day_type(date_obj)
        print(f"  Période: {period_code}, Type de jour: {day_type}")

        grid_df = self.get_vacation_grid(period_code, day_type)
        time_cols_in_grid = grid_df.attrs.get('time_cols', [])

        if grid_df.empty or not time_cols_in_grid:
            print(f"  ❌ Grille de vacation vide ou sans colonnes horaires pour {day_type}/{period_code}.")
            start_ts = datetime.datetime.combine(date_obj, datetime.time(0, 0), tzinfo=UTC_TZ)
            return pd.Series(0.0, index=pd.date_range(start_ts, periods=96, freq='15min', tz=UTC_TZ))

        agent_profile_mapping = self._map_agents_to_grid_profiles(grid_df)
        if not agent_profile_mapping:
            print("  ⚠️ Aucun agent simulé n'a pu être mappé à un profil de grille.")
            start_ts = datetime.datetime.combine(date_obj, datetime.time(0, 0), tzinfo=UTC_TZ)
            return pd.Series(0.0, index=pd.date_range(start_ts, periods=96, freq='15min', tz=UTC_TZ))
        
        start_time_utc = datetime.datetime.combine(date_obj, datetime.time(0, 0), tzinfo=UTC_TZ)
        times_utc_index = pd.date_range(start_time_utc, periods=96, freq='15min', tz=UTC_TZ)
        
        active_agents_count = pd.Series(0, index=times_utc_index, dtype=int)

        for ts_utc in times_utc_index:
            ts_local = ts_utc.astimezone(LOCAL_TZ)
            local_time_str_hms = ts_local.strftime('%H:%M:%S')
            local_time_str_hm = ts_local.strftime('%H:%M')

            current_time_col_in_grid = None
            if local_time_str_hms in time_cols_in_grid:
                current_time_col_in_grid = local_time_str_hms
            elif local_time_str_hm in time_cols_in_grid:
                current_time_col_in_grid = local_time_str_hm
            
            if not current_time_col_in_grid:
                continue

            agents_at_this_slot = 0
            for _, grid_profile_row in agent_profile_mapping.items():
                agent_status_in_grid = grid_profile_row.get(current_time_col_in_grid, '0')
                if str(agent_status_in_grid).strip() == '1':
                    agents_at_this_slot += 1

            # Appliquer la réduction SIV
            siv_reduction_count = 0
            if self.siv_rules_data is not None and not self.siv_rules_data.empty:
                siv_period_val = self.siv_period_mapping.get(period_code)
                siv_time_utc_str = ts_utc.strftime('%H:%M')
                
                if siv_period_val:
                    rule = self.siv_rules_data[
                        (self.siv_rules_data['Période'] == siv_period_val) &
                        (self.siv_rules_data['Type jour'] == day_type) &
                        (self.siv_rules_data['Heure UTC'] == siv_time_utc_str) &
                        (self.siv_rules_data['Hypothèse VFR'] == DEFAULT_SIV_HYPOTHESIS)
                    ]
                    if not rule.empty:
                        siv_reduction_count = rule[self.siv_agents_col_name].iloc[0]
            
            active_agents_count.loc[ts_utc] = max(0, agents_at_this_slot - siv_reduction_count)
            
        # Convertir nombre d'agents en capacité instantanée
        capacity_15min = active_agents_count.apply(self.staffing_lookup)

        # Moyenne glissante horaire avec décalage de 3 périodes (45 min) pour aligner
        hourly_avg = capacity_15min.rolling(window=4, min_periods=1).mean().shift(-3).fillna(6.0).round(2)
        
        return hourly_avg.reindex(times_utc_index, fill_value=0.0)

    def process_all_days(self):
        """Traite tous les jours définis et génère le fichier de capacité."""
        self.load_staffing_map_once()
        self.load_siv_rules_once()

        if self.staffing_lookup is None:
            print("❌ Arrêt car la table d'armement n'a pas pu être chargée.")
            return

        from datetime import date, timedelta
        start_date = date.today()
        end_date = start_date + timedelta(days=4)
        unique_dates = [start_date + timedelta(days=i) for i in range((end_date - start_date).days + 1)]

        all_results = []
        print(f"\n📅 Traitement de {len(unique_dates)} jours simulés ({start_date} au {end_date})...")

        for i, date_obj in enumerate(unique_dates, 1):
            print(f"\n--- Jour {i}/{len(unique_dates)}: {date_obj.strftime('%Y-%m-%d')} ---")
            
            try:
                daily_capacities = self.calculate_daily_capacity(date_obj)
                
                for timestamp in daily_capacities.index:
                    all_results.append({
                        'Date': date_obj.strftime('%Y-%m-%d'),
                        'Heure UTC': timestamp.strftime('%H:%M:%S'),
                        'Capacité MV': daily_capacities[timestamp]
                    })
                avg_cap_day = daily_capacities.mean()
                print(f"  ✓ Capacité moyenne (simulée) pour {date_obj}: {avg_cap_day:.2f}")
            except Exception as e_day:
                print(f"  ❌ Erreur lors du traitement du {date_obj}: {e_day}")
                traceback.print_exc()
                # Remplir avec des zéros pour ce jour en cas d'erreur
                start_ts = datetime.datetime.combine(date_obj, datetime.time(0, 0), tzinfo=UTC_TZ)
                for j in range(96):
                    timestamp = start_ts + datetime.timedelta(minutes=j * 15)
                    all_results.append({
                        'Date': date_obj.strftime('%Y-%m-%d'),
                        'Heure UTC': timestamp.strftime('%H:%M:%S'),
                        'Capacité MV': 0.0
                    })
        
        if not all_results:
            print("\n⚠️ Aucun résultat généré après traitement de tous les jours.")
            return

        results_df = pd.DataFrame(all_results)
        output_filename = "LFLL_MV_inf_simule.csv"
        # Le fichier de sortie sera créé dans le sous-dossier "outputs" qui est lui-même dans base_dir
        output_filepath = os.path.join(self.output_dir, output_filename)
        
        try:
            results_df.to_csv(output_filepath, sep=';', index=False, encoding='utf-8-sig', decimal='.')
            print(f"\n✅ Fichier de résultats généré: {output_filepath}")
            print(f"   {len(results_df)} lignes écrites.")
            if not results_df.empty:
                print(f"   Capacité MV moyenne globale (simulée): {results_df['Capacité MV'].mean():.2f}")
        except Exception as e_save:
            print(f"❌ Erreur lors de la sauvegarde des résultats: {e_save}")

# --- Logique d'Exécution Principale ---
if __name__ == "__main__":
    print("🛫 Calculateur de Capacité LFLL (Simulation d'Effectifs) 🛫")
    print("=" * 65)
    
    # Obtient le répertoire où le script est exécuté
    script_dir = os.path.dirname(os.path.abspath(__file__))

    try:
        # Tous les fichiers .csv (sauf le dossier 'grilles_vacations') sont attendus directement
        # dans le dossier 'script_dir'. Le dossier 'grilles_vacations' sera un sous-dossier.
        calculator = LFLLCapacityCalculator(base_dir=script_dir, output_dir="outputs")
        calculator.process_all_days()
    except Exception as e:
        print(f"\n❌ ERREUR GLOBALE INATTENDUE DANS LE SCRIPT PRINCIPAL: {e}")
        traceback.print_exc()

    print("\n--- Fin du script ---")