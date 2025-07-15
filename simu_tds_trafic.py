# -*- coding: utf-8 -*-
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import datetime
import pytz
import os
import re
from typing import Dict, Optional, Tuple, Callable
from collections import defaultdict
from pandas.api.indexers import FixedForwardWindowIndexer
import common_utils # Import the common_utils module

# --- Configuration & Constantes ---
LOCAL_TZ = pytz.timezone('Europe/Paris')
UTC_TZ = pytz.utc

# Noms de fichiers et répertoires
BASE_DIRECTORY_OUTPUTS = r"C:\Users\alexandre.gigante\Documents\planifcharge_python\outputs"
BASE_DIRECTORY_DATA = r"C:\Users\alexandre.gigante\Documents\planifcharge_python\sample_data"
TRAFFIC_FILENAME = 'bilan_creneau.csv'
STAFFING_MAP_FILENAME = 'MV_staffings.csv'
SIV_RULES_FILENAME = 'repartition_agents_SIV.csv'
GRILLES_DIR_NAME = 'grilles_vacations'
GRILLE_JSON_FILENAME_PREFIX = "Vacs_" # Prefix for JSON vacation grid files (e.g., Vacs_SemCha.json)

TRAFFIC_FILE_PATH = os.path.join(BASE_DIRECTORY_OUTPUTS, TRAFFIC_FILENAME)
STAFFING_MAP_FILE_PATH = os.path.join(BASE_DIRECTORY_DATA, STAFFING_MAP_FILENAME)
SIV_RULES_FILE_PATH = os.path.join(BASE_DIRECTORY_DATA, SIV_RULES_FILENAME)
GRILLES_DIR_PATH = os.path.join(BASE_DIRECTORY_DATA, GRILLES_DIR_NAME)

# Hypothèse SIV par défaut
DEFAULT_SIV_HYPOTHESIS = 'VFR fort'

# Types de vacations à demander à l'utilisateur
VACATION_TYPES = ['Je', 'J1', 'J2', 'J3', 'M1', 'M2', 'M3', 'S1', 'S2', 'N']
# Types de vacations fixes (1 agent chacun)
FIXED_VACATION_TYPES = {'MC': 1, 'JC': 1, 'NC': 1}

