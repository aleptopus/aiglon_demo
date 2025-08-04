/**
 * 📊 DONNÉES TMA (Terminal Maneuvering Area)
 *
 * Ce fichier contient les données de trafic TMA moyennées par créneau horaire.
 * Utilisé automatiquement avec les données COHOR (été et hiver)
 *
 * 📍 ZONE DE COPIER-COLLER : Remplacer le contenu du tableau tmaData ci-dessous
 *
 * Structure requise pour chaque créneau TMA :
 * {
 *   "Mois": "Janvier",                              // Nom du mois
 *   "Jour_Semaine": "Lundi",                        // Jour de la semaine
 *   "Créneau_Horaire": "01h00 - 01h59",            // Créneau horaire
 *   "mean": 0.5                                     // Moyenne du trafic TMA
 * }
 */

const tmaData = [
  // ⬇️ COLLER VOS DONNÉES TMA ICI - Remplacer les exemples ci-dessous ⬇️
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.5
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.5
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.5
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.75
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.9167
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.3333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.3333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 4.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.6667
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 3.3333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.3334
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 5.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.3334
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.6666
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.6666
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.75
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.0833
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.4
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.4
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.8
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.4
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.4
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 1.6
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 3.7334
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.2666
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.7333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 2.6667
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.8
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 3.7334
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.7334
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 2.9334
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.9333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.1334
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.1334
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.0666
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.6
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.8
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.4
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.8
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.4
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.4
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.8
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.3333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.1334
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.5334
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 3.4667
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.7333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 4.5333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.4667
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 3.7333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.2666
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 5.6
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.4666
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.4
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.8666
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.6
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.8
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.6
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.4
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.5
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.5
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.5
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.3334
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.3333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.3333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.6667
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.6667
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.6666
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 5.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 4.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.6666
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 3.3333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.1667
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.5
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.1667
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 1.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 1.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.5
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 1.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.75
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.5
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 6.6667
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 4.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.3333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 6.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 6.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 5.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.3334
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 4.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 4.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.6667
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.1667
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.0833
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.5
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.5
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.75
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 7.6667
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 10.6667
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 12.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 11.6666
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 11.6666
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 6.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 10.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 11.3333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 9.3333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 7.6667
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 7.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 6.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 3.6667
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 2.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.3333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 1.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.5
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 0.75
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.6667
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 5.3333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.6667
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 5.3333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 5.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.3333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 5.6667
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 5.3333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 3.3333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.3333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.6667
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 2.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 2.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 6.3333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 16.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 6.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 5.3333
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 6.6667
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 12.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 12.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 6.0
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 4.6667
    },
    {
        "Mois": "Janvier",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 2.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.5
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 1.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.5
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.1667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 3.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 2.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 6.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 5.6667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 4.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.3334
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.3333
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 6.3334
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 3.3333
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.3333
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.5
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.5
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.5
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.5
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.75
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.5
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.5
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.3334
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 3.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 3.6667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.6667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 2.6667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.6666
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 5.6667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 5.3334
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 4.3334
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 4.3334
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.3334
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.1667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 2.4167
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.5
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.3333
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.6667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.6667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 6.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 5.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.6666
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.3333
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.3333
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.6667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 5.3333
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.6666
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 3.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.6667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.3333
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.75
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 1.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.4
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.4
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.8
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.8
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.6
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.4
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.2667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.5333
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.2
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 2.6667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.2667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.5333
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 3.2
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.2
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.4
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.8667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.8667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.3333
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.6
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.6
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.5
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.0833
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.6666
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 3.6667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.3333
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.3333
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 6.3334
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 5.6667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 5.6667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.6667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 5.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 7.6666
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 5.3333
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 4.6666
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 3.3333
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 2.3334
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.0833
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.5
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.5
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.3333
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 6.3334
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 7.6667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 11.3333
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 11.6666
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 11.3333
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 10.3333
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 14.6667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 11.3333
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 12.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 7.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 7.6667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 5.3334
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 3.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 2.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.75
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 1.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.5
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 0.75
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 4.3333
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 6.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 7.6667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 8.3333
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 9.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 8.6666
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 7.6667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 7.6666
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 7.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 7.3334
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 5.6667
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 2.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.5
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 1.0
    },
    {
        "Mois": "Février",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.5
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.75
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.5
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.6667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.6666
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 7.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 6.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 6.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 4.6667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 5.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.6666
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 5.6667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 6.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.3333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 3.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.3334
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.75
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.5
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.75
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.5
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.75
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.75
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.3333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 3.6667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 5.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 4.3333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.6667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.3333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 4.6667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.6667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.6667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.6667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.0833
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.5
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.5
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 1.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.5
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.6667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.3334
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.3333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.6667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 5.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.6667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 6.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 5.3334
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 6.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 3.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 3.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.6666
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.0833
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.75
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.5
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.5
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.1667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.3333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.6666
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.3334
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 6.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 5.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 4.3334
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.3333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 6.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 7.3333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 5.3334
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 4.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 3.6667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 4.3333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 2.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.5
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.3333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 1.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.4
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.4
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.4
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.4
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.0667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 1.8667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 5.0667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 5.3333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.7333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.2
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.2666
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 5.0666
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 5.8667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 6.1333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 5.3333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.6667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.1334
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.3333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.8
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.4
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.4
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.4
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.4
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.4
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.6
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 3.7334
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 6.6667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 7.4667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 7.7333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 8.2667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 6.1333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 6.6667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 6.1333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 6.1333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 5.6
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 4.2667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 3.7334
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 2.1333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.6
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.3333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.8
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 1.2
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.4
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.4
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.4
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.3333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.6666
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 3.4666
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.5334
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 4.2667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.0
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.5333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 5.8667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 4.2667
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.7334
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.1333
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.4
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.3334
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.4
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.8
    },
    {
        "Mois": "Mars",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.4
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.75
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 1.5
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 2.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 3.6667
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 6.6667
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 2.6666
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 2.6667
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.3333
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.3333
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.3334
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 3.3334
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.6666
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 3.3333
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.1667
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.5
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.5
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.4
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.4
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.6
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.9334
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 3.7334
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 2.6667
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.2667
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 1.6
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 2.4
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.8
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.5333
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.2
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 2.6666
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.1333
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.8666
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 0.8
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.6
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.8
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.4
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.4
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.4
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.5
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.5
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 1.0833
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.6667
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.3333
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 3.3333
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 3.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.3333
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 4.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 5.3333
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 2.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 2.6667
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.6667
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.6666
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.3333
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.0833
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.5
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.5
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 1.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 2.3333
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 4.3333
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 8.3333
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 9.3334
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 6.6666
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 5.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 6.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 6.6667
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 6.6667
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.6667
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 4.3333
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 5.3333
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 4.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.5
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 2.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.5
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 1.5
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.5
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 2.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.6666
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.6667
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 3.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 5.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.6666
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.3333
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.3334
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.3333
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.3333
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 5.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.3334
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.6667
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.0833
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.5
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.75
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.5
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 1.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.75
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 4.6667
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 3.6666
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 7.3334
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 6.6666
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 5.6667
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 4.6667
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.6666
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.6666
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.6666
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 4.6666
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.6666
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.3333
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.3333
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.3334
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.5
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.75
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 1.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.75
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.75
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.3333
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.6666
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 3.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 3.6666
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.3334
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.3334
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.3334
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.3334
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 4.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.6666
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.5
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.5
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.75
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 4.3333
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 2.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 8.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 6.6667
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 9.3334
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 8.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 8.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 6.6666
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 4.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.0
    },
    {
        "Mois": "Avril",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 4.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.66
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 2.6667
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.2267
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 4.4534
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 3.56
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 5.7733
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.5467
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 5.3334
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.88
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 2.2266
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 4.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.2267
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.5567
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.32
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.66
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.66
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 1.5567
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.75
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.6666
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 3.3333
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 4.6666
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 5.6667
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.3333
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.6667
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.6667
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.3333
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 2.6666
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.6667
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.6667
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.3333
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.75
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.3334
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.75
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.5
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.66
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 4.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 3.12
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 4.44
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.88
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 5.7734
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 2.2134
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.56
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.5466
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 6.2133
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 6.6667
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 4.8933
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 4.88
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.2267
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.7733
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.99
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.66
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.99
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.5
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.5
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.75
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.3333
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 3.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 3.6666
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.3333
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.3334
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 4.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.6666
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.3333
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 3.3333
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.3334
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.3333
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.1667
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.5
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.5
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 1.6
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.6
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.4
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.6667
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.8
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.5333
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.7334
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 2.9334
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 2.1333
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 2.9334
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 2.4
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 4.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 1.6
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.0666
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 0.9333
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.8
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.6
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.8
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.6
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.6
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.5
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.5
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 1.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.6666
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 5.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 3.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 2.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 1.6667
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 2.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 2.1667
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 2.3334
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 3.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.3333
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.1667
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.1667
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 1.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 1.5
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.5
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.5
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.1667
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.3333
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 2.6666
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 2.6667
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 2.6667
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 2.3333
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 3.6667
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 2.6667
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 3.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.6666
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.6667
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 2.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.5
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.5
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 2.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 2.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 3.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 6.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 7.4667
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 8.9389
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 11.75
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 10.1667
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 10.2222
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 9.1514
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 7.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 6.5714
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 7.5056
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 8.7917
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 6.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 5.0714
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 4.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 3.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 5.1667
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 6.0
    },
    {
        "Mois": "Mai",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 2.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.5
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 2.6667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 3.6667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 4.3333
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.3333
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.6667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.3333
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 2.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 3.6666
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 1.8333
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 3.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.3334
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.3334
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.5
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.5
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.5
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 1.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 2.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.6667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 4.6666
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 5.3333
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 4.3333
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 3.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.3333
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 4.3334
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.3333
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.6666
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.3334
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.6667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.5
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.5
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.3334
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 4.6667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 6.3333
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 5.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.3334
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.6667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.6666
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 5.6667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.6666
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 3.3333
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 4.6667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.3333
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.3333
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.4167
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.3334
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.75
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.5
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 1.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.6667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.6667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 4.6666
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 5.6666
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.3333
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.6666
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 2.6667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.3333
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 3.6666
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.3334
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 5.3333
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.6667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.5
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.5
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.75
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.5
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.5
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 2.3334
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 4.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 3.6666
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 3.6667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 3.6666
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.6667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 4.6667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.3333
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 5.3333
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 5.3333
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 2.6666
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.3334
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.3334
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.75
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.5
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.4
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.6
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.2
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.8667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.6667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 2.6666
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 2.9333
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 1.6
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 2.4
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 1.8666
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.4666
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 2.1333
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 1.0667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 0.8667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.0667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.6
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.4
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.4
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.4
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.4
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.4
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.8667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.8667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 1.6
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 2.9334
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 2.1333
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 2.9333
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 2.6667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.2
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 2.4
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.4667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 2.6667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.4667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.6667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.8667
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 2.0
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.0666
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.2
    },
    {
        "Mois": "Juin",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.4
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.4
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.6
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.4
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.9333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 5.8667
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 5.0667
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.7333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 4.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.2666
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.4666
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 3.4667
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 1.3334
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.8667
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.1333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.3333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.6
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.0667
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.4
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.6
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.4
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.8667
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 3.2
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 4.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 3.7333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.8
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 5.0667
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.4666
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.4667
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 3.7334
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 2.4
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.9333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.4
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.4
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.3333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.0667
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.8
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.4
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.4
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.4
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.6
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.6
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.1333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.9333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.2667
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.4667
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.4667
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 2.6667
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 2.9333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.4
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.6667
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.1333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.2
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.8
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.9333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.4
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 1.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 1.3333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 2.3333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 3.3333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 4.6666
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 5.6666
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 5.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.3333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 5.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.6667
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 3.3333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 5.3333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 3.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.3334
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.6667
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.5
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 1.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.5
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 1.6666
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 4.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 5.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 6.3333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 6.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.3333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 4.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.6667
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 5.6667
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 4.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 0.75
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.5
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.5
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.5
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.5
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.75
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.6667
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 3.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 3.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.3333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.6667
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 2.6667
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 3.3333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 2.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 1.3333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.3333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.3333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.5
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.5
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.5
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.66
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.34
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.32
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 4.4534
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 2.6667
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 2.2267
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.12
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.12
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 2.68
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 2.2266
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.44
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 2.68
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.6533
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 3.1067
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.32
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 2.2266
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.99
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 2.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 4.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 6.3333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 6.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 8.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 6.3333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 8.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 2.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 5.3333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 5.3333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 10.0
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 5.3333
    },
    {
        "Mois": "Juillet",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 3.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.5
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.75
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 2.3333
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 3.3334
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 4.3334
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 3.3334
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 3.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.6667
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.3333
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.3334
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 3.6666
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 3.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.75
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.3334
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.75
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 1.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 1.1667
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.8333
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 4.6667
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.6667
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 5.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 2.6667
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.3334
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.6666
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 3.6666
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.3334
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 3.3333
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.3333
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.6667
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.6667
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.5
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 1.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.5
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 1.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 3.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 2.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.6667
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 6.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 1.6667
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 2.3334
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 1.3333
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.6667
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.75
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.1667
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.5
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 1.5
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.5
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.6667
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 3.6667
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 3.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.3333
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 4.3333
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.3333
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 3.3333
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 2.3333
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 3.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 0.75
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.0833
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 0.5
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.75
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.0833
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.5
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.4
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.4
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.6
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.8
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.6
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 5.6
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.2667
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.4666
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.4667
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.2
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 2.9333
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 1.6
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.4
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.2
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.9333
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.4
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.2
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.4
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.4
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.8
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.4
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 1.2
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.0667
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.1334
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.4
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 3.7333
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 3.2
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 2.6667
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 1.8666
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 1.6
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 2.4
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 2.6667
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 1.8667
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 1.0667
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 0.8
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.3334
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.9333
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.2
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.8
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.4
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.6
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.5
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 1.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 1.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.5
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.0833
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 3.3334
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 2.6666
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 2.3334
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 2.6667
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 1.6666
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 2.6667
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 2.6666
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 2.6666
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 3.3333
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.6666
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.3334
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.3334
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 2.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 8.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 4.3333
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 3.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 6.6666
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 9.3333
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 12.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 7.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 3.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 3.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.0
    },
    {
        "Mois": "Août",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 2.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.4
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.4
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.4
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.4
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.9333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.0667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.6
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 3.7334
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 2.6666
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 2.9334
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.4667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 2.4
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.8
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.2667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.4667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 2.9333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.1334
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.6
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.8667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.8
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.8
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.4
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.8
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.4
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 1.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.5
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.5
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.5
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 1.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 3.3333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 3.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 5.6667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.3333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.3333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 4.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.3333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 7.6667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 5.6666
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 4.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.6667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 3.3333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.75
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.5
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 1.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.75
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.5
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 2.3333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.6667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 5.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 3.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 3.3333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 2.6667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.6667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.6666
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 4.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.3334
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 0.75
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.6666
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.3333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.1667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.5
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 3.6667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 5.3333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 5.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.6667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.3333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.3334
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 6.3334
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.3333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.3334
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 3.3334
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 1.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 1.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 1.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 2.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 3.3333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 5.6666
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.3334
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 5.3333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.3334
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 4.6667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 5.3334
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.6666
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 5.3333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 4.3334
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.6667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 3.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.5
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.5
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.5
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.75
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.5
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.5
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.6667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.3333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.3334
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 1.75
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 2.3334
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 2.6666
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 3.3333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 2.3333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 2.5833
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.0
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.5
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.1667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.3334
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.75
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.4
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.4
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.8
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 0.8
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 1.8667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 2.1333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 2.1333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 1.6
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 1.3333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 1.6
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 2.9333
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 1.0667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 1.8666
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 1.8667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.6
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.0667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.2
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.8
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.8667
    },
    {
        "Mois": "Septembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.6
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.75
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.6667
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.6667
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 4.6666
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.3334
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.3333
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 5.3334
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 4.0
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.0
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 5.0
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.6666
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 3.0
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.0
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.5
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.6667
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.0
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.75
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.0
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.4
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.4
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.8
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.3334
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.1334
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 4.2667
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 3.2
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 3.4666
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.2
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 2.4
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.2
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 3.2
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.0
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 4.2667
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 1.8667
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.8667
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.3333
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.3334
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.8667
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.4
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.4
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.4
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.6
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.6
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.6667
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 2.9334
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 2.9333
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 2.9333
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 2.9333
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.4667
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 3.2
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.5334
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 2.4
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 1.6
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.6
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.3333
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.3333
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.3333
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.6
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.6
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.9333
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.8
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.2
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.6666
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.1333
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 2.4
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 2.9334
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 2.1333
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 2.6666
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.0
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.5333
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.4667
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 3.7334
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.1334
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.6
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.0667
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.9333
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.6
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.8
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.8
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 1.0
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.5
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.5
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.5
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.9167
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 3.3334
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.6666
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 3.6667
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 5.0
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 2.6667
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 4.0
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.6666
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 3.3334
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.0
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 5.6667
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.0
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.1667
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.1667
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.3333
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.5
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.1667
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.75
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.75
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.5
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.75
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.6667
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.3333
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 3.0
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 3.3333
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.3333
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 2.0
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 2.3334
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 2.3333
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 1.3333
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 1.3334
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 1.0833
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.0
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.0
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.75
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.5
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.5
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.5
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.75
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.0
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.3333
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.3334
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 1.6667
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 3.3334
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.6666
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 2.25
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.3333
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 3.6667
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 2.3334
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 1.6667
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 1.3333
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.3334
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.0
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.75
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.0
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.5
    },
    {
        "Mois": "Octobre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.5
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.99
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 0.99
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.2267
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 3.56
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 2.6666
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.44
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.9866
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.8933
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.44
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 4.4534
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.56
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.2266
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.99
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.66
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.5
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.75
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.6666
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.6667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 2.6667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 1.3333
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 2.6667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 2.6667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 2.3333
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 4.6667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.6667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.6667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.3333
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.0833
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.1667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.5
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 1.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.75
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.3333
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 2.6666
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.3333
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 2.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 2.6667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.6667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 3.6667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.6666
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 4.3333
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 4.3333
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.6667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.75
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.75
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.5
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 1.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.5
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 0.5
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.5
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.5
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.3334
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 1.6667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 2.6667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.6667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 4.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 2.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.6666
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 5.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 4.3333
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 3.6666
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.3333
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.3333
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.75
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.1667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.5
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.5
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 2.3334
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.6666
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.3333
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 5.3333
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.6667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.6667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.6667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 4.3333
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.6666
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 3.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.3333
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.0833
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.3334
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 1.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.4
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.4
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.4
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.4
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 0.9333
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 1.3334
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 1.4667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 1.3334
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 1.8667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 1.6
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 2.6666
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 3.2
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 2.1333
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 2.6667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.1334
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 0.8
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.6
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.6
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.0667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.8
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.6
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.5
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.5
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.0833
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 1.5
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 2.3333
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 2.3333
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 2.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 1.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 2.3333
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 2.6666
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 2.6667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.5
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 3.6667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.6667
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.6666
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 1.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "03h00 - 03h59",
        "mean": 2.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 2.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 3.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 7.5333
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 6.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 9.6
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 8.7333
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 8.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 6.25
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 8.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 6.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 8.5833
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 4.3333
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 5.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 6.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 5.4
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 2.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 2.0
    },
    {
        "Mois": "Novembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 2.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.6
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.4
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.8
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 0.8
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 1.6
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 5.3333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.5333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.8
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 2.1333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 3.4666
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 4.2667
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 3.4667
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.9333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.6
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.2
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.2
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.4
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Lundi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.0666
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.4
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.8
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.3334
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 1.0667
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 1.8667
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 3.7333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 2.1334
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.2
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 2.1333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 2.9333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.2
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 2.6667
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 1.3333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.0667
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 0.8
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.6
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.6
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.4
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mardi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.4
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.66
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.7734
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 4.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 6.6666
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 7.5467
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.8933
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 6.2133
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 6.6667
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 8.4534
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 8.44
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 6.68
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 5.3333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 3.56
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 3.1067
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.7733
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.99
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Mercredi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.99
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.5
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "02h00 - 02h59",
        "mean": 0.5
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 1.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.6666
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 4.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 3.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.3333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 3.6667
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 3.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 5.6667
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 6.6666
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 5.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 6.6667
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 3.3334
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 1.6667
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 1.3333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.75
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.5
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.5
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Jeudi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 0.5
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 2.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 1.0833
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 3.6667
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.6667
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 5.6667
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 4.6666
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 5.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 5.3333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 6.3333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 5.3334
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 6.3333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.6667
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 2.3333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 2.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.5
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Vendredi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 0.5
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.75
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "01h00 - 01h59",
        "mean": 1.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "04h00 - 04h59",
        "mean": 0.5
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.5
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 0.5
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 3.3333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 3.6666
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 8.3333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 6.3333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 7.6667
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 8.6667
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 8.3334
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 9.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 5.6666
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 4.6667
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 4.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 4.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 3.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 1.3333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 1.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 0.5
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Samedi",
        "Créneau_Horaire": "23h00 - 23h59",
        "mean": 1.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "00h00 - 00h59",
        "mean": 0.4
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "05h00 - 05h59",
        "mean": 0.4
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "06h00 - 06h59",
        "mean": 0.8
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 1.8666
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 2.6666
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 3.7333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.5334
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 5.3333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 4.2667
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 3.7334
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 4.8
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 4.2667
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 2.9333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "17h00 - 17h59",
        "mean": 2.6667
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "18h00 - 18h59",
        "mean": 1.6
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 0.9333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 0.8
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Dimanche",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 0.9333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "07h00 - 07h59",
        "mean": 2.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "08h00 - 08h59",
        "mean": 4.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "09h00 - 09h59",
        "mean": 4.3333
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "10h00 - 10h59",
        "mean": 4.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "11h00 - 11h59",
        "mean": 2.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "12h00 - 12h59",
        "mean": 2.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "13h00 - 13h59",
        "mean": 2.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "14h00 - 14h59",
        "mean": 3.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "15h00 - 15h59",
        "mean": 8.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "16h00 - 16h59",
        "mean": 4.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "19h00 - 19h59",
        "mean": 2.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "20h00 - 20h59",
        "mean": 2.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "21h00 - 21h59",
        "mean": 2.0
    },
    {
        "Mois": "Décembre",
        "Jour_Semaine": "Férié",
        "Créneau_Horaire": "22h00 - 22h59",
        "mean": 2.0
    }
  // ⬆️ FIN DE LA ZONE DE COPIER-COLLER ⬆️
  // Vous pouvez copier-coller directement votre tableau JSON complet ici
];

// Export pour utilisation dans d'autres fichiers
//export default tmaData;


// Exposer les données via une variable globale
window.tmaDataJSON = tmaData;

console.log('✅ Données TMA chargées');
