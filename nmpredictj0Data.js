/**
 * Fichier de données Predict NM
 * Structure attendue : Map avec des objets contenant :
 * - metadata: { FDATE, IMPDATE, NBVOLS }
 * - flightData: tableau de vols
 */

const nmpredictj0Data = new Map();

// COLLER VOS DONNEES PREDICT NM ICI - Exemple de format :
nmpredictj0Data.set("20230115", {
  metadata: {
    FDATE: "20230115",
    IMPDATE: "20230114T120000",
    NBVOLS: 456
  },
  flightData: [
    {
      entry: "value1",
      arcid: "value2",
      adep: "value3",
      ades: "value4",
      atyp: "value5",
      timeSlot: "08:15"
    },
    // ... autres vols
  ]
});

// Export pour utilisation dans d'autres fichiers
export default nmpredictj0Data;
