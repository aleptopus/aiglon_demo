/**
 * 🔄 CHARGEUR DE DONNÉES AUTOMATIQUE
 * 
 * Ce module gère le chargement automatique des données depuis les fichiers JavaScript
 * pour remplacer les inputs de fichiers manuels.
 */

// Configuration des sources de données
const DATA_SOURCES = {
    summer: {
        name: 'Aiglon futé saison été 2025',
        cohorData: () => window.summerCohorDataCSV,
        tmaData: () => window.tmaDataJSON
    },
    winter: {
        name: 'Aiglon futé saison hiver 2025', 
        cohorData: () => window.winterCohorDataCSV,
        tmaData: () => window.tmaDataJSON
    },
    nmpredict: {
        name: 'NM Predict',
        nmData: () => ({
            j0: window.nmpredictj0Data,
            j1: window.nmpredictj1Data,
            j2: window.nmpredictj2Data,
            j3: window.nmpredictj3Data,
            j4: window.nmpredictj4Data
        })
    }
};

/**
 * Charge les données COHOR (été ou hiver) + TMA automatiquement
 */
async function loadCohorData(season) {
    try {
        // Reset filters when changing data source
        if (window.AiglonCore && window.AiglonCore.resetFilters) {
            window.AiglonCore.resetFilters();
        }
        
        // Update button states
        updateButtonStates(season === 'summer' ? 'loadSummerDataBtn' : 'loadWinterDataBtn');
        
        const source = DATA_SOURCES[season];
        if (!source || !source.cohorData) {
            throw new Error(`Source COHOR ${season} non trouvée`);
        }

        const csvData = source.cohorData();
        const tmaData = source.tmaData();
        
        if (!csvData) {
            throw new Error(`Données COHOR ${season} non disponibles`);
        }
        if (!tmaData) {
            throw new Error(`Données TMA non disponibles`);
        }

        console.log(`📊 Chargement des données ${source.name} + TMA`);
        
        // Simuler le chargement de fichier CSV COHOR
        const csvBlob = new Blob([csvData], { type: 'text/csv' });
        const csvFile = new File([csvBlob], `cohor_${season}.csv`, { type: 'text/csv' });
        
        // Simuler le chargement de fichier TMA JSON
        const tmaBlob = new Blob([JSON.stringify(tmaData)], { type: 'application/json' });
        const tmaFile = new File([tmaBlob], 'tma_data.json', { type: 'application/json' });

        // Traiter les fichiers avec les fonctions des modules
        if (window.AiglonCohor) {
            // D'abord charger les données COHOR
            window.AiglonCohor.processCsvFile(csvFile);
            
            // Puis charger automatiquement les données TMA
            setTimeout(() => {
                window.AiglonCohor.processTmaFile(tmaFile);
                console.log(`✅ Données ${source.name} + TMA chargées avec succès`);
            }, 100); // Petit délai pour s'assurer que COHOR est chargé en premier
            
        } else {
            throw new Error('Module AiglonCohor non disponible');
        }
        
    } catch (error) {
        console.error(`❌ Erreur lors du chargement des données ${season}:`, error);
        alert(`Erreur lors du chargement des données ${season}: ${error.message}`);
    }
}

/**
 * Charge les données NM Predict
 */
async function loadNMPredictData() {
    try {
        // Reset filters when changing data source
        if (window.AiglonCore && window.AiglonCore.resetFilters) {
            window.AiglonCore.resetFilters();
        }
        
        // Update button states
        updateButtonStates('loadNMPredictDataBtn');
        
        const source = DATA_SOURCES.nmpredict;
        const nmData = source.nmData();
        
        // Vérifier que toutes les données J0-J4 sont disponibles
        for (let i = 0; i <= 4; i++) {
            if (!nmData[`j${i}`]) {
                throw new Error(`Données NM Predict J${i} non disponibles`);
            }
        }

        console.log(`📊 Chargement des données ${source.name}`);
        
        // Traiter directement les données sans passer par FileReader
        if (window.AiglonNM) {
            // Clear COHOR data but preserve TMA data for potential return to COHOR view
            const core = window.AiglonCore;
            core.setState('cohorData', []);
            // Don't clear tmaMap to preserve TMA data: core.setState('tmaMap', new Map());
            core.setState('activeDataSource', 'predictNM');
            
            // Process each day's data directly
            let filesProcessed = 0;
            const predictNMData = new Map();
            
            for (let i = 0; i <= 4; i++) {
                const dayData = nmData[`j${i}`];
                
                // Les données sont déjà au format correct (ligne JSON + données CSV)
                const result = processPredictNMFileContent(dayData);
                if (result) {
                    predictNMData.set(result.metadata.FDATE, result);
                }
                filesProcessed++;
            }
            
            // Set the processed data and initialize
            core.setState('predictNMData', predictNMData);
            
            // Setup NM traffic toggles and initialize application
            if (window.AiglonNM.setupNMTrafficToggles) {
                window.AiglonNM.setupNMTrafficToggles();
            }
            if (window.AiglonNM.initializeApplication) {
                window.AiglonNM.initializeApplication('predictNM');
            }
            
        } else {
            throw new Error('Module AiglonNM non disponible');
        }
        
        console.log(`✅ Données ${source.name} chargées avec succès`);
        
    } catch (error) {
        console.error(`❌ Erreur lors du chargement des données NM Predict:`, error);
        alert(`Erreur lors du chargement des données NM Predict: ${error.message}`);
    }
}

