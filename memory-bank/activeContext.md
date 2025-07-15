# Active Context for Aiglon Futé Dashboard

## Current Work Focus
Le projet Aiglon est maintenant fonctionnel avec des courbes de capacité qui s'affichent correctement. Le problème critique de priorité des agents a été résolu - la priorité est maintenant basée sur l'ordre d'apparition dans le fichier CSV plutôt que sur l'extraction de numéros depuis les IDs.

## Recent Changes
- **vacationGrids.js**:
  - **CORRECTION MAJEURE** : Priorité des agents basée sur l'ordre d'apparition (`priorité = index de ligne - 1`)
  - Normalisation des en-têtes CSV pour gérer les accents et la casse
  - Parsing CSV corrigé pour une sélection d'agents fonctionnelle

- **CapacityCalculator.js**:
  - **CORRECTION CRITIQUE** : Seuls les agents avec '1' comptent (pas les chefs 'C')
  - **CORRECTION UTC** : Les règles SIV sont maintenant appliquées en UTC
  - Sélection des agents maintenant opérationnelle (3 Je + 8 M + 8 J + 8 SN)
  - Interface de sélection d'agents avec boutons interactifs
  - Calculs de capacité générant des valeurs correctes
  - **Moyenne glissante corrigée** : Application sur les capacités de 15 min, alignée sur le début du créneau.
  - **Conversion UTC/Local pour grilles de vacation** : Tentative de correction du décalage horaire.

- **script.js**:
  - Intégration complète de la classe `CapacityCalculator`
  - Interface de sélection d'agents par type (Je, M, J, SN)
  - Affichage des courbes de capacité en orange
  - Gestion des grilles de vacation par période
  - **Alignement courbe capacité** : Tentative d'alignement sur le bord gauche des histogrammes (`stepped: 'before'`).
  - **Traitement trafic en UTC** : `timeSlot` des données COHOR basé sur l'heure UTC.

## Next Steps
1. **Résoudre le décalage temporel et l'alignement des courbes :**
   - Vérifier et corriger le décalage persistant entre la courbe de capacité et les histogrammes de trafic.
   - S'assurer que le pic de capacité s'affiche à la bonne heure (ex: 05h UTC au lieu de 06h UTC).
   - Confirmer que l'alignement de la courbe de capacité est sur le bord gauche des histogrammes.
   - Revoir la gestion des fuseaux horaires (UTC/Local) pour s'assurer de la cohérence, notamment pour l'heure d'été/hiver.

2. **Vérifier l'application des règles SIV :**
   - S'assurer que les réductions SIV sont correctement appliquées pour toutes les hypothèses (faible, moyen, fort), et pas seulement pour "fermé".
   - Analyser les données de `sivRules.js` si les réductions attendues ne sont pas appliquées.

3. **Logique des vacations de nuit (N) :**
   - Implémenter la logique spécifique pour les vacations de nuit (N) qui s'appliquent au J+1 et sont obligatoires.

4. **Nettoyage et optimisation** :
   - Supprimer les logs de débogage restants
   - Optimiser les performances si nécessaire
   - Finaliser la documentation

## Active Decisions and Considerations
- **Priorité des agents** : Ordre d'apparition dans le fichier CSV (solution finale validée)
- **Sélection d'agents** : 7 premiers agents non-chefs par priorité, avec vacations fixes incluses.
- **Architecture modulaire** : Séparation claire entre parsing, calculs et affichage
- **Compatibilité** : Maintien de la structure existante des données

## Current Status
⚠️ **DÉCALAGE PERSISTANT** : L'application affiche des courbes de capacité, mais un décalage temporel persiste entre la courbe de capacité et les histogrammes de trafic. Le calcul de capacité est fonctionnel pour l'hypothèse SIV "fermé", mais nécessite une vérification approfondie pour les autres hypothèses.

## Problèmes Résolus
1. **Parsing CSV défaillant** → Normalisation des en-têtes
2. **Priorités incorrectes** → Ordre d'apparition dans le fichier
3. **Sélection d'agents vide** → Correction de la logique de priorité
4. **Capacités nulles** → Agents correctement sélectionnés et actifs
5. **Moyenne glissante incorrecte** → Application sur les capacités, alignée sur le début de la fenêtre.
6. **Heures SIV incorrectes** → Passage de `utcTimestamp` à `getSIVReduction`.

## Problèmes Actuels
1.  **Décalage Courbe Capacité / Trafic :** La courbe de capacité est toujours décalée par rapport aux histogrammes de trafic, et son alignement sur le bord gauche des barres n'est pas correct. Le pic de capacité s'affiche à 06h UTC au lieu de 05h UTC.
2.  **Gestion Heure d'Été/Hiver :** Il semble y avoir un décalage d'une heure pour les dates en heure d'été, suggérant un problème dans la conversion UTC/Local pour les grilles de vacation.
3.  **Application des Règles SIV :** Les réductions SIV ne semblent pas s'appliquer correctement pour les hypothèses "faible", "moyen", "fort", ou les données dans `sivRules.js` ne correspondent pas aux attentes.

## Validation Requise
- Cohérence des courbes avec les attentes métier
- Ordre de priorité des agents conforme aux règles
- Comportement correct sur différentes dates/périodes
- **Correction du décalage temporel et alignement visuel.**
- **Validation de l'application des règles SIV.**
- **Validation de la logique des vacations de nuit.**
