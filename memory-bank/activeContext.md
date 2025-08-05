# Contexte Actuel :

*   **Problème de filtre de date :** Résolu. Le comptage des jours et les moyennes de trafic sont maintenant corrects grâce à l'utilisation cohérente des dates UTC.
*   **Comportement par défaut au démarrage :** L'application affiche par défaut les données du jour actuel, avec la date de fin également définie sur le jour actuel, et la grille de vacation appropriée est sélectionnée.
*   **Incohérence du calcul de capacité :** Résolu. La logique de sélection des agents a été ajustée pour respecter la sélection personnalisée de l'utilisateur et la sélection automatique par défaut a été alignée sur les attentes de l'utilisateur (3 Je / 7 M / 7 J / 8 SN).
*   **Bug d'affichage TMA :** Résolu. Les données TMA sont maintenant correctement agrégées et affichées dans le graphique et le résumé.
*   **Bug de calcul TMA :** Corrigé. La logique de calcul du TMA a été ajustée pour correspondre aux formats horaires TMA et les valeurs horaires ont été divisées par 4 pour les distribuer sur des créneaux de 15 minutes.
*   **Surestimation TMA/jour :** **RÉSOLU (04/08/2025).** Le calcul TMA dans les blocs statistiques était surestimé d'un facteur 3-4. Correction implémentée en utilisant directement les valeurs `d.tma` déjà divisées par 4.

**Changements Récents :**

*   **Refactorisation Modulaire :**
    *   Le fichier `script.js` a été refactorisé en trois modules distincts pour une meilleure maintenabilité et organisation du code :
        *   **`scriptCore.js`** : Contient la logique partagée, la gestion de l'état global, les éléments d'interface utilisateur communs, et les fonctions de calcul de capacité.
        *   **`scriptCohor.js`** : Gère le traitement des fichiers COHOR et TMA, ainsi que les visualisations spécifiques à ces données.
        *   **`scriptNM.js`** : Gère le traitement des fichiers Predict NM et les affichages associés.
    *   **`index.html`** : Mis à jour pour charger les nouveaux modules (`scriptCore.js`, `scriptCohor.js`, `scriptNM.js`) au lieu de l'ancien `script.js`.
    *   **Corrections d'initialisation des modules :** Les problèmes d'affichage des contrôles de capacité et de la grille de vacation ont été résolus en exposant `handleGridSelection` dans `scriptCore.js` et en l'appelant directement depuis les modules spécifiques (`scriptCohor.js` et `scriptNM.js`) lors de leur initialisation.

**Améliorations Majeures (04/08/2025) :**

*   **Interface Différenciée Vue COHOR vs Vue NM :**
    *   **Vue COHOR :** Interface complète inchangée avec tous les blocs statistiques
    *   **Vue NM :** Interface épurée sans blocs statistiques (Départs/jour, Arrivées/jour, TMA/jour, Total/jour)
    *   **Gestion dynamique :** Basculement automatique des éléments UI selon la source de données active

*   **Système de Filtrage Avancé pour Vue NM :**
    *   **Remplacement du filtre général** par des filtres individuels par colonne
    *   **Filtres par colonne :** Heure, ARCID, Type Avion, ADEP, ADES
    *   **Filtre par plage horaire :** Support des formats "12h00-13h00", "12h-13h", "12:00-13:00"
    *   **Filtrage combinable :** Tous les filtres peuvent être utilisés simultanément

*   **Suppression du bloc "Résumé des imports Predict NM"** en vue NM pour une interface plus épurée

**Changements Techniques Récents :**

*   **`scriptCohor.js` :** Correction du calcul TMA dans `updateSummaryCards()` et `updateSummaryTable()`
*   **`scriptNM.js` :** Implémentation des filtres par colonne avec `setupColumnFilters()` et `matchesTimeRange()`
*   **`index.html` :** Ajout d'une ligne de filtres dans l'en-tête du tableau NM
*   **`style.css` :** Nouveaux styles pour les filtres par colonne (`.column-filter`, `.filter-row`)

**Nouvelle Fonctionnalité IFR (04/08/2025) :**

