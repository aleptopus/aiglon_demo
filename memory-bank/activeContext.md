# Contexte Actuel :

*   **Problème de filtre de date :** Résolu. Le comptage des jours et les moyennes de trafic sont maintenant corrects grâce à l'utilisation cohérente des dates UTC.
*   **Comportement par défaut au démarrage :** L'application affiche par défaut les données du jour actuel, avec la date de fin également définie sur le jour actuel, et la grille de vacation appropriée est sélectionnée.
*   **Incohérence du calcul de capacité :** Résolu. La logique de sélection des agents a été ajustée pour respecter la sélection personnalisée de l'utilisateur et la sélection automatique par défaut a été alignée sur les attentes de l'utilisateur (3 Je / 7 M / 7 J / 8 SN).
*   **Bug d'affichage TMA :** Résolu. Les données TMA sont maintenant correctement agrégées et affichées dans le graphique et le résumé.
*   **Bug de calcul TMA :** Corrigé. La logique de calcul du TMA dans `updateMainChart`, `updateSummaryCards`, et `updateSummaryTable` a été restaurée à la logique initiale, assurant une agrégation correcte des valeurs TMA (somme des occurrences uniques par créneau horaire, sans division par `numDays` dans `calculateRollingSum` pour le TMA).

**Changements Récents :**

*   **`script.js`** :
    *   Correction d'une faute de frappe dans `document.getElementById('dateEndInput')`.
    *   Dans `handleCohorFile()`, ajout de la logique pour effacer les données TMA (`state.tmaMap.clear()`) et réinitialiser l'affichage du nom du fichier TMA (`elements.jsonName.textContent = 'Aucun fichier'`) lors du chargement d'un nouveau fichier COHOR.
    *   Dans `initializeApplication()`, la détermination de `initialDate` pour la source 'cohor' utilise maintenant `state.combinedData` pour obtenir la plage de dates correcte.
    *   Correction du calcul de `numDays` dans `updateDashboard` pour les données COHOR, afin qu'il prenne en compte le filtrage par date et jour de la semaine.
    *   Restauration de la logique de calcul initiale pour le TMA dans `updateMainChart`, `updateSummaryCards`, et `updateSummaryTable`, assurant une agrégation correcte des valeurs TMA (somme des occurrences uniques par créneau horaire, sans division par `numDays` dans `calculateRollingSum` pour le TMA).
    *   Les fonctions `updateSummaryCards` et `updateSummaryTable` ont été ajustées pour utiliser la logique d'agrégation correcte du TMA (somme des occurrences uniques par jour).
    *   Correction de la catégorisation du trafic LFLU (LU) dans `processPredictNMFile` pour regrouper les arrivées et départs LFLU sous 'départs_LU'.

**Changements Récents (28/07/2025) :**

*   **Correction du calcul et du nommage du trafic "LU" dans `processPredictNMFile` :**
    *   Le label "départs_LU" a été renommé en "LU".
    *   La logique de catégorisation a été ajustée pour regrouper correctement tous les vols impliquant l'aéroport LFLU, que ce soit en arrivée, départ, ou transit.
*   **Correction du bug d'affichage de la liste des vols Predict NM :**
    *   Le bouton "Afficher/Masquer" pour la liste des vols Predict NM a été déplacé en dehors du conteneur qu'il contrôle pour éviter les conflits.
    *   L'état initial du bouton a été ajusté pour refléter l'état caché de la liste.

**Prochaines Étapes :**
*   Mettre à jour `memory-bank/techContext.md` pour inclure `Chart.js` et `D3.js`.
*   Mettre à jour `memory-bank/progress.md` pour refléter les tâches résolues concernant les bugs de calcul et d'affichage du TMA, ainsi que la gestion des dates et fuseaux horaires.
