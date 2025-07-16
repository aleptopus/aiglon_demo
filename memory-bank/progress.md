# État d'avancement du projet Aiglon

## ✅ Complété

### Structure de base
- [x] Interface utilisateur HTML/CSS fonctionnelle
- [x] Sélecteur de date avec calendrier
- [x] Graphique Chart.js pour l'affichage des capacités
- [x] Intégration des grilles de vacation CSV
- [x] Mapping des effectifs vers capacités
- [x] Règles SIV pour réductions d'effectifs
- [x] Carte de chaleur des vacations (couleurs et ordre corrigés)

### Logique métier
- [x] Détection automatique des périodes (Hiver/Chargée/Creuse)
- [x] Classification des jours (Semaine/Samedi/Dimanche)
- [x] Calcul des capacités par tranches de 15 minutes
- [x] Application des réductions SIV
- [x] Moyenne mobile sur 1 heure (décalée de 45 min)

### Corrections récentes
- [x] **Parsing CSV corrigé** : Normalisation des en-têtes et gestion des accents
- [x] **Priorités d'agents corrigées** : La priorité est maintenant l'ordre d'apparition dans le fichier
- [x] **Sélection d'agents fonctionnelle** : Les agents non-chefs sont correctement sélectionnés
- [x] **Affichage des courbes** : Les calculs de capacité génèrent maintenant des valeurs non nulles
- [x] **Comptage agents actifs corrigé** : Seuls les agents avec '1' comptent (pas les chefs 'C')
- [x] **Fuseau horaire SIV corrigé** : Les règles SIV sont maintenant appliquées en UTC
- [x] **Interface de sélection d'agents** : Ajout de boutons pour sélectionner/désélectionner les agents
- [x] **Effectif nominal corrigé** : Passage de 7 SN à 8 SN (3 Je + 8 M + 8 J + 8 SN)
- [x] **Courbe en escalier** : Ajout du paramètre `stepped: true` pour un rendu sans lissage
- [x] **Pas de 15 minutes** : Calcul sur 96 créneaux de 15 min avec moyenne glissante de 60 min
- [x] **Élimination des valeurs nulles** : Plus de capacité à zéro avec l'effectif nominal
- [x] **Moyenne glissante corrigée** : Application sur les capacités de 15 min, alignée sur le début de la fenêtre.
- [x] **Heures SIV corrigées** : Passage de `utcTimestamp` à `getSIVReduction`.
- [x] **Traitement trafic en UTC** : `timeSlot` des données COHOR basé sur l'heure UTC.
- [x] **Alignement courbe capacité** : Tentative d'alignement sur le bord gauche des histogrammes (`stepped: 'before'`).
- [x] **Couleurs incorrectes sur la carte de chaleur** : Résolu par la correction du parsing CSV et le renommage de la propriété `v` en `value`.
- [x] **Ordre incorrect des vacations sur la carte de chaleur** : Résolu par l'ajout d'un tri secondaire.
- [x] **Tooltip "undefined" sur la carte de chaleur** : Résolu par le renommage de la propriété `v` en `value`.

## ✅ Résolu

### Problèmes critiques résolus
- [x] **Parsing CSV défaillant** : 
  - **Problème** : Les en-têtes CSV n'étaient pas normalisés (accents, casse)
  - **Solution** : Normalisation avec `normalize("NFD").replace(/[\u0300-\u036f]/g, "")`

