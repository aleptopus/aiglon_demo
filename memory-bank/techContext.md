# Tech Context: Aiglon Futé Dashboard

## Frontend Technologies
*   **HTML5**: For structuring the dashboard interface.
*   **CSS3**: For styling the dashboard, including responsive design and visual elements.
*   **JavaScript (ES6+)**: For all client-side logic, including data manipulation, DOM interaction, and API calls.
*   **Chart.js**: Used for rendering dynamic and interactive traffic charts (e.g., stacked bar charts).
*   **D3.js**: Utilized for creating the heatmap visualization of agent vacation schedules.
*   **Puppeteer**: Used by the Cline environment for browser automation and testing.

## Development Setup & Constraints
*   **Frontend-only**: All logic and data processing occur within the browser. No backend services are required for this feature.
*   **Architecture Modulaire :** Le code est maintenant organisé en modules distincts pour une meilleure maintenabilité et une séparation claire des préoccupations :
    *   **`scriptCore.js`** : Contient la logique partagée, la gestion de l'état global, les éléments d'interface utilisateur communs, et les fonctions de calcul de capacité.
    *   **`scriptCohor.js`** : Gère le traitement des fichiers COHOR et TMA, ainsi que les visualisations spécifiques à ces données. Inclut la correction du calcul TMA.
    *   **`scriptNM.js`** : Gère le traitement des fichiers Predict NM et les affichages associés. Inclut le système de filtrage avancé par colonne.
*   **Gestion de l'État :** L'état global de l'application est géré au sein de `scriptCore.js`.
*   **Interface Différenciée :** Gestion dynamique de l'affichage des éléments UI selon la source de données active (`cohor` vs `predictNM`).

## Dependencies
*   **Chart.js**: For charting capabilities.
*   **D3.js**: For data visualization, specifically the heatmap.
*   **`CapacityCalculator.js`**: A custom class encapsulating the logic for calculating control capacity based on staffing, rules, and vacation data.
*   **`sivRules.js`**: Contains specific rules related to SIV hypotheses.
*   **`vacationGrids.js`**: Provides data for agent vacation schedules.
*   **Predict NM Files (.txt)**: A new data source processed differently, displaying specific information such as the number of traffics per day and the import date/time.

## Nouvelles Fonctionnalités (04/08/2025)

### Interface Différenciée
*   **Gestion Dynamique UI**: Basculement automatique des éléments d'interface selon la source de données (`activeDataSource`)
*   **Vue COHOR**: Interface complète avec tous les blocs statistiques
*   **Vue NM**: Interface épurée sans blocs statistiques non pertinents

### Système de Filtrage Avancé (Vue NM)
*   **Filtres par Colonne**: Champs de saisie individuels pour chaque colonne du tableau
*   **Filtre par Plage Horaire**: Support des formats flexibles ("12h00-13h00", "12h-13h", "12:00-13:00")
*   **Filtrage Combinable**: Tous les filtres peuvent être utilisés simultanément
*   **Mise à Jour Temps Réel**: Filtrage instantané lors de la saisie

### Gestion de la Salle IFR (NOUVEAU)
*   **Configuration Centralisée**: Horaires d'ouverture définis dans `DATE_CONFIG.IFR_ROOM_SCHEDULE`
*   **Support Multi-Périodes**: Horaires différenciés pour périodes Chargée/Creuse/Hiver
*   **Gestion Été/Hiver**: Adaptation automatique selon les changements d'heure (DST)
*   **Limitation de Capacité**: Plafonnement à 18 quand la salle IFR est fermée
*   **Ordre d'Application Correct**: Limitation IFR appliquée AVANT moyenne glissante pour effet progressif
*   **Moyenne Glissante IFR**: Transition progressive lors fermeture/ouverture salle IFR
*   **Logs de Débogage**: Traçabilité complète des décisions IFR

### Corrections de Calculs
*   **Calcul TMA Corrigé**: Résolution de la surestimation d'un facteur 3-4 dans les blocs statistiques COHOR
*   **Logique Optimisée**: Utilisation directe des valeurs `d.tma` déjà divisées par 4
*   **Intégration IFR**: Application de la limitation IFR dans les méthodes de calcul de capacité

### Améliorations Techniques
*   **Event Listeners Dynamiques**: Configuration automatique des filtres lors de l'initialisation
*   **Validation de Format**: Gestion robuste des différents formats de plage horaire
*   **Performance Optimisée**: Filtrage côté client sans impact sur les performances
*   **Méthode `isIFRRoomOpen()`**: Nouvelle méthode pour déterminer l'état de la salle IFR
*   **Tests Automatisés**: Suite de tests pour valider l'implémentation IFR
