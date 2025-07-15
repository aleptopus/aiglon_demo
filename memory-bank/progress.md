# État d'avancement du projet Aiglon

## ✅ Complété

### Structure de base
- [x] Interface utilisateur HTML/CSS fonctionnelle
- [x] Sélecteur de date avec calendrier
- [x] Graphique Chart.js pour l'affichage des capacités
- [x] Intégration des grilles de vacation CSV
- [x] Mapping des effectifs vers capacités
- [x] Règles SIV pour réductions d'effectifs

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
- [x] **Moyenne glissante corrigée** : Application sur les capacités de 15 min, alignée sur le début du créneau.
- [x] **Heures SIV corrigées** : Passage de `utcTimestamp` à `getSIVReduction`.
- [x] **Traitement trafic en UTC** : `timeSlot` des données COHOR basé sur l'heure UTC.
- [x] **Alignement courbe capacité** : Tentative d'alignement sur le bord gauche des histogrammes (`stepped: 'before'`).

## 🔄 En cours

### Validation et ajustements
- [ ] **Validation des résultats** : Vérifier la cohérence des courbes affichées
- [ ] **Calibrage des priorités** : S'assurer que l'ordre de priorité correspond aux attentes métier
- [ ] **Tests avec différentes dates** : Valider le comportement sur diverses périodes

## ❌ Problèmes identifiés et résolus

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

### Problèmes en cours d'investigation
- [ ] **Validation des courbes** : Les courbes s'affichent mais nécessitent validation métier
- [ ] **Cohérence des calculs** : Vérifier que les résultats correspondent aux attentes

## ✅ Travaux récents

