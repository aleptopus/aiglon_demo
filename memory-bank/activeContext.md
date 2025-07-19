**Contexte Actuel :**

*   **Problème de filtre de date :** L'utilisateur a signalé qu'en sélectionnant une date de début (ex: 19 juillet) et une date de fin (ex: 20 juillet), l'application affichait les données du 20 juillet (dimanche). L'attente est que pour une plage d'un seul jour (date de début = date de fin), seules les données de ce jour soient affichées, et que la grille de vacation correspondante soit sélectionnée.
*   **Comportement par défaut au démarrage :** L'utilisateur souhaite que l'application affiche par défaut les données du jour actuel (ex: 19 juillet), avec la date de fin également définie sur le jour actuel, et que la grille "Samedi Chargé" soit sélectionnée si le jour est un samedi.
*   **Incohérence du calcul de capacité :** L'utilisateur a signalé qu'à 09h00 UTC un dimanche en période chargée avec SIV fermé, la capacité affichée était de 45 alors qu'il s'attendait à 40 pour 8 agents.

**Changements Récents :**

*   **`script.js`** :
    *   Dans la fonction `updateFromDateInputs()`, une logique a été ajoutée pour forcer `state.currentEndDate` à être égale à `state.currentStartDate` si la différence entre les deux dates est exactement d'un jour. Cela garantit que si l'utilisateur sélectionne une plage de deux jours consécutifs, elle est interprétée comme une vue d'un seul jour.
    *   La fonction `initializeDashboard()` a été modifiée pour définir `state.currentStartDate` et `state.currentEndDate` sur la date du jour *actuel en heure locale de Paris, convertie en UTC à minuit*, assurant une cohérence avec les données COHOR et une sélection correcte de la grille. Les inputs de date affichent toujours la date locale de Paris.
    *   La fonction `processCohorCSV()` a été corrigée pour que le filtrage initial des données (`flights.filter(f => f.date >= todayUTC)`) utilise également une date UTC à minuit, éliminant ainsi le décalage dû aux fuseaux horaires.
    *   La méthode de définition des valeurs des inputs de date (`elements.dateStartInput.value` et `elements.dateEndInput.value`) a été modifiée pour utiliser un format `YYYY-MM-DD` explicite, évitant les problèmes d'interprétation de fuseau horaire par le navigateur.
*   **`CapacityCalculator.js`** :
    *   La fonction `getPeriodAndDayType()` a été ajustée pour déterminer le jour de la semaine en fonction de l'heure locale de Paris (`localParisDate.getDay()`), garantissant que la sélection de la grille de vacation est basée sur le jour calendaire correct à Paris.
    *   La fonction `calculateCapacityWithSpecificGrid()` a été simplifiée pour ne plus effectuer de calcul sur 3 jours, car la solution de forçage de la capacité à 6 agents la nuit est suffisante.
    *   La fonction `selectAgentProfiles()` a été corrigée pour :
        *   S'assurer que la `customSelection` de l'utilisateur est correctement utilisée si elle est fournie et contient des agents (même si l'objet est initialement vide).
        *   Ajuster la logique de sélection automatique par défaut pour qu'elle corresponde à l'effectif attendu par l'utilisateur (3 Je / 7 M / 7 J / 8 SN).

**Prochaines Étapes :**

*   Expliquer le calcul de capacité à l'utilisateur et lui demander de tester l'application pour confirmer que la capacité affichée est maintenant correcte.
