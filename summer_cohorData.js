/**
 * Fichier de données COHOR
 * Structure attendue : Tableau d'objets avec les propriétés suivantes
 * Format : [
 *   { date: Date, datetime: Date, timeSlot: string, isArrival: number, isDeparture: number },
 *   ...
 * ]
 */

const cohorData = [
  // COLLER VOS DONNEES COHOR ICI - Exemple de format :
  {
    date: new Date('2023-01-15'),
    datetime: new Date('2023-01-15T08:15:00Z'),
    timeSlot: "08:15",
    isArrival: 0,
    isDeparture: 1
  },
  {
    date: new Date('2023-01-15'),
    datetime: new Date('2023-01-15T09:30:00Z'),
    timeSlot: "09:30",
    isArrival: 1,
    isDeparture: 0
  },
  // ... autres vols
];

// Export pour utilisation dans d'autres fichiers
export default cohorData;