class SimuTDSCalculator:
    def __init__(self):
        self.staffing_lookup: Optional[Callable[[int], int]] = None
        self.siv_rules_data: Optional[pd.DataFrame] = None
        # self.loaded_vacation_grids: Dict[str, pd.DataFrame] = {} # Cache plus nécessaire, common_utils gère la sélection par date
        self.siv_period_mapping = {
            "Hiv": "période hiver",
            "Cha": "période chargée",
            "Cre": "période creuse",
        }
        self.siv_agents_col_name = "Nombre_agents_SIV"

    def _try_load_csv(self, filepath: str, sep: str = ';') -> Optional[pd.DataFrame]:
        """Tente de charger un CSV avec plusieurs encodages."""
        if not os.path.exists(filepath):
            print(f"[ERREUR] Fichier non trouvé: {filepath}")
            return None
        for encoding in ['utf-8-sig', 'utf-8', 'latin1', 'cp1252']:
            try:
                return pd.read_csv(filepath, sep=sep, encoding=encoding, dtype=str)
            except UnicodeDecodeError:
                continue
            except Exception as e:
                print(f"[WARNING] Erreur de lecture inattendue pour {filepath} avec {encoding}: {e}")
                continue
        print(f"[ERREUR] Impossible de lire {filepath} avec les encodages testés.")
        return None

    # Removed the local get_period_and_day_type, will use common_utils.get_period_and_day_type
    
    def load_staffing_map_once(self):
        """Charge la table d'armement (MV_staffings.csv) une seule fois."""
        if self.staffing_lookup is not None:
            return

        print(f"[GRAPHIQUE] Chargement de la table d'armement: {STAFFING_MAP_FILE_PATH}")
        df = self._try_load_csv(STAFFING_MAP_FILE_PATH)
        if df is None:
            raise FileNotFoundError(f"Le fichier de staffing map '{STAFFING_MAP_FILE_PATH}' est introuvable ou illisible.")

        try:
            df.columns = df.columns.str.strip()
            required_cols = ['Nombre agents disponibles', 'Avions max par heure']
            if not all(col in df.columns for col in required_cols):
                raise KeyError(f"Colonnes manquantes dans staffing map. Attendues: {required_cols}, Reçues: {df.columns.tolist()}")

            df['Nombre agents disponibles'] = pd.to_numeric(df['Nombre agents disponibles'])
            df['Avions max par heure'] = pd.to_numeric(df['Avions max par heure'])
            
            mapping = df.set_index('Nombre agents disponibles')['Avions max par heure'].to_dict()
            
            if not mapping:
                print("[ERREUR] Table d'armement vide ou mal formatée.")
                max_agents_in_map, max_capacity_in_map = 0, 0
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
                    return mapping.get(0, 0)
                else:
                    if not mapping: return 0
                    lower_keys = [k for k in mapping.keys() if k <= agents_rounded]
                    if not lower_keys: return mapping.get(0, 0)
                    return mapping[max(lower_keys)]
            
            self.staffing_lookup = lookup
            print(f"[OK] Table d'armement chargée ({len(mapping)} entrées).")
        except Exception as e:
            print(f"[ERREUR] Erreur lors du traitement de la table d'armement: {e}")
            raise

    def load_siv_rules_once(self):
        """Charge les règles SIV (repartition_agents_SIV.csv) une seule fois."""
        if self.siv_rules_data is not None:
            return

        print(f"[GRAPHIQUE] Chargement des règles SIV: {SIV_RULES_FILE_PATH}")
        df_siv = self._try_load_csv(SIV_RULES_FILE_PATH)
        if df_siv is None:
            print("[WARNING] Fichier SIV non chargé, aucune réduction SIV ne sera appliquée.")
            self.siv_rules_data = pd.DataFrame()
            return

        try:
            df_siv.columns = df_siv.columns.str.strip()
            original_siv_col_name = "Nombre d'agents SIV"
            if original_siv_col_name in df_siv.columns:
                df_siv.rename(columns={original_siv_col_name: self.siv_agents_col_name}, inplace=True)

            expected_cols = ['Type jour', 'Période', 'Hypothèse VFR', 'Heure UTC', self.siv_agents_col_name]
            if not all(col in df_siv.columns for col in expected_cols):
                print(f"[ERREUR] Colonnes SIV manquantes. Attendues (après renommage): {expected_cols}. Reçues: {df_siv.columns.tolist()}")
                self.siv_rules_data = pd.DataFrame()
                return

            df_siv['Heure UTC'] = df_siv['Heure UTC'].str.replace('h', ':', regex=False).str.strip()
            df_siv[self.siv_agents_col_name] = pd.to_numeric(df_siv[self.siv_agents_col_name], errors='coerce').fillna(0).astype(int)
            
            df_siv['Type jour'] = df_siv['Type jour'].str.strip()
            df_siv['Période'] = df_siv['Période'].str.strip()
            df_siv['Hypothèse VFR'] = df_siv['Hypothèse VFR'].str.strip()

            self.siv_rules_data = df_siv
            print(f"[OK] Règles SIV chargées ({len(self.siv_rules_data)} lignes).")
        except Exception as e:
            print(f"[ERREUR] Erreur lors du traitement des règles SIV: {e}")
            self.siv_rules_data = pd.DataFrame()

    def get_vacation_grid(self, date_obj: datetime.date) -> Optional[pd.DataFrame]:
        """
        Charge une grille de vacation spécifique à partir d'un fichier JSON
        en utilisant common_utils et la date_obj pour la sélection.
        """
        period_code, day_type = common_utils.get_period_and_day_type(date_obj, common_utils.get_holidays(date_obj.year, 'FR'))
        
        # Déterminer le nom du fichier JSON en fonction du type de jour et de la période
        # Utilise la période pour sélectionner le fichier, et le type de jour pour le nom du fichier
        # On suppose que les fichiers sont nommés Vacs_SemCha.json, Vacs_SamCha.json, Vacs_DimCha.json
        # Le fichier JSON est sélectionné en fonction du jour de la semaine et de la période (Cha, Cre, Hiv)
        
        # Mapping des types de jour aux noms de fichiers de grille
        day_type_to_file = {
            "Sem": "SemCha", # Par défaut pour Sem, sera ajusté par période
            "Sam": "SamCha", # Par défaut pour Sam, sera ajusté par période
            "Dim": "DimCha", # Par défaut pour Dim, sera ajusté par période
            "Férié": "DimCha" # Jours fériés utilisent la grille du dimanche
        }

        # Ajuster le nom du fichier en fonction de la période (Cha, Cre, Hiv)
        # Ceci est une simplification, si des grilles spécifiques à Hiv/Cre existent, elles devraient être gérées ici
        # Pour l'instant, on utilise les grilles "_Cha" par défaut.
        # Si des grilles comme Vacs_SemHiv.json existent, il faudrait une logique plus complexe.
        base_file_name = day_type_to_file.get(day_type, "SemCha") # Fallback to SemCha if day_type is unknown
        grid_json_filename = f"{GRILLE_JSON_FILENAME_PREFIX}{base_file_name}.json"
        
        grid_filepath = os.path.join(GRILLES_DIR_PATH, grid_json_filename)

        print(f"[DOCUMENT] Chargement de la grille de vacation JSON: {grid_filepath} pour la date {date_obj}")
        grille_vacation_dict = common_utils.load_grille_vacation_json(grid_filepath, date_obj)

        if grille_vacation_dict is None:
            print(f"[WARNING] Aucune grille de vacation trouvée ou sélectionnée pour {date_obj} dans {grid_filepath}.")
            return pd.DataFrame()
        
        # Extraire la liste 'Vacs' et la convertir en DataFrame
        vacs_data = grille_vacation_dict.get("Vacs", [])
        if not vacs_data:
            print(f"[WARNING] La section 'Vacs' est vide ou absente dans la grille pour {date_obj}.")
            return pd.DataFrame()

        # Convertir la liste de dictionnaires 'Vacs' en DataFrame
        df_grid = pd.DataFrame(vacs_data)

        # Assurer la présence des colonnes 'Vacation' et 'Priorité'
        if 'nom' not in df_grid.columns or 'cases' not in df_grid.columns:
            print(f"[ERREUR] Structure 'Vacs' inattendue dans {grid_json_filename}. Attendues: 'nom', 'cases'.")
            return pd.DataFrame()
        
        df_grid.rename(columns={'nom': 'Vacation'}, inplace=True)
        # La 'Priorité' est implicitement l'ordre dans la liste 'Vacs'
        df_grid['Priorité'] = df_grid.index 

        # Extraire les colonnes horaires de la première entrée (suppose que toutes ont la même structure)
        # et les ajouter comme colonnes au DataFrame
        time_cols = []
        if df_grid['cases'].iloc[0]: # Vérifier si 'cases' n'est pas vide
            # Les noms de colonnes sont les indices convertis en format HH:MM ou HH:MM:SS
            # Je vais extraire les 'cases' et les transformer en colonnes de temps
            # En supposant que 'cases' contient 96 entrées (15min * 96 = 24h)
            time_cols_list = []
            for i in range(96):
                hour = i // 4
                minute = (i % 4) * 15
                time_cols_list.append(f"{hour:02d}:{minute:02d}:00") # Assuming HH:MM:SS format
            
            # Expand 'cases' list into separate columns
            df_grid[time_cols_list] = pd.DataFrame(df_grid['cases'].tolist(), index=df_grid.index)
            time_cols = time_cols_list # Update time_cols
        
        # Supprimer la colonne 'cases' originale
        df_grid.drop(columns=['cases'], inplace=True)

        # Normaliser les noms de vacations dans la grille pour le matching
        df_grid['NormalizedVacation'] = df_grid['Vacation'].astype(str).str.strip().str.upper()
        
        # Ajouter les colonnes horaires détectées comme attribut pour un accès facile plus tard
        df_grid.attrs['time_cols'] = time_cols

        print(f"[OK] Grille {grid_json_filename} chargée ({len(df_grid)} lignes) pour {date_obj}.")
        return df_grid

    def _extract_simplified_vacation_type(self, vacation_str: str) -> Optional[str]:
        """Extrait un type de vacation simplifié depuis la chaîne."""
        if not vacation_str or pd.isna(vacation_str):
            return None
        
        vac_str = str(vacation_str).strip().upper()
        if not vac_str: return None

        if vac_str.startswith("NC"): return "NC"
        if vac_str.startswith("JC"): return "JC"
        if vac_str.startswith("MC"): return "MC"
        if vac_str.startswith("JE"): return "JE"
        if vac_str.startswith("N") and not vac_str.startswith("NC"): return "N"
        
        match_type = re.match(r'^([MJS])(\d+)', vac_str)
        if match_type:
            return f"{match_type.group(1)}{match_type.group(2)}"
        
        return vac_str.split(' ')[0]

    def _map_agents_to_grid_profiles(self, staff_data: Dict[str, int], grid_df: pd.DataFrame) -> list:
        """Mappe les agents aux profils de la grille de vacation."""
        if grid_df.empty:
            print("[INFO] Aucune grille trouvée.")
            return []

        agent_to_profile_map = []
        
        for vac_type, count in staff_data.items():
            if count == 0:
                continue
                
            candidate_grid_rows = pd.DataFrame()
            if vac_type in ["NC", "JC", "MC"]:
                candidate_grid_rows = grid_df[grid_df['NormalizedVacation'] == vac_type]
            elif vac_type == "N":
                candidate_grid_rows = grid_df[grid_df['NormalizedVacation'].str.match(r'^N(#\d+)?$') & (grid_df['NormalizedVacation'] != 'NC')]
            elif vac_type == "Je":
                candidate_grid_rows = grid_df[grid_df['NormalizedVacation'].str.match(r'^JE(#\d+)?$', case=False)]
            elif re.match(r'^[MJS]\d+$', vac_type):
                candidate_grid_rows = grid_df[grid_df['NormalizedVacation'].str.startswith(vac_type)]
            
            if candidate_grid_rows.empty:
                print(f"[WARNING] Aucun profil de grille trouvé pour le type '{vac_type}'")
                continue

            candidate_grid_rows = candidate_grid_rows.sort_index()
            num_candidate_profiles = len(candidate_grid_rows)

            for i in range(count):
                if i < num_candidate_profiles:
                    profile_to_assign = candidate_grid_rows.iloc[i]
                else:
                    profile_to_assign = candidate_grid_rows.iloc[-1]
                
                agent_to_profile_map.append((vac_type, profile_to_assign))
        
        return agent_to_profile_map

    def calculate_daily_capacity(self, staff_data: Dict[str, int], date_obj: datetime.date, siv_hypothesis: str) -> Dict[str, pd.Series]:
        """Calcule la capacité pour une journée donnée."""
        period_code, day_type = common_utils.get_period_and_day_type(date_obj, common_utils.get_holidays(date_obj.year, 'FR'))
        print(f"  Période: {period_code}, Type de jour: {day_type}")

        grid_df = self.get_vacation_grid(date_obj)
        time_cols_in_grid = grid_df.attrs.get('time_cols', [])

        if grid_df.empty or not time_cols_in_grid:
            print(f"[ERREUR] Grille de vacation vide ou sans colonnes horaires pour {day_type}/{period_code}.")
            start_ts = datetime.datetime.combine(date_obj, datetime.time(0, 0), tzinfo=UTC_TZ)
            empty_series = pd.Series(0.0, index=pd.date_range(start_ts, periods=96, freq='15min', tz=UTC_TZ))
            return {'sans_vic': empty_series.copy(), 'avec_vic': empty_series.copy()}

        agent_profile_mapping = self._map_agents_to_grid_profiles(staff_data, grid_df)
        if not agent_profile_mapping:
            print("[WARNING] Aucun agent n'a pu être mappé à un profil de grille.")
            start_ts = datetime.datetime.combine(date_obj, datetime.time(0, 0), tzinfo=UTC_TZ)
            empty_series = pd.Series(0.0, index=pd.date_range(start_ts, periods=96, freq='15min', tz=UTC_TZ))
            return {'sans_vic': empty_series.copy(), 'avec_vic': empty_series.copy()}
        
        print(f"  [OK] {len(agent_profile_mapping)} agents mappés à des profils de grille.")

        start_time_utc = datetime.datetime.combine(date_obj, datetime.time(0, 0), tzinfo=UTC_TZ)
        times_utc_index = pd.date_range(start_time_utc, periods=96, freq='15min', tz=UTC_TZ)
        
        active_agents_count_sans_vic = pd.Series(0, index=times_utc_index, dtype=int)
        active_agents_count_avec_vic = pd.Series(0, index=times_utc_index, dtype=int)

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

            agents_at_this_slot_sans_vic = 0
            agents_at_this_slot_avec_vic = 0

            for vac_type, grid_profile_row in agent_profile_mapping:
                agent_status_in_grid = grid_profile_row.get(current_time_col_in_grid, '0')
                if str(agent_status_in_grid).strip() == '1':
                    is_vic_agent = vac_type == 'JE'
                    if not is_vic_agent:
                        agents_at_this_slot_sans_vic += 1
                    agents_at_this_slot_avec_vic += 1

            siv_reduction_count = 0
            if self.siv_rules_data is not None and not self.siv_rules_data.empty:
                siv_period_val = self.siv_period_mapping.get(period_code)
                siv_time_utc_str = ts_utc.strftime('%H:%M')
                
                if siv_period_val:
                    rule = self.siv_rules_data[
                        (self.siv_rules_data['Période'] == siv_period_val) &
                        (self.siv_rules_data['Type jour'] == day_type) &
                        (self.siv_rules_data['Heure UTC'] == siv_time_utc_str) &
                        (self.siv_rules_data['Hypothèse VFR'] == siv_hypothesis)
                    ]
                    if not rule.empty:
                        siv_reduction_count = rule[self.siv_agents_col_name].iloc[0]
            
            active_agents_count_sans_vic.loc[ts_utc] = max(0, agents_at_this_slot_sans_vic - siv_reduction_count)
            active_agents_count_avec_vic.loc[ts_utc] = max(0, agents_at_this_slot_avec_vic - siv_reduction_count)

        capacity_15min_sans_vic = active_agents_count_sans_vic.apply(self.staffing_lookup)
        capacity_15min_avec_vic = active_agents_count_avec_vic.apply(self.staffing_lookup)

        indexer = FixedForwardWindowIndexer(window_size=4)
        hourly_avg_sans_vic = capacity_15min_sans_vic.rolling(window=indexer, min_periods=1).mean().fillna(6.0).round(2)
        hourly_avg_avec_vic = capacity_15min_avec_vic.rolling(window=indexer, min_periods=1).mean().fillna(6.0).round(2)
        
        return {
            'sans_vic': hourly_avg_sans_vic.reindex(times_utc_index, fill_value=0.0),
            'avec_vic': hourly_avg_avec_vic.reindex(times_utc_index, fill_value=0.0)
        }