- [x] **Priorités d'agents incorrectes** :
  - **Problème initial** : Extraction de numéros depuis les IDs (M#01 → 1)
  - **Problème corrigé** : La priorité doit être l'ordre d'apparition dans le fichier
  - **Solution finale** : `priorité = index de ligne - 1`

- [x] **Sélection d'agents vide** :
  - **Problème** : Tous les agents avaient priorité 9999, aucun n'était sélectionné
  - **Solution** : Correction de la logique de priorité

- [x] **Capacités nulles** :
  - **Problème** : Aucun agent actif détecté (valeurs toujours "0")
  - **Solution** : Agents maintenant correctement sélectionnés avec valeurs "1" aux créneaux actifs

- [x] **Décalage Courbe Capacité / Trafic** :
  - **Problème** : Décalage temporel persistant entre la courbe de capacité et les histogrammes de trafic.
  - **Solution** : Correction du calcul DST, utilisation de `Intl.DateTimeFormat` pour la conversion précise en heure locale de Paris, ajustement de la moyenne glissante dans `CapacityCalculator.js` pour un alignement correct, et ajustement de l'affichage dans `script.js` (`stepped: 'middle'`).

- [x] **Gestion Heure d'Été/Hiver** :
  - **Problème** : Décalage d'une heure pour les dates en heure d'été, problème dans la conversion UTC/Local.
  - **Solution** : Correction du calcul DST dans `CapacityCalculator.js` et notification des périodes de transition dans `script.js`.

- [x] **Décalage des données COHOR** :
  - **Problème** : Décalage des données COHOR par rapport aux offsets spécifiés.
  - **Solution** : Application des offsets de -24 min (arrivée) et +11 min (départ) directement au `timeSlot` des données COHOR dans `script.js`.

- [x] **Problèmes d'affichage de la carte de chaleur** :
  - **Problème** : Couleurs incorrectes et ordre des vacations non respecté.
  - **Solution** : Correction du parsing CSV pour les valeurs de vacation, renommage de la propriété `v` en `value` dans les données de la heatmap et les callbacks de Chart.js, et ajout d'un tri secondaire pour les agents.

## 📋 Prochaines étapes

1. **Validation du calcul de la capacité :**
   - Valider le calcul de la capacité pour toutes les périodes (Semaine Creuse, Hiver, etc.) et toutes les hypothèses VFR (faible, moyen, fort). Le calcul est validé pour "SemCha".

2. **Vérifier l'application des règles SIV :**
   - S'assurer que les réductions SIV sont correctement appliquées pour toutes les hypothèses (faible, moyen, fort), et pas seulement pour "fermé".
   - Analyser les données de `sivRules.js` si les réductions attendues ne sont pas appliquées.

3. **Logique des vacations de nuit (N) :**
   - Implémenter la logique spécifique pour les vacations de nuit (N) qui s'appliquent au J+1 et sont obligatoires.

4. **Nettoyage et optimisation** :
   - Supprimer les logs de débogage restants
   - Optimiser les performances si nécessaire
   - Finaliser la documentation
   
5. **Améliorations de l'interface utilisateur (UI) :**
   - Filtre de date pour afficher une seule journée si date de début et de fin sont égales.
   - Supprimer les boutons des vacations obligatoires (MC, JC, NC, N) et les gérer en interne.
   - Ajouter un bouton bascule "toggle button" dans le graphique pour passer de l'heure locale à l'heure UTC.
   - Ajouter le scénario SIV "fermé" dans le menu déroulant.
   - Ajouter un graphique waffle pour représenter les vacations (utilisation de la bibliothèque nivo).
   - Respecter la charte graphique et l'espacement entre les blocs.
   - Afficher les données indicateurs en haut sur une seule ligne (Départs/jour, Arrivées/jour, TMA/jour, Total /jour, Date trafic min, Date trafic max).
   - Centrer le titre du graphique et afficher le nombre de jours concernés par le filtre.
   - Désactiver la courbe Capacité si l'utilisateur bascule sur la vue côte à côte.
   - Optimiser l'affichage du bloc contrôle de capacité (boutons plus étroits, tout sur une ligne).

## 🎯 Objectifs atteints

- ✅ Application fonctionnelle de calcul de capacité aéroportuaire
- ✅ Interface utilisateur intuitive
- ✅ Calculs basés sur les grilles de vacation réelles
- ✅ Prise en compte des contraintes SIV
- ✅ Affichage graphique des résultats
- ✅ Résolution complète des problèmes de décalage horaire et d'alignement des courbes.
- ✅ Carte de chaleur des vacations fonctionnelle avec couleurs et ordre corrects.

## 📊 État actuel

**Statut** : Fonctionnel et aligné.
**Prochaine étape** : Validation métier des règles SIV et implémentation des vacations de nuit.
