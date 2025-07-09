# Active Context for Aiglon Futé Dashboard

## Current Work Focus
Le focus actuel est sur la correction du calcul de la capacité, en particulier la sélection des profils d'agents dans `CapacityCalculator.js`, et l'affichage correct de la capacité sur le graphique.

## Recent Changes
- **script.js**:
  - Correction des erreurs de syntaxe (`missing ) after argument list`).
  - Correction de l'erreur `isSingleDay is not defined`.
  - Intégration de la classe `CapacityCalculator`.
  - Ajout de logs pour le débogage du graphique et du calcul de capacité.
  - La courbe de capacité est maintenant affichée en orange.
- **vacationGrids.js**:
  - Modification du format de stockage des grilles de vacances pour inclure une propriété `grid` compatible avec `CapacityCalculator.js`.
- **CapacityCalculator.js**:
  - Ajout de la fonction `countActiveAgents`.
  - Ajout de logs détaillés pour le débogage du calcul de capacité.

## Next Steps
- **Diagnostiquer et corriger `selectAgentProfiles`**: Comprendre pourquoi la fonction ne sélectionne aucun profil d'agent et la corriger.
- **Vérifier le calcul de capacité**: S'assurer que `countActiveAgents()`, `getSIVReduction()`, et `applyHourlyAverage()` fonctionnent correctement et produisent des valeurs de capacité non nulles.
- **Implémentation des menus déroulants**: Adapter `script.js` pour gérer les nouveaux menus déroulants (`select`) pour la sélection de la période et de l'hypothèse SIV.
- **Tests**: Effectuer des tests de cohérence entre les différents modules de données et les calculs.
- **Améliorations UI/UX**: Mettre en œuvre les corrections mineures restantes.