### Gestion des fuseaux horaires
- [x] **Bascule UTC/Local** dans l'interface graphique
- [x] **Conversion des vacations** locales en UTC pour les calculs
- [x] **Option "Fermé"** ajoutée au menu SIV (aucune réduction d'agents)
- [x] **Correction des offsets** pour les périodes d'été/hiver

### Prochaines vérifications
- [ ] **Validation calculs UTC** : Vérifier le décalage de 2h en été
- [ ] **Tests saisonniers** : Hiver (UTC+1) vs Été (UTC+2)
- [ ] **Cohérence données** : Comparaison script Python/JS

## 📋 Prochaines étapes

1. **Résoudre le décalage temporel et l'alignement des courbes :**
   - Vérifier et corriger le décalage persistant entre la courbe de capacité et les histogrammes de trafic.
   - S'assurer que le pic de capacité s'affiche à la bonne heure (ex: 05h UTC au lieu de 06h UTC).
   - Confirmer que l'alignement de la courbe de capacité est sur le bord gauche des histogrammes.
   - Revoir la gestion des fuseaux horaires (UTC/Local) pour s'assurer de la cohérence, notamment pour l'heure d'été/hiver.
   - **Analyser `test_final.html`** : Ce script fonctionne pour une hypothèse VFR fort et doit être analysé pour comprendre et traduire sa logique.

2. **Vérifier l'application des règles SIV :**
   - S'assurer que les réductions SIV sont correctement appliquées pour toutes les hypothèses (faible, moyen, fort), et pas seulement pour "fermé".
   - Analyser les données de `sivRules.js` si les réductions attendues ne sont pas appliquées.

3. **Logique des vacations de nuit (N) :**
   - Implémenter la logique spécifique pour les vacations de nuit (N) qui s'appliquent au J+1 et sont obligatoires.

4. **Nettoyage et optimisation** :
   - Supprimer les logs de débogage restants
   - Optimiser les performances si nécessaire
   - Finaliser la documentation
   
5. **à mettre en place** :
   - Filtre à modifier si dans le calendrier j'affiche une date de début et de fin égale on affiche cette journée par exemple si date début 10 juillet et date de fin 10 juillet
   alors on affiche de le 10 juillet
   - Dans les vacations on va supprimer les boutons des vacation obligatoires donc l'utilisateur n'aura pas à les modifier dans son scénario whatif, il s'agit des vacations chef 
   MC, JC et NC. Il y a aussi les 2 N qui sont obligatoires, attention les N concernent le jour J+1, j'ai remarqué qu'elles sont mal placées. Par exemple si un agent est N le 10 juillet 
   il réalise la nuit du 10 au 11 juillet.
   - Il faut un bouton bascule "toggle button" dans le graphique à côté des légendes pour passer de l'heure locale à l'heure utc
   - Il faut ajouter le scénario SIV fermé avec aussi dans le menu déroulant. Dans ce mode il n'y a pas de réduction d'agents
   - Je veux ajouter en dernière partie un graphique waffle pour repésenter les vacations. Lorsuqe l'utilisateur aura sélectionné une période pour la grille alors les vacations 
   seront visualisées par un carré pour 15 min (pour 24h 96 carrés) avec selon le statut (transparent si vide, violet si valeur = 1, rouge pour C, bleu cile pour P et orange pour R). Je souhaite 
   utiliser la bibliothèque nivo pour cela. Tu disposes du fichier contexte nivo.txt pour comprendre la bibliothèque.
   
6. **à changer dans l'interface** :
   - Je veux qu'on respecte la chartre graphique définie et garder un espacement entre les blocs.
   - Je veux les données indicateur en haut (Départs/jour, Arrivées/jour, TMA/jour, Total /jour) et sur une seule ligne. Je veux que 6 panneaux indicateurs sur une même ligne.
   Aux précédents on ajoute Date traffic min et Date traffic max, lorsque l'utilisateur sélectionne une plage de date il faut lui afficher la date qui a le plus de trafic (somme LFLL et TMA),
   et la date qui en compte le moins. On supprime donc Capacité min/max, Agents min/max, Départ et arrivées min/max.
   - Je veux centrer le titre du graphique et afficher le nombre de jours concernés par le filtre défini par l'utilisateur. Par exemple si l'utilisateur propose date de début 10 juillet 2025 
   et date de fin 25 juillet 2025 puis flitre que les samedis on affiche: Trafic moyen par créneau horaire (nombre de jours: 2) 
   - Il faut désactiver la courbe Capacité si l'utilisateur bascule sur la vue côté à côté.
   - Pour le bloc contrôle de capacité: Je veux optimiser l'affichage, supprime le titre et les soustitres vacations. Crée des bouton plus étroits sans changer la taille en tronquant le nom des vacations,
   M2 au lieu de M2#01 (les boutons auront la même taille que les boutons actuel chefs). Dans l'idéal je veux tout sur une ligne. D'abord le menu déroulant avec Hypothèse SIV (garde ce sous titre) et dans l'ordre dans le menu (fermé, faible,moyen et fort). Pour ce menu déroulant 
garde par défault le paramétrage fort si l'utilisateur ne modifie pas ce menu. Ensuite je veux 3 blocs avec le groupe M, J et SN sans sous titres. On ne laissera pas le choix à l'utilisateur de activer au désactiver 
les vacations chefs (MC, JC et NC) et les vacations N. Il y aura donc le bloc M avec le 7 vacations selon l'ordre de la grille, le bloc J avec 7 vacations selon l'ordre de 
la grille et le bloc N avec 5 vacations selon l'ordre de la grille.   
   
## 🎯 Objectifs atteints

- ✅ Application fonctionnelle de calcul de capacité aéroportuaire
- ✅ Interface utilisateur intuitive
- ✅ Calculs basés sur les grilles de vacation réelles
- ✅ Prise en compte des contraintes SIV
- ✅ Affichage graphique des résultats

## 📊 État actuel

**Statut** : Fonctionnel avec courbes affichées
**Dernière correction** : Priorités d'agents basées sur l'ordre d'apparition
**Prochaine étape** : Validation métier des résultats

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
