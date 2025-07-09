#Projet aiglon
##Général et objectif
Il faut enrichir le site html original en gardant la même solution technique (D3.js avec nivo).
Donc il est important de garder le site original et juste de l'enrichir avec cette nouvelle fonctionnalité
Il n'y a pas de backend, c'est une démo simple.Pour l'effectif on va prendre de base 3 Je / 8M / 8J / 8SN
Les vacations MC, JC et NC (les plus prioritaires de chaque groupe) seront directement intégrées et l'utilisateur ne pourra changer que les 7 suivantes
Garde bien le style et la même palette
Il faut que l'utilisateur puisse charger l'armement comme peut le calculer MV_8_agents.py sans les VIC. Il faut donc retranscrire 
ce script python en script.js
Les données nécessaires pour le calcul de l'armement (grilles .csv selon la
période, MV_staffings.csv et repartition_agents_SIV.csv) doivent être intégrés dans les fichiers html ou
script.js. Au final je veux que lorsque l'utilisateur à sélectionné une période avec les filtres de dates et avec
des histogrammes empilés il dispose de nouveau boutons. Pour la première ligne la
sélection de la période parmi les 9 possibles. Pour la deuxième ligne l'hypothèse SIV avec les 4 boutons (fermé, faible, moyen, fort) puis 3 boutons pour les 3 Je.
Pour les lignes suivantes on aura une ligne pour les M,une pour les J et une dernière pour les SN.
Sur chaque ligne on affiche 7 boutons, les 8 vacs prioritaires de chaque fichiers .csv (ordre de priorité).
L'armement sera représenté dans le graphique avec une aire, courbe noire et surface transparente grisée. L'affichage sera dynamique selon les actions de l'utilisateur
sur l'effectif (désactivation de vac, changement période ou changement hypothèse SIV).
Le graphique gardera une vue sur un pas de 15 min et une durée de 60 min (moyenne glissante).
L'armement (capacité) pourra être activé désactivé à l'affichage grâce à un bouton qui affichera l'aire.
Lorsque l'utilisateur change la vue du graphique vers "Vue côté à côté" on désactive l'affichage de l'armement et on rends impossible l'afffichage, l'affichage doit 
être possible que pour la "vue empilée" 

##Corrections mineures
à faire:
- Détecter les dates de début et fin du fichier cohor pour les proposer de base dans le filtrage
- Chiffres entiers sans arrondis
- Dans le titre du graphique ajouter le nombre de jours du filtre 
- Dans les 4 résumés avant le graphique ajout date du max et min, il y aura 6 blocs.
- Pb du jour par exemple si je filtre début 6 juillet fin 6 juillet rien ne s'affiche il faut prendre de 00h00 à 23h59 le 6 juillet.
On change le filtre pour éviter la bordure en nuit donc si je filtre le 6 juillet en date de début et 7 juillet en date de fin je veux du 6 
juillet 06h loc au 7 juillet 06h loc.
- Supprimer le mot "Métrique".
- Une zone de graphique histogramme plus importante en taille
- Il faut garder qu'un seul bouton d'importations et ne garder qu'un seul bouton pour importer les données COHOR.
- Pour le trafic TMA le fichier json a changé car le pas a été optimisé à 60 min mais on affichera toujours un pas de 15 min et durée de 60 min avec des moyennes 
glissantes, il faudra donc avec ce fichier json calculer pour un pas de 15 min.	 