def get_user_date():
    """Demande une date à l'utilisateur."""
    while True:
        date_input = input("Veuillez entrer une date (JJ/MM/AAAA): ")
        try:
            date_obj = datetime.datetime.strptime(date_input, '%d/%m/%Y')
            return date_input, date_obj
        except ValueError:
            print("Format de date invalide. Veuillez réessayer.")

def get_staff_input():
    """Demande les effectifs à l'utilisateur pour chaque type de vacation."""
    staff_data = {}
    print("\nVeuillez entrer le nombre d'agents pour chaque type de vacation :")
    for vac_type in VACATION_TYPES:
        while True:
            try:
                count = int(input(f"Nombre de {vac_type} : "))
                if count >= 0:
                    staff_data[vac_type] = count
                    break
                else:
                    print("Veuillez entrer un nombre positif ou zéro.")
            except ValueError:
                print("Veuillez entrer un nombre entier valide.")
    
    # Ajouter les vacations fixes
    staff_data.update(FIXED_VACATION_TYPES)
    return staff_data

def get_siv_hypothesis_input() -> str:
    """Demande à l'utilisateur l'hypothèse SIV."""
    valid_hypotheses = ['fermé', 'faible', 'moyen', 'fort']
    while True:
        siv_input = input(f"\nVeuillez entrer l'hypothèse SIV ({', '.join(valid_hypotheses)}) : ").strip().lower()
        if siv_input in valid_hypotheses:
            return f"VFR {siv_input}" # Format to match 'VFR fort', 'VFR faible', etc.
        else:
            print(f"Hypothèse SIV invalide. Veuillez choisir parmi {', '.join(valid_hypotheses)}.")

