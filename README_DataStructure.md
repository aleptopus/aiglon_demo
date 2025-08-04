# 📊 Guide de Structure des Données - Aiglon Futé

## 🎯 Vue d'ensemble

Le système Aiglon Futé utilise maintenant des fichiers JavaScript pré-intégrés pour charger les données automatiquement. Plus besoin de charger manuellement des fichiers CSV/JSON !

## 🗂️ Structure des Fichiers de Données

### 1. **Données COHOR Été** - `summer_cohorData.js`

**Utilisation :** Bouton "Aiglon futé saison été 2025"

**Structure attendue :** Format CSV brut avec points-virgules
```csv
N/D;Airport;Flight Number;A/D;Time;From;To;Ops Days;Org/Nxt;Prv/Fin;Seats;A/C;STC;Frequency;Wait;;;;Season;Rotation ID;Code;Registration;Last Update;
N;LYS;AC  876;A;0835;20250330;20250330;0000007;YUL;YUL;297;333;J;1;;;;;S25;0;;;28JAN25 1944;
N;LYS;AC  877;D;1200;20250330;20250330;0000007;YUL;YUL;297;333;J;1;;;;;S25;10;;;28JAN25 1944;
```

**📍 Où copier-coller vos données :**
- Ouvrir le fichier `summer_cohorData.js`
- Localiser la variable `cohorDataCSV` (ligne 12)
- Remplacer tout le contenu entre les backticks `` ` ``
- Copier-coller directement votre fichier CSV complet (avec l'en-tête)

---

### 2. **Données COHOR Hiver** - `winter_cohorData.js`

**Utilisation :** Bouton "Aiglon futé saison hiver 2025"

**Structure identique aux données été** (format CSV)

**📍 Où copier-coller vos données :**
- Ouvrir le fichier `winter_cohorData.js`
- Localiser la variable `cohorDataCSV` (ligne 12)
- Remplacer tout le contenu entre les backticks `` ` ``
- Copier-coller directement votre fichier CSV hiver complet

---

### 3. **Données TMA** - `tmaData.js`

**Utilisation :** Chargé automatiquement avec les données COHOR (été et hiver)

**Structure attendue :**
```javascript
const tmaData = [
  {
    "Mois": "Janvier",                    // Nom du mois
    "Jour_Semaine": "Lundi",              // Jour de la semaine
    "Créneau_Horaire": "01h00 - 01h59",   // Créneau horaire
    "mean": 0.5                           // Moyenne du trafic TMA
  },
  // ... autres créneaux
];
```

**📍 Où copier-coller vos données :**
- Ouvrir le fichier `tmaData.js`
- Remplacer le contenu du tableau `tmaData = [...]` (ligne 18)
- Copier-coller directement votre tableau JSON complet
- Structure : `Mois`, `Jour_Semaine`, `Créneau_Horaire`, `mean`

---

### 4. **Données NM Predict** - `nmpredictj0Data.js` à `nmpredictj4Data.js`

**Utilisation :** Bouton "NM Predict"

**Structure attendue :**
```javascript
const nmpredictj0Data = new Map();

nmpredictj0Data.set("20250715", {
  metadata: {
    FDATE: "20250715",           // Date du fichier (YYYYMMDD)
    IMPDATE: "20250714T120000",  // Date d'import
    NBVOLS: 456                  // Nombre de vols
  },
  flightData: [
    {
      entry: "LFLL",             // Point d'entrée
      exit: "LFLL",              // Point de sortie (pour vols internes TMA)
      arcid: "AFR1234",          // Identifiant vol
      adep: "LFPG",              // Aéroport de départ
      ades: "LFLL",              // Aéroport d'arrivée
      atyp: "A320",              // Type d'avion
      timeSlot: "08:15"          // Créneau horaire
    },
    // ... autres vols
  ]
});
```

**📍 Où copier-coller vos données :**

#### **Fichier J+0** (`nmpredictj0Data.js`)
- Ligne 11 : Remplacer `nmpredictj0Data.set("20230115", { ... });`
- Utiliser la date du jour J+0 comme clé (format YYYYMMDD)

#### **Fichier J+1** (`nmpredictj1Data.js`)
- Même structure, remplacer le contenu avec les données J+1

