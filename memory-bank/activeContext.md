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
  - **Correction du calcul DST** : La méthode `getDSTOffset` a été corrigée pour calculer correctement le dernier dimanche de mars et octobre.
  - **Correction de l'application de l'offset DST** : L'offset est maintenant appliqué au `utcTimestamp` de chaque créneau, et non à la `startDate` globale.
  - **Utilisation de `Intl.DateTimeFormat`** : Conversion précise des timestamps UTC en heure locale de Paris pour la recherche dans la grille de vacation.
  - **Correction de la moyenne glissante** : La moyenne glissante est maintenant calculée sur le créneau actuel et les 3 suivants pour un alignement correct.

- **script.js**:
  - Intégration complète de la classe `CapacityCalculator`
  - Interface de sélection d'agents par type (Je, M, J, SN)
  - Affichage des courbes de capacité en orange
  - Gestion des grilles de vacation par période
  - **Alignement courbe capacité** : `stepped: 'middle'` utilisé pour un meilleur alignement visuel.
  - **Traitement trafic en UTC** : `timeSlot` des données COHOR basé sur l'heure UTC.
  - **Gestion des périodes de transition DST** : Notification de l'utilisateur si la période sélectionnée chevauche un changement d'heure.
  - **Correction du décalage des données COHOR** : Application des offsets de -24 min (arrivée) et +11 min (départ) directement au `timeSlot` des données COHOR.
  - **Affichage des labels de l'axe X et tooltips** : Génération dynamique en fonction de `state.useUTC` pour un affichage correct en UTC ou en heure locale.

## Next Steps
1. **Vérifier l'application des règles SIV :**
   - S'assurer que les réductions SIV sont correctement appliquées pour toutes les hypothèses (faible, moyen, fort), et pas seulement pour "fermé".
   - Analyser les données de `sivRules.js` si les réductions attendues ne sont pas appliquées.

2. **Logique des vacations de nuit (N) :**
   - Implémenter la logique spécifique pour les vacations de nuit (N) qui s'appliquent au J+1 et sont obligatoires.

3. **Nettoyage et optimisation** :
   - Supprimer les logs de débogage restants
   - Optimiser les performances si nécessaire
   - Finaliser la documentation

## Active Decisions and Considerations
- **Priorité des agents** : Ordre d'apparition dans le fichier CSV (solution finale validée)
- **Sélection d'agents** : 7 premiers agents non-chefs par priorité, avec vacations fixes incluses.
- **Architecture modulaire** : Séparation claire entre parsing, calculs et affichage
- **Compatibilité** : Maintien de la structure existante des données

## Current Status
✅ **DÉCALAGE RÉSOLU** : Le décalage temporel entre la courbe de capacité et les histogrammes de trafic est maintenant résolu. L'alignement visuel est correct.

## Problèmes Résolus
1. **Parsing CSV défaillant** → Normalisation des en-têtes
2. **Priorités incorrectes** → Ordre d'apparition dans le fichier
3. **Sélection d'agents vide** → Correction de la logique de priorité
4. **Capacités nulles** → Agents correctement sélectionnés et actifs
5. **Moyenne glissante incorrecte** → Application sur les capacités, alignée sur le début de la fenêtre.
6. **Heures SIV incorrectes** → Passage de `utcTimestamp` à `getSIVReduction`.
7. **Décalage Courbe Capacité / Trafic** : Résolu par la correction du calcul DST, l'utilisation de `Intl.DateTimeFormat` et l'ajustement de la moyenne glissante.
8. **Gestion Heure d'Été/Hiver** : Résolu par la correction du calcul DST et la notification des périodes de transition.
9. **Décalage des données COHOR** : Résolu par l'application des offsets directement au `timeSlot`.

## Problèmes Actuels
Aucun problème majeur identifié.

## Validation Requise
- Cohérence des courbes avec les attentes métier
- Ordre de priorité des agents conforme aux règles
- Comportement correct sur différentes dates/périodes
- **Validation de l'application des règles SIV.**
- **Validation de la logique des vacations de nuit.**