def format_staff_summary(staff_data: Dict[str, int]) -> str:
    """Formate le résumé des effectifs pour le sous-titre du graphique."""
    je_str = f"{staff_data['Je']} Je" if staff_data['Je'] > 0 else ""
    m_str = ", ".join([f"{staff_data[f'M{i}']}M{i}" for i in range(1, 4) if staff_data[f'M{i}'] > 0])
    j_str = ", ".join([f"{staff_data[f'J{i}']}J{i}" for i in range(1, 4) if staff_data[f'J{i}'] > 0])
    s_n_str = ", ".join([f"{staff_data[f'S{i}']}S{i}" for i in range(1, 3) if staff_data[f'S{i}'] > 0] + [f"{staff_data['N']}N" if staff_data['N'] > 0 else ""])
    
    summary_parts = [part for part in [je_str, m_str, j_str, s_n_str] if part]
    return "Effectifs: " + " / ".join(summary_parts)

def plot_capacity_with_traffic(df_capacity_sans_vic: pd.Series, df_capacity_avec_vic: pd.Series, df_traffic: pd.DataFrame, date_obj: datetime.datetime, staff_summary: str):
    """Génère le graphique de capacité et de trafic."""
    plt.style.use('seaborn-v0_8-whitegrid')
    fig, ax = plt.subplots(figsize=(18, 9))

    capacity_today_sans_vic = df_capacity_sans_vic
    capacity_today_avec_vic = df_capacity_avec_vic
    ax.step(capacity_today_sans_vic.index, capacity_today_sans_vic.values, where='post', 
            label='Capacité MV', color='blue', linewidth=2)
    ax.step(capacity_today_avec_vic.index, capacity_today_avec_vic.values, where='post',
            label='Capacité MV avec VIC', color='red', linestyle='--', linewidth=2)
    
    ax.set_ylabel("Capacité et Mouvements", color='black', fontsize=12)
    ax.tick_params(axis='y', labelcolor='black')

    if not df_traffic.empty:
        df_traffic['DATE'] = pd.to_datetime(df_traffic['DATE'])
        traffic_today = df_traffic[df_traffic['DATE'].dt.date == date_obj.date()].copy()
        
        if not traffic_today.empty:
            traffic_today['Heure_debut'] = traffic_today['CRENEAU_HORAIRE'].str.split(' - ').str[0].str.replace('h', ':')
            traffic_today['datetime'] = pd.to_datetime(traffic_today['DATE'].dt.strftime('%Y-%m-%d') + ' ' + traffic_today['Heure_debut'])
            
            indexer = FixedForwardWindowIndexer(window_size=4)
            traffic_today['ARR_LL_rolling'] = traffic_today['ARR_LL'].rolling(window=indexer, min_periods=1).sum()
            traffic_today['DEP_LL_rolling'] = traffic_today['DEP_LL'].rolling(window=indexer, min_periods=1).sum()
            traffic_today['TMA_mean_rolling'] = traffic_today['TMA_mean'].rolling(window=indexer, min_periods=1).sum()

            bar_width = pd.Timedelta(minutes=14)
            bar_centers = traffic_today['datetime']

            ax.bar(bar_centers, traffic_today['ARR_LL_rolling'], width=bar_width,
                   label='Arrivées LL (somme 60 min)', color='green', alpha=0.6, align='edge')
            ax.bar(bar_centers, traffic_today['DEP_LL_rolling'], width=bar_width,
                   bottom=traffic_today['ARR_LL_rolling'], 
                   label='Départs LL (somme 60 min)', color='firebrick', alpha=0.6, align='edge')
            bottom_for_tma = traffic_today['ARR_LL_rolling'] + traffic_today['DEP_LL_rolling']
            ax.bar(bar_centers, traffic_today['TMA_mean_rolling'], width=bar_width,
                   bottom=bottom_for_tma,
                   label='Trafic TMA (somme 60 min)', color='orange', alpha=0.6, align='edge')
        else:
            print(f"\nAucune donnée de trafic trouvée pour le {date_obj.strftime('%d/%m/%Y')}.")
    else:
        print(f"\nAucune donnée de trafic chargée.")

    title = f"Simulation du {date_obj.strftime('%d/%m/%Y')}"
    subtitle = staff_summary
    ax.set_title(title + "\n" + subtitle, fontsize=16, pad=20, loc='center', wrap=True)
    ax.set_xlabel("Heure (UTC)", fontsize=12)
    
    ax.xaxis.set_major_formatter(mdates.DateFormatter('%H:%M'))
    ax.xaxis.set_major_locator(mdates.HourLocator(interval=1))
    ax.xaxis.set_minor_locator(mdates.MinuteLocator(byminute=range(0, 60, 15)))
    plt.setp(ax.get_xticklabels(), rotation=45, ha="right")

    ax.set_ylim(bottom=0)

    lines, labels = ax.get_legend_handles_labels()
    ax.legend(lines, labels, loc='upper left', fontsize=10)

    ax.grid(True, which='both', linestyle='--', linewidth=0.5)
    plt.tight_layout()
    print("\nAffichage du graphique combiné (Capacité + Trafic)...")
    plt.show()