#### **Fichier J+2** (`nmpredictj2Data.js`)
- Même structure, remplacer le contenu avec les données J+2

#### **Fichier J+3** (`nmpredictj3Data.js`)
- Même structure, remplacer le contenu avec les données J+3

#### **Fichier J+4** (`nmpredictj4Data.js`)
- Même structure, remplacer le contenu avec les données J+4

---

## 🔄 Processus de Mise à Jour des Données

### **Étape 1 : Préparation des données**
1. Convertir vos fichiers CSV/JSON en format JavaScript
2. Respecter la structure exacte des objets
3. Utiliser les bonnes dates et formats

### **Étape 2 : Mise à jour des fichiers**
1. Ouvrir le fichier correspondant (summer, winter, ou nmpredictjX)
2. Localiser la zone de données (après le commentaire `// COLLER VOS DONNEES...`)
3. Remplacer le contenu existant par vos nouvelles données
4. Sauvegarder le fichier

### **Étape 3 : Test**
1. Ouvrir `index.html` dans le navigateur
2. Cliquer sur le bouton correspondant à vos données
3. Vérifier que le chargement s'effectue correctement

---

## ⚠️ Points Importants

### **Formats de Date**
- **date** : `new Date('2025-07-15')` (format ISO)
- **datetime** : `new Date('2025-07-15T08:15:00Z')` (UTC)
- **timeSlot** : `"08:15"` (format HH:MM)

### **Valeurs Booléennes**
- **isArrival** : `0` (non) ou `1` (oui)
- **isDeparture** : `0` (non) ou `1` (oui)

### **Clés de Map (NM Predict)**
- Format : `"YYYYMMDD"` (ex: `"20250715"`)
- Doit correspondre à la date du fichier

### **Métadonnées NM**
- **FDATE** : Date du fichier (YYYYMMDD)
- **IMPDATE** : Date d'import (YYYYMMDDTHHMMSS)
- **NBVOLS** : Nombre total de vols dans le fichier

---

## 🚀 Exemple Complet

### **Données COHOR (été/hiver/TMA)**
```javascript
const cohorData = [
  {
    date: new Date('2025-07-15'),
    datetime: new Date('2025-07-15T06:30:00Z'),
    timeSlot: "06:30",
    isArrival: 1,
    isDeparture: 0
  },
  {
    date: new Date('2025-07-15'),
    datetime: new Date('2025-07-15T07:45:00Z'),
    timeSlot: "07:45",
    isArrival: 0,
    isDeparture: 1
  }
];
```

### **Données NM Predict**
```javascript
const nmpredictj0Data = new Map();

nmpredictj0Data.set("20250715", {
  metadata: {
    FDATE: "20250715",
    IMPDATE: "20250714T180000",
    NBVOLS: 234
  },
  flightData: [
    {
      entry: "LFLL",
      exit: "LFLY",
      arcid: "AFR7628",
      adep: "LFPG",
      ades: "LFLL",
      atyp: "A320",
      timeSlot: "06:30"
    },
    {
      entry: "LFLY",
      exit: "LFLL",
      arcid: "EZY4521",
      adep: "LFLL",
      ades: "EGLL",
      atyp: "A319",
      timeSlot: "07:45"
    }
  ]
});
```

---

## 🔧 Dépannage

### **Erreur "Données vides"**
- Vérifier que le tableau/Map n'est pas vide
- Contrôler la syntaxe JavaScript (virgules, accolades)

### **Erreur de format de date**
- Utiliser `new Date('YYYY-MM-DD')` pour les dates
- Utiliser `new Date('YYYY-MM-DDTHH:MM:SSZ')` pour datetime

### **Bouton ne répond pas**
- Ouvrir la console du navigateur (F12)
- Vérifier les erreurs JavaScript
- Contrôler que les fichiers sont bien sauvegardés

---

## 📞 Support

En cas de problème, vérifier :
1. La syntaxe JavaScript (pas d'erreurs de virgules/accolades)
2. Les formats de date (ISO 8601)
3. La structure des objets (propriétés requises)
4. La console du navigateur pour les erreurs

Le système charge automatiquement les données et affiche le statut de chargement sous chaque bouton.