import os

# --- Chemins réseau (à modifier si nécessaire) ---
SOURCE_NM_DIR = r"C:\Users\alexandre.gigante\Documents\NM B2B\LOAD"
DEST_DATA_DIR = r"C:\Users\alexandre.gigante\Documents\aiglon_démo"

def generer_contenu_js(jour_index, data_content):
    """
    Génère le contenu complet d'un fichier JavaScript en utilisant un modèle
    basé sur l'exemple fourni.

    Args:
        jour_index (int): L'index du jour (0 pour J+0, 1 pour J+1, etc.).
        data_content (str): Les données brutes (déjà échappées) à insérer.

    Returns:
        str: Le contenu complet du fichier .js prêt à être écrit.
    """
    if jour_index == 0:
        # Cas spécial pour J+0
        description_jour = "J+0 (Jour même)"
        nom_constante = "nmPredictRawData"
        nom_variable_window = f"nmpredictj{jour_index}Data"
        commentaire_zone = "nmPredictRawData"
    else:
        # Cas général pour J+1, J+2, etc.
        description_jour = f"J+{jour_index}"
        nom_constante = f"nmpredictj{jour_index}Data"
        nom_variable_window = nom_constante
        commentaire_zone = nom_constante

    # Modèle (template) du fichier JS, rempli avec les bonnes informations
    js_template = f"""/**
 * 📊 DONNÉES NM PREDICT {description_jour}
 *
 * Ce fichier contient les données Predict NM pour le jour {description_jour}.
 * Utilisé par le bouton "NM Predict"
 *
 * 📍 ZONE DE COPIER-COLLER : Remplacer le contenu de la variable {commentaire_zone} ci-dessous
 *
 * Format : Copier-coller directement le contenu de votre fichier NM Predict
 * (ligne JSON de métadonnées + données CSV avec en-têtes)
 */

const {nom_constante} = `{data_content}`;

// ⬇️ COLLER VOS DONNÉES NM PREDICT {description_jour} ICI - Remplacer tout le contenu entre les backticks ci-dessus ⬇️
// Copier-coller directement votre fichier NM Predict complet (ligne JSON + données CSV)
// ⬆️ FIN DE LA ZONE DE COPIER-COLLER ⬆️

// Export pour utilisation dans d'autres fichiers
//export default {nom_constante};

// Exposer les données via une variable globale
window.{nom_variable_window} = {nom_constante};

console.log('✅ Données NM Predict {description_jour} chargées');
"""
    return js_template

def update_nm_predict_data():
    """
    Génère les fichiers nmpredictjXData.js (X de 0 à 4) avec les données NM Predict
    en utilisant une structure de fichier prédéfinie.
    """
    print("Début de la mise à jour des données NM Predict...")
    
    # S'assurer que le dossier de destination existe
    os.makedirs(DEST_DATA_DIR, exist_ok=True)

    for i in range(5):
        source_file_name = f"predict_j{i}.txt"
        source_file_path = os.path.join(SOURCE_NM_DIR, source_file_name)
        dest_file_name = f"nmpredictj{i}Data.js"
        dest_file_path = os.path.join(DEST_DATA_DIR, dest_file_name)

        print(f"\nTraitement de {source_file_name} -> {dest_file_name}")

        # 1. Lire le contenu du fichier source .txt
        try:
            with open(source_file_path, 'r', encoding='utf-8') as f:
                nm_data_content = f.read()
        except FileNotFoundError:
            print(f"Fichier source non trouvé : {source_file_path}. Passage au suivant.")
            continue
        except Exception as e:
            print(f"Erreur lors de la lecture du fichier source {source_file_path} : {e}")
            continue

        # 2. Échapper les backticks (apostrophes inverses) pour JavaScript
        escaped_nm_data_content = nm_data_content.replace('`', '\\`')

        # 3. Générer le contenu JS complet à partir de notre modèle
        updated_js_content = generer_contenu_js(i, escaped_nm_data_content)

        # 4. Écrire le contenu généré dans le fichier de destination (l'écrase s'il existe)
        try:
            with open(dest_file_path, 'w', encoding='utf-8') as f:
                f.write(updated_js_content)
            print(f"Fichier {dest_file_path} généré avec succès.")
        except Exception as e:
            print(f"Erreur lors de l'écriture dans le fichier {dest_file_path} : {e}")

if __name__ == "__main__":
    update_nm_predict_data()