/**
 * Fonction helper pour traiter le contenu des fichiers NM Predict
 */
function processPredictNMFileContent(fileContent) {
    const lines = fileContent.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) {
        console.warn("Fichier Predict NM vide ou invalide.");
        return null;
    }

    let metadata = {};
    try {
        metadata = JSON.parse(lines[0]);
    } catch (e) {
        console.error("Erreur de parsing des métadonnées Predict NM:", e);
        return null;
    }

    const headerLine = lines[1];
    const dataRows = lines.slice(2);
    const headers = headerLine.split(',').map(h => h.trim());

    const colIndices = {
        entry: headers.indexOf("entry"),
        exit: headers.indexOf("exit"),
        arcid: headers.indexOf("arcid"),
        adep: headers.indexOf("adep"),
        ades: headers.indexOf("ades"),
        atyp: headers.indexOf("atyp")
    };

    // Vérifier les colonnes requises
    const requiredColumns = ['entry', 'arcid', 'adep', 'ades', 'atyp'];
    if (requiredColumns.some(col => colIndices[col] === -1)) {
        console.error("Une ou plusieurs colonnes requises sont manquantes dans le fichier Predict NM.");
        return null;
    }

    const flights = [];
    dataRows.forEach(row => {
        const values = row.split(',').map(v => v.trim());
        if (values.length <= Math.max(...Object.values(colIndices))) {
            return;
        }

        const entryTime = values[colIndices.entry];
        const exitTime = colIndices.exit !== -1 ? values[colIndices.exit] : null;
        const adep = values[colIndices.adep]?.toUpperCase();
        const ades = values[colIndices.ades]?.toUpperCase();
        const arcid = values[colIndices.arcid];
        const atyp = values[colIndices.atyp];

        // Utiliser la logique de classification du module NM
        if (window.AiglonNM && window.AiglonNM.createFlightEvent) {
            if (isInternalTMAFlight(adep, ades) && exitTime) {
                flights.push(window.AiglonNM.createFlightEvent(entryTime, arcid, adep, ades, atyp, 'entry'));
                flights.push(window.AiglonNM.createFlightEvent(exitTime, arcid, adep, ades, atyp, 'exit'));
            } else {
                flights.push(window.AiglonNM.createFlightEvent(entryTime, arcid, adep, ades, atyp, 'entry'));
            }
        }
    });

    return { metadata, flights };
}

// Helper function pour détecter les vols internes TMA
function isInternalTMAFlight(adep, ades) {
    const TMA_AIRPORTS = ['LFLY', 'LFLS', 'LFLU', 'LFLB', 'LFLP'];
    return TMA_AIRPORTS.includes(adep) && TMA_AIRPORTS.includes(ades);
}

/**
 * Met à jour l'état visuel des boutons (sélectionné/non-sélectionné)
 */
function updateButtonStates(selectedButtonId) {
    const buttons = ['loadSummerDataBtn', 'loadWinterDataBtn', 'loadNMPredictDataBtn'];
    
    buttons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            if (buttonId === selectedButtonId) {
                button.classList.add('selected');
            } else {
                button.classList.remove('selected');
            }
        }
    });
}

/**
 * Initialise les boutons de chargement automatique
 */
function initializeDataButtons() {
    // Bouton été
    const summerBtn = document.getElementById('loadSummerDataBtn');
    if (summerBtn) {
        summerBtn.addEventListener('click', () => loadCohorData('summer'));
    }
    
    // Bouton hiver
    const winterBtn = document.getElementById('loadWinterDataBtn');
    if (winterBtn) {
        winterBtn.addEventListener('click', () => loadCohorData('winter'));
    }
    
    // Bouton NM Predict
    const nmBtn = document.getElementById('loadNMPredictDataBtn');
    if (nmBtn) {
        nmBtn.addEventListener('click', () => loadNMPredictData());
    }
    
    console.log('🔄 Boutons de chargement automatique initialisés');
}

// Initialiser les boutons au chargement de la page
document.addEventListener('DOMContentLoaded', initializeDataButtons);