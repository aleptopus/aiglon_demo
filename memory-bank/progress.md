**Progrès :**

*   **Problème de décalage temporel de la courbe de capacité :** Résolu.
*   **Gestion des règles SIV et des transitions d'heure d'été/hiver :** Résolu.
*   **Problème des vacations de nuit :** Résolu.
*   **Améliorations de l'interface utilisateur (UI/UX) :**
    *   Réorganisation de la liste déroulante des grilles de vacation avec des `optgroup`.
    *   Automatisation de la sélection de la grille de vacation par défaut au chargement du fichier COHOR (basée sur la date du jour).
    *   Synchronisation automatique de la grille de vacation avec la date de début sélectionnée dans le filtre.
    *   Ajout du nombre de jours filtrés au titre du graphique.
    *   Suppression du filtre par curseur.
    *   Réorganisation et stylisation des boutons de vue du graphique (Empilée/Côte à Côte) et de fuseau horaire (UTC/Heure locale).
    *   Modification du tooltip du graphique pour afficher "TMA total" (somme des arrivées, départs, TMA) au lieu du total général (trafic + capacité).
*   **Correction du filtre de date et de la sélection de grille par défaut :** Résolu. L'application affiche désormais correctement les données du jour sélectionné (par exemple, le 19 juillet pour un samedi) avec la grille de vacation appropriée ("Samedi Chargé") et la date de fin est automatiquement ajustée pour correspondre à la date de début si une plage d'un seul jour est souhaitée.
*   **Correction de l'incohérence du calcul de capacité (45 au lieu de 40) :** Résolu. La logique de sélection des agents a été ajustée pour respecter la sélection personnalisée de l'utilisateur et la sélection automatique par défaut a été alignée sur les attentes de l'utilisateur (3 Je / 7 M / 7 J / 8 SN).

**Ce qui reste à construire :**

*   Toutes les tâches signalées ont été résolues.
