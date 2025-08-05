import os
import glob
import re
from datetime import datetime

# --- Chemins réseau (à modifier si nécessaire) ---
SOURCE_COHOR_DIR = r"C:\Users\alexandre.gigante\OneDrive - DGAC\PlanifCharge\COHOR\LFLL"
DEST_DATA_DIR = r"C:\Users\alexandre.gigante\Documents\aiglon_démo"

def update_winter_cohor_data():
    """
    Met à jour le fichier winter_cohorData.js avec les données COHOR hiver les plus récentes.
    """
    print("Début de la mise à jour des données COHOR Hiver...")

    # 1. Trouver le fichier CSV hiver le plus récent
    search_pattern = os.path.join(SOURCE_COHOR_DIR, "*_LYS_W*.csv")
    list_of_files = glob.glob(search_pattern)

    if not list_of_files:
        print(f"Aucun fichier COHOR Hiver trouvé dans : {SOURCE_COHOR_DIR}")
        return

    latest_file = None
    latest_date = None

    for file_path in list_of_files:
        # Extraire la date du nom de fichier (format aaaammjj)
        match = re.search(r'(\d{8})_LYS_W', os.path.basename(file_path))
        if match:
            file_date_str = match.group(1)
            try:
                file_date = datetime.strptime(file_date_str, '%Y%m%d')
                if latest_date is None or file_date > latest_date:
                    latest_date = file_date
                    latest_file = file_path
            except ValueError:
                continue # Ignorer les fichiers avec des dates mal formées

    if not latest_file:
        print("Aucun fichier COHOR Hiver valide avec une date exploitable trouvé.")
        return

    print(f"Fichier COHOR Hiver le plus récent trouvé : {latest_file}")

    # 2. Lire le contenu du fichier CSV
    try:
        with open(latest_file, 'r', encoding='utf-8') as f:
            csv_content = f.read()
    except Exception as e:
        print(f"Erreur lors de la lecture du fichier CSV {latest_file} : {e}")
        return

    # 3. Échapper les backticks dans le contenu CSV pour JavaScript
    # Le contenu CSV est inséré dans un template literal (` `) en JS,
    # donc les backticks internes doivent être échappés.
    escaped_csv_content = csv_content.replace('`', '\\`')

    # 4. Mettre à jour le fichier winter_cohorData.js
    js_file_path = os.path.join(DEST_DATA_DIR, "winter_cohorData.js")

    try:
        with open(js_file_path, 'r', encoding='utf-8') as f:
            js_template = f.read()
    except FileNotFoundError:
        print(f"Le fichier modèle {js_file_path} n'a pas été trouvé. Création d'un nouveau fichier.")
        # Créer un modèle minimal si le fichier n'existe pas
        current_date = datetime.now().strftime('%Y-%m-%d')
        js_template = f"""/**
 * 📊 DONNÉES COHOR SAISON HIVER
 *
 * Ce fichier contient les données de trafic COHOR pour la saison hiver.
 *
 * 📍 ZONE DE MISE À JOUR : Le contenu de la variable window.winterCohorDataCSV
 */

// Variables globales accessibles depuis dataLoader.js
window.winterUpdateDate = "{current_date}";
window.winterCohorDataCSV = ``;

console.log('✅ Données COHOR hiver chargées');
"""
    except Exception as e:
        print(f"Erreur lors de la lecture du fichier modèle {js_file_path} : {e}")
        return

    # Utiliser une regex pour trouver et remplacer le contenu entre les backticks de window.winterCohorDataCSV
    # Assurez-vous que la regex est suffisamment spécifique pour ne pas remplacer d'autres backticks
    # La regex cherche `window.winterCohorDataCSV = ` suivi d'un backtick, puis capture tout jusqu'au prochain backtick.
    # Le flag re.DOTALL permet à . de correspondre aux retours à la ligne.
    # Mettre à jour la date et le contenu CSV
    current_date = datetime.now().strftime('%Y-%m-%d')
    
    # Vérifier si la variable updateDate existe déjà
    if 'window.winterUpdateDate' in js_template:
        # Mettre à jour la date existante
        updated_js_content = re.sub(
            r'(window\.winterUpdateDate = ")[^"]*(")',
            r'\g<1>' + current_date + r'\g<2>',
            js_template
        )
    else:
        # Ajouter la variable updateDate après le commentaire
        updated_js_content = re.sub(
            r'(// Variables globales accessibles depuis dataLoader\.js\n)',
            r'\g<1>window.winterUpdateDate = "' + current_date + '";\n',
            js_template
        )
    
    # Ensuite, mettre à jour le contenu CSV
    updated_js_content = re.sub(
        r"(window\.winterCohorDataCSV\s*=\s*`)(.*?)(`);",
        r"\g<1>" + escaped_csv_content + r"\g<3>",
        updated_js_content,
        flags=re.DOTALL
    )

    try:
        with open(js_file_path, 'w', encoding='utf-8') as f:
            f.write(updated_js_content)
        print(f"Mise à jour de {js_file_path} terminée avec succès.")
    except Exception as e:
        print(f"Erreur lors de l'écriture dans le fichier {js_file_path} : {e}")

if __name__ == "__main__":
    update_winter_cohor_data()