*   **Gestion de la Salle IFR :** Implémentation complète de la gestion de l'ouverture/fermeture de la salle IFR
    *   **Configuration centralisée** dans `DATE_CONFIG.IFR_ROOM_SCHEDULE` avec horaires par période et type de jour
    *   **Adaptation automatique** été/hiver selon les changements d'heure (DST)
    *   **Limitation de capacité** à 18 quand la salle IFR est fermée
    *   **Méthode `isIFRRoomOpen()`** pour déterminer l'état de la salle selon timestamp, période et type de jour
    *   **CORRECTION CRUCIALE** : Application de la limitation IFR **AVANT** la moyenne glissante pour effet progressif correct
    *   **Intégration** dans `calculateDailyCapacity()` et `calculateCapacityWithSpecificGrid()`
    *   **Tests validés** avec suite de tests automatisés couvrant tous les scénarios + test spécifique moyenne glissante

**Nouvelle Fonctionnalité Filtres NM (04/08/2025) :**

*   **Filtres Jours de Semaine Activés :** Les filtres par jour de semaine sont maintenant fonctionnels en vue NM
*   **Filtres Types de Trafic Activés :** Système de filtrage par type de trafic avec logique TMA spécifique
*   **Classification TMA Détaillée :**
    *   **TMA** : Arrivées/départs depuis/vers LFLY, LFLS, LFLU, LFLB, LFLP + Transits TMA (avec détail par aéroport)
    *   **Arrivées LFLL** : Arrivées vers LFLL uniquement
    *   **Départs LFLL** : Départs depuis LFLL uniquement
    *   **Transits TMA** : Tous les autres vols (ni LFLL ni aéroports TMA) inclus dans le groupe TMA
*   **Filtrage Granulaire :** Le filtre "TMA" active/désactive tous les aéroports TMA tout en conservant le détail visuel
*   **Couleurs Préservées :** Chaque aéroport TMA conserve sa couleur spécifique dans le graphique
*   **Logique de Filtrage :** Combinaison des filtres jours de semaine et types de trafic
*   **Correction Vols Internes TMA :** Traitement des vols internes TMA (ex: LFLS→LFLB) en 2 événements distincts
    *   **Événement Départ** : À l'heure `entry` avec classification départ
    *   **Événement Arrivée** : À l'heure `exit` avec classification arrivée
    *   **Support Colonnes** : Traitement des colonnes `entry` et `exit` des fichiers NM
    
    **Système de Chargement Automatique (04/08/2025) :**
    
    *   **Remplacement des Inputs Manuels :** Les champs de sélection de fichiers ont été remplacés par 3 boutons automatiques
    *   **Interface Modernisée :** Section "Source des Données" avec boutons intuitifs
    *   **Sources Pré-intégrées :**
        *   **Bouton "Aiglon futé saison été 2025"** : Charge automatiquement données COHOR été + TMA
        *   **Bouton "Aiglon futé saison hiver 2025"** : Charge automatiquement données COHOR hiver + TMA
        *   **Bouton "NM Predict"** : Charge automatiquement données J+0 à J+4 avec filtres actifs
    *   **Fichiers de Données JavaScript :**
        *   `summer_cohorData.js`, `winter_cohorData.js`, `tmaData.js`
        *   `nmpredictj0Data.js` à `nmpredictj4Data.js`
    *   **Variables Globales :** Exposition via `window.*` pour éviter les erreurs CORS
    *   **Documentation Intégrée :** Zones de copier-coller clairement documentées dans chaque fichier
    *   **Correction Parsing JSON :** Résolution de l'erreur "JSON.parse: unexpected character" pour les données NM Predict
    *   **Traitement Direct :** Élimination de FileReader, traitement direct des chaînes de données
    *   **API Publiques :** Exposition des fonctions via `window.AiglonCohor` et `window.AiglonNM`
    
    **État Actuel :**
    *   **Projet Complet :** Toutes les fonctionnalités demandées sont implémentées et opérationnelles
    *   **Interface Optimisée :** Chaque vue (COHOR/NM) a une interface adaptée à ses besoins spécifiques
    *   **Filtrage Avancé :** Système de filtrage granulaire pour une meilleure analyse des données NM
    *   **Filtres NM Fonctionnels :** Les filtres "Jours de semaine" et "Types de trafic" sont maintenant actifs en vue NM
    *   **Calculs Précis :** Tous les bugs de calcul TMA ont été corrigés
    *   **Gestion IFR :** Nouvelle fonctionnalité de limitation de capacité selon l'état de la salle IFR
    *   **Chargement Automatique :** Système de boutons automatiques entièrement fonctionnel
    *   **Expérience Utilisateur Améliorée :** Plus besoin de sélectionner manuellement les fichiers
    *   **Dates de Mise à Jour Dynamiques (05/08/2025) :** Les dates "màj le XX/XX/XXXX" sous les boutons COHOR sont maintenant automatiquement mises à jour selon la date de génération des fichiers par les scripts Python