def main():
    date_str_fr, date_obj = get_user_date()
    staff_data = get_staff_input()
    staff_summary = format_staff_summary(staff_data)
    print(f"\nRésumé des effectifs : {staff_summary}")
    
    siv_hypothesis = get_siv_hypothesis_input()
    print(f"\nHypothèse SIV sélectionnée : {siv_hypothesis}")

    calculator = SimuTDSCalculator()
    try:
        calculator.load_staffing_map_once()
        calculator.load_siv_rules_once()
        
        if calculator.staffing_lookup is None:
            print("[ERREUR] Arrêt car la table d'armement n'a pas pu être chargée.")
            return

        daily_capacities = calculator.calculate_daily_capacity(staff_data, date_obj.date(), siv_hypothesis)
        
        print(f"Chargement du fichier de trafic : {TRAFFIC_FILE_PATH}")
        df_traffic = calculator._try_load_csv(TRAFFIC_FILE_PATH)
        if df_traffic is None:
            print(f"[WARNING] Fichier de trafic non trouvé ou illisible. Le graphique affichera uniquement la capacité.")
            df_traffic = pd.DataFrame()

        plot_capacity_with_traffic(daily_capacities['sans_vic'], daily_capacities['avec_vic'], df_traffic, date_obj, staff_summary)

    except Exception as e:
        print(f"Une erreur inattendue est survenue : {e}")

if __name__ == "__main__":
    print("[SIMULATION] Simulateur TDS Trafic LFLL")
    print("=" * 50)
    main()
    print("\n--- Fin du script ---")
