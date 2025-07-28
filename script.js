document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements & State ---
    const elements = {
        csvFile: document.getElementById('csvFileInput'),
        jsonFile: document.getElementById('jsonFileInput'),
        predictNMFile: document.getElementById('predictNMFileInput'), // New
        csvName: document.getElementById('csvFileName'),
        jsonName: document.getElementById('jsonFileName'),
        predictNMName: document.getElementById('predictNMFileName'), // New
        initialMsg: document.getElementById('initialMessage'),
        dashboard: document.getElementById('dashboardContent'),
        dateStartInput: document.getElementById('dateStartInput'),
        dateEndInput: document.getElementById('dateEndInput'),
        dateSliderContainer: document.getElementById('date-slider-container'),
        dayToggles: document.getElementById('dayOfWeekToggles'),
        trafficToggles: document.getElementById('trafficTypeToggles'),
        avgDep: document.getElementById('avgDep'),
        avgArr: document.getElementById('avgArr'),
        avgTma: document.getElementById('avgTma'),
        avgTotal: document.getElementById('avgTotal'),
        chartCanvas: document.getElementById('trafficChart').getContext('2d'),
        chartTitle: document.querySelector('.chart-header h2'),
        toggleStackedBtn: document.getElementById('toggleStackedBtn'),
        toggleSideBySideBtn: document.getElementById('toggleSideBySideBtn'),
        toggleUTCBtn: document.getElementById('toggleUTCBtn'),
        toggleLocalBtn: document.getElementById('toggleLocalBtn'),
        // summaryTableHead: document.querySelector('#summaryTable thead'), // Removed global reference
        // summaryTableBody: document.querySelector('#summaryTable tbody'), // Removed global reference
        capacityControlsCard: document.getElementById('capacityControlsCard'),
        periodSelect: document.getElementById('periodSelect'),
        sivSelect: document.getElementById('sivSelect'),
        synthesisContent: document.getElementById('synthesisContent'), // New unified synthesis content
        predictNMSummaryCard: document.getElementById('predictNMSummaryCard'), // New
        predictNMTableCard: document.getElementById('predictNMTableCard'), // New
        predictNMTableBody: document.querySelector('#predictNMTable tbody'), // New
        predictNMFilterInput: document.getElementById('predictNMFilterInput'), // New
        togglePredictNMTableBtn: document.getElementById('togglePredictNMTableBtn'), // New
    };

    console.log('vacationGrids at init:', vacationGrids);
    console.log('staffingMap at init:', staffingMap);

    let state = {
        cohorData: [],
        tmaMap: new Map(),
        predictNMData: new Map(), // Map to store Predict NM data by FDATE
        grilleVacations: vacationGrids,
        compoEquipe: staffingMap,
        combinedData: [],
        fullDateRange: [],
        currentStartDate: null,
        currentEndDate: null,
        isStacked: true,
        trafficChart: null,
        windowDurationMs: 0,
        selectedGrid: null,
        customAgentSelection: { Je: [], M: [], J: [], SN: [] },
        availableAgents: { Je: [], M: [], J: [], SN: [] },
        useUTC: true,
        activeDataSource: null, // New: 'cohor' or 'predictNM'
    };

    console.log('state.grilleVacations after init:', state.grilleVacations);
    console.log('state.compoEquipe after init:', state.compoEquipe);

    // Instantiate CapacityCalculator
    const capacityCalculator = new CapacityCalculator(staffingMap, sivRules, vacationGrids);
    
    // --- Constants ---
    const DAYS_OF_WEEK = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    const TRAFFIC_TYPES = [
        { key: "isArrival", label: "Arrivées", color: 'rgba(158, 206, 106, 0.8)' },
        { key: "isDeparture", label: "Départs", color: 'rgba(247, 118, 142, 0.8)' },
        { key: "tma", label: "TMA", color: 'rgba(122, 162, 247, 0.8)' }
    ];

    // New: Predict NM Colors
    const PREDICT_NM_COLORS = {
        'arrivées_LL': 'rgba(0, 128, 0, 0.15)',   // #008000
        'arrivées_LY': 'rgba(0, 255, 0, 0.15)',   // #00FF00
        'arrivées_LS': 'rgba(102, 205, 170, 0.15)',// #66CDAA
        'arrivées_LB+LP': 'rgba(30, 144, 255, 0.15)',// #1E90FF
        'départs_LL': 'rgba(255, 0, 0, 0.15)',    // #FF0000
        'départs_LY+LS': 'rgba(255, 105, 180, 0.15)',// #FF69B4
        'départs_LB+LP': 'rgba(0, 0, 255, 0.15)', // #0000FF
        'LU': 'rgba(255, 215, 0, 0.15)',  // #FFD700
        'transits': 'rgba(0, 0, 0, 0.15)'         // #000000
    };

    // --- Event Listeners ---
        elements.csvFile.addEventListener('change', handleCohorFile);
        elements.jsonFile.addEventListener('change', handleTmaFile);
        elements.predictNMFile.addEventListener('change', handlePredictNMFiles); // New
        elements.predictNMFilterInput.addEventListener('input', updatePredictNMTable); // New
        [elements.dateStartInput, elements.dateEndInput].forEach(el => el.addEventListener('change', updateFromDateInputs));
        elements.sivSelect.addEventListener('change', () => updateDashboard(false));
        elements.periodSelect.addEventListener('change', handleGridSelection);
        
        // New event listeners for chart view and timezone buttons
        elements.toggleStackedBtn.addEventListener('click', () => { state.isStacked = true; updateChartTypeButtons(); updateDashboard(false); });
        elements.toggleSideBySideBtn.addEventListener('click', () => { state.isStacked = false; updateChartTypeButtons(); updateDashboard(false); });
        elements.toggleUTCBtn.addEventListener('click', () => { state.useUTC = true; updateTimezoneButtons(); updateDashboard(false); });
        elements.toggleLocalBtn.addEventListener('click', () => { state.useUTC = false; updateTimezoneButtons(); updateDashboard(false); });
        elements.togglePredictNMTableBtn.addEventListener('click', togglePredictNMTableVisibility); // New

    function handleCohorFile(event) {
        console.log("handleCohorFile called");
        const file = event.target.files[0];
        if (!file) return;

        // Clear Predict NM data and UI
        state.predictNMData.clear();
        elements.predictNMName.textContent = 'Aucun fichier';
        elements.predictNMSummaryCard.classList.add('hidden');
        elements.predictNMTableCard.classList.add('hidden');

        // Clear TMA data and UI when new COHOR is loaded
        state.tmaMap.clear();
        elements.jsonName.textContent = 'Aucun fichier';

        elements.csvName.textContent = file.name;
        state.activeDataSource = 'cohor'; // Set active data source

        const reader = new FileReader();
        reader.onload = (e) => {
            state.cohorData = processCohorCSV(e.target.result);
            if (state.cohorData.length > 0) {
                initializeApplication('cohor'); // Use generic initializer
            } else {
                alert("Aucune donnée prévisionnelle trouvée dans le fichier COHOR. Vérifiez le format du fichier.");
            }
        };
        reader.readAsText(file, 'UTF-8');
    }

    function handleTmaFile(event) {
        console.log("handleTmaFile called");
        const file = event.target.files[0];
        if (!file) return;

        // Only process TMA if COHOR is the active data source
        if (state.activeDataSource !== 'cohor') {
            alert("Veuillez charger un fichier COHOR avant de charger un fichier TMA.");
            return;
        }

        elements.jsonName.textContent = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
            state.tmaMap = processTmaJSON(e.target.result);
            combineAllData();
            updateDashboard();
        };
        reader.readAsText(file, 'UTF-8');
    }

    // Handle multiple Predict NM files
    function handlePredictNMFiles(event) {
        console.log("handlePredictNMFiles called");
        const files = event.target.files;
        if (files.length === 0) return;

        // Clear COHOR data and UI
        state.cohorData = [];
        state.tmaMap.clear();
        elements.csvName.textContent = 'Aucun fichier';
        elements.jsonName.textContent = 'Aucun fichier';

        elements.predictNMName.textContent = `${files.length} fichier(s) chargé(s)`;
        state.activeDataSource = 'predictNM'; // Set active data source

        let filesProcessed = 0;
        state.predictNMData.clear(); // Clear previous NM data
        for (const file of files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = processPredictNMFile(e.target.result);
                if (result) {
                    state.predictNMData.set(result.metadata.FDATE, result);
                }
                filesProcessed++;
                if (filesProcessed === files.length) {
                    // All files processed, initialize application
                    initializeApplication('predictNM');
                }
            };
            reader.readAsText(file, 'UTF-8');
        }
    }

    // New: Process single Predict NM file content
    function processPredictNMFile(fileContent) {
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
            arcid: headers.indexOf("arcid"),
            adep: headers.indexOf("adep"),
            ades: headers.indexOf("ades"),
            atyp: headers.indexOf("atyp")
        };

        if (Object.values(colIndices).some(index => index === -1)) {
            console.error("Une ou plusieurs colonnes requises (entry, arcid, adep, ades, atyp) sont manquantes dans le fichier Predict NM.");
            return null;
        }

        const flights = [];
        dataRows.forEach(row => {
            const values = row.split(',').map(v => v.trim());
            if (values.length <= Math.max(...Object.values(colIndices))) {
                console.warn("Ligne Predict NM ignorée (colonnes manquantes):", row);
                return;
            }

            let entryTime = values[colIndices.entry];
            if (entryTime && entryTime.length > 5) {
                entryTime = entryTime.slice(0, 5); // Remove trailing char like 'C' or 'E'
            }

            const adep = values[colIndices.adep]?.toUpperCase();
            const ades = values[colIndices.ades]?.toUpperCase();
            const arcid = values[colIndices.arcid];
            const atyp = values[colIndices.atyp];

            let category = 'transits'; // Default to transit

            // Determine category based on ADES/ADEP and airport groups
            const isArrival = ades === 'LFLL' || ades === 'LFLY' || ades === 'LFLS' || ades === 'LFLB' || ades === 'LFLP';
            const isDeparture = adep === 'LFLL' || adep === 'LFLY' || adep === 'LFLS' || adep === 'LFLB' || adep === 'LFLP';

            // Handle LFLU traffic first
            if (adep === 'LFLU' || ades === 'LFLU') {
                category = 'LU';
            } else if (isArrival && !isDeparture) {
                if (ades === 'LFLL') category = 'arrivées_LL';
                else if (ades === 'LFLY') category = 'arrivées_LY';
                else if (ades === 'LFLS') category = 'arrivées_LS';
                else if (ades === 'LFLB' || ades === 'LFLP') category = 'arrivées_LB+LP';
            } else if (isDeparture && !isArrival) {
                if (adep === 'LFLL') category = 'départs_LL';
                else if (adep === 'LFLY' || adep === 'LFLS') category = 'départs_LY+LS';
                else if (adep === 'LFLB' || adep === 'LFLP') category = 'départs_LB+LP';
            }
            // If both arrival and departure (e.g., local flights), or neither, it's a transit by default

            flights.push({
                entry: entryTime,
                arcid: arcid,
                adep: adep,
                ades: ades,
                atyp: atyp,
                category: category,
                color: PREDICT_NM_COLORS[category]
            });
        });

        return { metadata, flights };
    }

    // New: Update Predict NM Summary Card
    function updatePredictNMSummary() {
        let summaryHtml = '';
        if (state.predictNMData.size === 0) {
            summaryHtml = '<p>Aucun fichier Predict NM chargé.</p>';
        } else {
            summaryHtml += '<ul>';
            state.predictNMData.forEach((data, date) => {
                const impDate = new Date(data.metadata.IMPDATE);
                const formattedImpDate = impDate.toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });
                summaryHtml += `<li>**Journée ${data.metadata.FDATE}** : ${data.metadata.NBVOLS} vols (importé le ${formattedImpDate})</li>`;
            });
            summaryHtml += '</ul>';
        }
        elements.predictNMSummaryContent.innerHTML = summaryHtml;
    }

    // New: Update Predict NM Flight List Table
    function updatePredictNMTable() {
        let flightsForSelectedDates = [];
        const currentStartDate = state.currentStartDate;
        const currentEndDate = state.currentEndDate;

        state.predictNMData.forEach((dayData, fdateString) => {
            const fdate = new Date(fdateString + 'T00:00:00Z'); // Convert FDATE string to UTC Date object
            if (fdate >= currentStartDate && fdate <= currentEndDate) {
                flightsForSelectedDates.push(...dayData.flights);
            }
        });

        // Sort flights by entry time
        flightsForSelectedDates.sort((a, b) => {
            const timeA = a.entry.split(':').map(Number);
            const timeB = b.entry.split(':').map(Number);
            if (timeA[0] !== timeB[0]) return timeA[0] - timeB[0];
            return timeA[1] - timeB[1];
        });

        const filterText = elements.predictNMFilterInput.value.toLowerCase();
        const filteredFlights = flightsForSelectedDates.filter(flight => {
            return (filterText === '' || // If filterText is empty, don't filter by text
                    (flight.arcid && flight.arcid.toLowerCase().includes(filterText)) ||
                    (flight.adep && flight.adep.toLowerCase().includes(filterText)) ||
                    (flight.ades && flight.ades.toLowerCase().includes(filterText)) ||
                    (flight.atyp && flight.atyp.toLowerCase().includes(filterText)));
        });

        let tableHtml = '';
        if (filteredFlights.length === 0) {
            tableHtml = '<tr><td colspan="5">Aucun vol trouvé ou correspondant au filtre.</td></tr>';
        } else {
            filteredFlights.forEach(flight => {
                tableHtml += `
                    <tr>
                        <td style="background-color: ${flight.color};">${flight.entry}</td>
                        <td style="background-color: ${flight.color};">${flight.arcid || ''}</td>
                        <td style="background-color: ${flight.color};">${flight.atyp || ''}</td>
                        <td style="background-color: ${flight.color};">${flight.adep || ''}</td>
                        <td style="background-color: ${flight.color};">${flight.ades || ''}</td>
                    </tr>
                `;
            });
        }
        elements.predictNMTableBody.innerHTML = tableHtml;
    }

    // New: Generic application initializer
    function initializeApplication(source) {
        elements.initialMsg.classList.add('hidden');
        elements.dashboard.classList.remove('hidden');
        [elements.dateStartInput, elements.dateEndInput].forEach(el => el.disabled = false);

        // Set initial date range based on source
        let initialDate;
        if (source === 'cohor' && state.cohorData.length > 0) {
            combineAllData(); // Ensure combinedData is up-to-date for COHOR
            const dates = [...new Set(state.combinedData.map(d => d.date.getTime()))].sort();
            state.fullDateRange = [new Date(dates[0]), new Date(dates[dates.length - 1])];
            initialDate = state.fullDateRange[0]; // Use first date from COHOR data
        } else if (source === 'predictNM' && state.predictNMData.size > 0) {
            const firstPredictNMDate = Array.from(state.predictNMData.keys()).sort()[0];
            initialDate = new Date(firstPredictNMDate + 'T00:00:00Z'); // Use FDATE from first NM file
            state.fullDateRange = [initialDate, initialDate]; // For NM, full range is just the first day loaded
        } else {
            // Fallback to today's date if no data or unknown source
            const now = new Date();
            const parisTimezone = 'Europe/Paris';
            const parisDateFormatter = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: parisTimezone });
            const todayParisFormatted = parisDateFormatter.format(now);
            const todayLocalParisForInternal = new Date(todayParisFormatted + 'T00:00:00');
            initialDate = new Date(Date.UTC(todayLocalParisForInternal.getFullYear(), todayLocalParisForInternal.getMonth(), todayLocalParisForInternal.getDate()));
            state.fullDateRange = [initialDate, initialDate];
        }

        state.currentStartDate = initialDate;
        state.currentEndDate = initialDate; // Single day view by default
        state.windowDurationMs = 0; // For single day, duration is 0

        // Set input values visually
        const parisDateFormatter = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Europe/Paris' });
        elements.dateStartInput.value = parisDateFormatter.format(state.currentStartDate);
        elements.dateEndInput.value = parisDateFormatter.format(state.currentEndDate);

        createToggleButtons();
        
        // Automatically select the grid for the current start date
        const { periodCode, dayType } = capacityCalculator.getPeriodAndDayType(state.currentStartDate);
        const todayGridKey = `${dayType}${periodCode}`;
        
        const optionExists = Array.from(elements.periodSelect.options).some(option => option.value === todayGridKey);
        
        if (optionExists) {
            elements.periodSelect.value = todayGridKey;
            state.selectedGrid = todayGridKey;
            handleGridSelection();
        } else {
            console.warn(`No grid option found for today's date: ${todayGridKey}. Defaulting to no selection.`);
            elements.periodSelect.value = "";
            state.selectedGrid = null;
            handleGridSelection();
        }

        updateChartTypeButtons();
        updateTimezoneButtons();
        updateDashboard(false);
    }
    
    // --- Data Processing ---
    function processCohorCSV(csvText) {
        const lines = csvText.split('\n').filter(line => line.trim() !== '');
        const header = lines[0].split(';').map(h => h.trim());
        const dataRows = lines.slice(1);
        const colIndices = { from: header.indexOf("From"), to: header.indexOf("To"), time: header.indexOf("Time"), ad: header.indexOf("A/D"), opsDays: header.indexOf("Ops Days"), airport: header.indexOf("Airport") };
        
        if (Object.values(colIndices).some(index => index === -1)) {
            alert("Une ou plusieurs colonnes requises (From, To, Time, A/D, Ops Days, Airport) sont manquantes dans le fichier COHOR.");
            return [];
        }

        let flights = [];
        dataRows.forEach(row => {
            const values = row.split(';').map(v => v.trim());
            if (values.length < 6 || values[colIndices.airport]?.toUpperCase() !== "LYS") return;
            try {
                const fromDateStr = values[colIndices.from], toDateStr = values[colIndices.to];
                const timeStr = values[colIndices.time].padStart(4, '0'), opsDaysStr = values[colIndices.opsDays].padStart(7, '0');
                let currentDate = new Date(`${fromDateStr.slice(0, 4)}-${fromDateStr.slice(4, 6)}-${fromDateStr.slice(6, 8)}T00:00:00Z`);
                const toDate = new Date(`${toDateStr.slice(0, 4)}-${toDateStr.slice(4, 6)}-${toDateStr.slice(6, 8)}T00:00:00Z`);
                
                while (currentDate <= toDate) {
                    const dayOfWeek = (currentDate.getUTCDay() + 6) % 7;
                    if (opsDaysStr[dayOfWeek] !== '0') {
                        const utcDt = new Date(`${currentDate.toISOString().slice(0, 10)}T${timeStr.slice(0, 2)}:${timeStr.slice(2, 4)}:00Z`);
                        
                        // Appliquer les décalages spécifiques pour les arrivées et départs
                        const offsetMinutes = values[colIndices.ad] === 'A' ? -24 : (values[colIndices.ad] === 'D' ? 11 : 0);
                        const adjustedDt = new Date(utcDt.getTime() + offsetMinutes * 60 * 1000);

                        // timeSlot doit être basé sur l'heure UTC du vol ajusté
                        const makeSlotUTC = (date) => `${String(date.getUTCHours()).padStart(2, '0')}:${String(Math.floor(date.getUTCMinutes() / 15) * 15).padStart(2, '0')}`;
                        
                        flights.push({ 
                            date: new Date(Date.UTC(adjustedDt.getUTCFullYear(), adjustedDt.getUTCMonth(), adjustedDt.getUTCDate())), // Date should be UTC for consistency
                            datetime: adjustedDt, // Datetime should be UTC for consistency
                            timeSlot: makeSlotUTC(adjustedDt), // timeSlot should be UTC
                            isArrival: values[colIndices.ad] === 'A' ? 1 : 0, 
                            isDeparture: values[colIndices.ad] === 'D' ? 1 : 0 
                        });
                    }
                    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
                }
            } catch (e) { console.warn("Ligne COHOR ignorée:", row, e); }
        });
        // Filter flights from today onwards (based on local Paris time converted to UTC)
        const now = new Date();
        const parisTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
        const todayLocalParis = new Date(parisTime.getFullYear(), parisTime.getMonth(), parisTime.getDate());
        const todayUTC = new Date(Date.UTC(todayLocalParis.getFullYear(), todayLocalParis.getMonth(), todayLocalParis.getDate()));
        return flights.filter(f => f.date >= todayUTC);
    }
    
    function processTmaJSON(jsonText) {
        const monthMap = {"Janvier": 1,"Février": 2,"Mars": 3,"Avril": 4,"Mai": 5,"Juin": 6,"Juillet": 7,"Août": 8,"Septembre": 9,"Octobre": 10,"Novembre": 11,"Décembre": 12};
        const rawTma = JSON.parse(jsonText);
        const tmaMap = new Map();
        rawTma.forEach(item => {
            const month = monthMap[item.Mois];
            const dayType = item.Jour_Semaine;
            const slot = item.Créneau_Horaire.split(' - ')[0].replace('h', ':');
            tmaMap.set(`${month}-${dayType}-${slot}`, item.mean);
        });
        return tmaMap;
    }
    
    function combineAllData() {
        const getDayType = (date) => DAYS_OF_WEEK[(date.getUTCDay() + 6) % 7];
        state.combinedData = state.cohorData.map(flight => {
            const month = flight.datetime.getUTCMonth() + 1;
            const dayType = getDayType(flight.datetime);
            
            // Extract only the hour part for TMA key to match hourly TMA data
            const tmaSlot = flight.timeSlot.substring(0, 2) + ':00'; // e.g., "14:15" becomes "14:00"
            const tmaKey = `${month}-${dayType}-${tmaSlot}`;
            
            const tmaValue = state.tmaMap.get(tmaKey) || 0;

            console.log(`--- Débogage combineAllData ---`);
            console.log(`  Vol : ${flight.datetime.toISOString()}, Créneau COHOR : ${flight.timeSlot}`);
            console.log(`  Clé TMA générée : ${tmaKey}`);
            console.log(`  Valeur TMA trouvée : ${tmaValue}`);
            console.log("---------------------------------");

            return { ...flight, tma: tmaValue };
        });
    }

    // --- UI Creation & Interaction ---
    function createToggleButtons() {
        elements.dayToggles.innerHTML = DAYS_OF_WEEK.map((day, i) => `<input type="checkbox" id="day-${i}" value="${i}" checked><label for="day-${i}">${day.substring(0,3)}</label>`).join('');
        elements.trafficToggles.innerHTML = TRAFFIC_TYPES.map((type) => `<input type="checkbox" id="type-${type.key}" value="${type.key}" checked><label for="type-${type.key}">${type.label}</label>`).join('');
        document.querySelectorAll('.toggle-group input').forEach(cb => cb.addEventListener('change', updateDashboard));
    }

    function updateFromDateInputs() {
        // Get selected dates as YYYY-MM-DD strings
        const startDateString = elements.dateStartInput.value;
        const endDateString = elements.dateEndInput.value;

        // Convert these strings to Date objects representing the start of the day in UTC
        // This ensures consistency with how cohorData dates are stored.
        const selectedStartDateLocal = new Date(startDateString + 'T00:00:00'); // Parse as local time
        const selectedEndDateLocal = new Date(endDateString + 'T00:00:00');   // Parse as local time

        state.currentStartDate = new Date(Date.UTC(
            selectedStartDateLocal.getFullYear(),
            selectedStartDateLocal.getMonth(),
            selectedStartDateLocal.getDate()
        ));
        state.currentEndDate = new Date(Date.UTC(
            selectedEndDateLocal.getFullYear(),
            selectedEndDateLocal.getMonth(),
            selectedEndDateLocal.getDate()
        ));

        // Si la date de fin est le jour suivant la date de début, forcez la date de fin à être la même que la date de début
        const oneDay = 24 * 60 * 60 * 1000;
        if (state.currentEndDate.getTime() - state.currentStartDate.getTime() === oneDay) {
            state.currentEndDate = new Date(state.currentStartDate);
            elements.dateEndInput.value = elements.dateStartInput.value; // Mettre à jour l'input visuellement
        }

        state.windowDurationMs = state.currentEndDate.getTime() - state.currentStartDate.getTime();
        
        if (isTransitionPeriod(state.currentStartDate, state.currentEndDate)) {
            alert("La période sélectionnée chevauche un changement d'heure. Veuillez sélectionner une période entièrement en heure d'été ou d'hiver.");
            return;
        }
        
        // Automatically select the grid for the current start date
        const { periodCode, dayType } = capacityCalculator.getPeriodAndDayType(state.currentStartDate);
        const newGridKey = `${dayType}${periodCode}`;
        
        // Check if the grid exists in the dropdown options
        const optionExists = Array.from(elements.periodSelect.options).some(option => option.value === newGridKey);
        
        if (optionExists) {
            elements.periodSelect.value = newGridKey;
            state.selectedGrid = newGridKey; // Update state as well
            handleGridSelection(); // Trigger selection logic
        } else {
            console.warn(`No grid option found for selected date: ${newGridKey}. Defaulting to no selection.`);
            elements.periodSelect.value = ""; // Clear selection if no matching grid
            state.selectedGrid = null;
            handleGridSelection(); // Still call to clear agent buttons etc.
        }

        updateChartTypeButtons();
        updateTimezoneButtons();
        updateDashboard(false);
    }

    function isTransitionPeriod(startDate, endDate) {
        const startOffset = capacityCalculator.getDSTOffset(startDate);
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            if (capacityCalculator.getDSTOffset(currentDate) !== startOffset) {
                return true; // Période de transition détectée
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return false;
    }
    
    // --- Dashboard Update Logic ---
    function updateDashboard(redrawSlider = true) {
        // Determine which data source to use
        let dataToFilter = [];
        let numDays = 1; // Default to 1 day for average calculation
        let activeDays = []; // Initialize activeDays here

        if (state.activeDataSource === 'cohor' && state.cohorData.length > 0) {
            // Filter combinedData (which includes TMA) for COHOR display
            activeDays = [...elements.dayToggles.querySelectorAll('input:checked')].map(cb => parseInt(cb.value));
            dataToFilter = state.combinedData.filter(d => {
                const dayOfWeek = (d.datetime.getUTCDay() + 6) % 7;
                return d.date >= state.currentStartDate && d.date <= state.currentEndDate && activeDays.includes(dayOfWeek);
            });
            // Calculate numDays based on the actual date range selected by the user
            const diffTime = Math.abs(state.currentEndDate.getTime() - state.currentStartDate.getTime());
            numDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end day
            
            elements.predictNMSummaryCard.classList.add('hidden');
            elements.predictNMTableCard.classList.add('hidden');
            elements.capacityControlsCard.classList.remove('hidden'); // Always show capacity for COHOR
            elements.toggleSideBySideBtn.style.display = 'inline-block'; // Show for COHOR
        } else if (state.activeDataSource === 'predictNM' && state.predictNMData.size > 0) {
            // For Predict NM, we don't use combinedData directly for filtering,
            // but rather aggregate from predictNMData based on date range.
            // The chart and table functions will handle their own filtering.
            // We still need numDays for averages.
            numDays = Array.from(state.predictNMData.keys()).filter(fdate => {
                const fdateObj = new Date(fdate + 'T00:00:00Z');
                return fdateObj >= state.currentStartDate && fdateObj <= state.currentEndDate;
            }).length || 1;

            elements.predictNMSummaryCard.classList.remove('hidden');
            elements.predictNMTableCard.classList.remove('hidden');
            elements.capacityControlsCard.classList.remove('hidden'); // Always show capacity for Predict NM
            elements.toggleSideBySideBtn.style.display = 'none'; // Hide for Predict NM
            state.isStacked = true; // Force stacked view for Predict NM
            updateChartTypeButtons(); // Update button state
        } else {
            // No active data source or empty data
            elements.initialMsg.classList.remove('hidden');
            elements.dashboard.classList.add('hidden');
            elements.predictNMSummaryCard.classList.add('hidden');
            elements.predictNMTableCard.classList.add('hidden');
            elements.capacityControlsCard.classList.add('hidden');
            elements.toggleSideBySideBtn.style.display = 'none'; // Hide if no data
            return;
        }

        // Pass dataToFilter (which is now combinedData filtered) to display functions
        updateSummaryCards(dataToFilter, numDays); // Pass numDays explicitly
        updateMainChart(dataToFilter, numDays); // Pass numDays explicitly
        updateSummaryTable(dataToFilter, activeDays, numDays); // Pass numDays explicitly

        // Update unified synthesis content
        updateSynthesisContent(dataToFilter, numDays, activeDays);

        // Update Predict NM specific UI elements (table remains separate)
        if (state.activeDataSource === 'predictNM') {
            updatePredictNMTable();
        }
    }

    // New: Unified synthesis content function
    function updateSynthesisContent(data, numDays, activeDays) {
        const synthesisContent = document.getElementById('synthesisContent');
        synthesisContent.innerHTML = '';

        if (state.activeDataSource === 'cohor') {
            // COHOR/TMA synthesis - show the existing table
            const tableContainer = document.createElement('div');
            tableContainer.className = 'table-container';
            tableContainer.innerHTML = `
                <table id="summaryTable">
                    <thead></thead>
                    <tbody></tbody>
                </table>
            `;
            synthesisContent.appendChild(tableContainer);
            updateSummaryTable(data, activeDays, numDays);
        } else if (state.activeDataSource === 'predictNM') {
            // Predict NM synthesis - show blocks for each imported file
            // Removed the subtitle "Résumé des imports Predict NM" as requested

            const grid = document.createElement('div');
            grid.style.display = 'grid';
            grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
            grid.style.gap = '1rem';

            state.predictNMData.forEach((data, date) => {
                const block = document.createElement('div');
                block.className = 'card';
                block.style.padding = '1.5rem';
                block.style.backgroundColor = 'var(--card-background)';
                block.style.border = '1px solid var(--border)';
                block.style.borderRadius = 'var(--radius)';

                const dayTitle = document.createElement('h4');
                dayTitle.textContent = `Journée ${data.metadata.FDATE}`;
                dayTitle.style.margin = '0 0 0.5rem 0';
                dayTitle.style.fontSize = '1.2rem';
                dayTitle.style.fontWeight = '600';
                dayTitle.style.color = 'var(--text-primary)';
                block.appendChild(dayTitle);

                const importDate = new Date(data.metadata.IMPDATE);
                const formattedImportDate = importDate.toLocaleString('fr-FR', { 
                    dateStyle: 'short', 
                    timeStyle: 'short' 
                });
                const importInfo = document.createElement('p');
                importInfo.textContent = `Importé le ${formattedImportDate} UTC`; // Added UTC
                importInfo.style.margin = '0 0 1rem 0';
                importInfo.style.color = 'var(--text-secondary)';
                importInfo.style.fontSize = '0.9rem';
                block.appendChild(importInfo);

                const trafficCount = document.createElement('div');
                trafficCount.style.fontSize = '2rem';
                trafficCount.style.fontWeight = '700';
                trafficCount.style.color = 'var(--accent-orange)';
                trafficCount.textContent = `${data.metadata.NBVOLS} vols`; // Changed 'trafics' to 'vols'
                block.appendChild(trafficCount);

                grid.appendChild(block);
            });

            synthesisContent.appendChild(grid);
        }
    }
    
    function updateChartTypeButtons() {
        if (state.isStacked) {
            elements.toggleStackedBtn.classList.add('selected');
            elements.toggleSideBySideBtn.classList.remove('selected');
        } else {
            elements.toggleStackedBtn.classList.remove('selected');
            elements.toggleSideBySideBtn.classList.add('selected');
        }
    }

    function updateTimezoneButtons() {
        if (state.useUTC) {
            elements.toggleUTCBtn.classList.add('selected');
            elements.toggleLocalBtn.classList.remove('selected');
        } else {
            elements.toggleUTCBtn.classList.remove('selected');
            elements.toggleLocalBtn.classList.add('selected');
        }
    }

    function calculateRollingSum(data, timeKeyField, valueField, numDays, intervalMinutes = 15, windowMinutes = 60) {
        const slotData = new Map();
        const labels = [];
        for (let h = 0; h < 24; h++) {
            for (let m = 0; m < 60; m += intervalMinutes) {
                const slotStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
                labels.push(slotStr);
                slotData.set(slotStr, 0);
            }
        }

        data.forEach(d => {
            const slot = d[timeKeyField];
            if (slotData.has(slot)) {
                slotData.set(slot, slotData.get(slot) + d[valueField]);
            }
        });

        const rollingSums = new Map();
        const slotsPerWindow = windowMinutes / intervalMinutes;

        for (let i = 0; i < labels.length; i++) {
            let currentSum = 0;
            for (let j = 0; j < slotsPerWindow; j++) {
                const index = (i + j) % labels.length; // Handle wrap-around for 24h
                currentSum += slotData.get(labels[index]) || 0;
            }
            rollingSums.set(labels[i], currentSum / numDays);
        }
        return { rollingSums, labels };
    }

    function updateMainChart(filteredData, numDays) {
        elements.chartTitle.textContent = `Trafic moyen par créneau horaire (Nombre de jours: ${numDays})`;

        let datasets = [];
        let labels = [];

        if (state.activeDataSource === 'cohor') {
            // --- COHOR Data Processing (Restored original logic) ---
            labels = []; // 15-minute slots
            const slotData = new Map();
            for (let h = 0; h < 24; h++) {
                for (let m = 0; m < 60; m += 15) {
                    const slotStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
                    labels.push(slotStr);
                    slotData.set(slotStr, { isArrival: 0, isDeparture: 0, tma: 0 });
                }
            }

            const tmaTracker = new Set();
            filteredData.forEach(d => {
                const slot = slotData.get(d.timeSlot);
                if(slot) {
                    slot.isArrival += d.isArrival;
                    slot.isDeparture += d.isDeparture;
                    const tmaKey = `${d.date.toDateString()}-${d.timeSlot}`;
                    if (d.tma > 0 && !tmaTracker.has(tmaKey)) {
                        slot.tma += d.tma;
                        tmaTracker.add(tmaKey);
                    }
                }
            });

            const rollingData = new Map();
            for(let i = 0; i < labels.length; i++) {
                let sums = { isArrival: 0, isDeparture: 0, tma: 0 };
                for (let j = i; j < Math.min(i + 4, labels.length); j++) { // 4 slots = 60 minutes
                    const slotInfo = slotData.get(labels[j]);
                    sums.isArrival += slotInfo.isArrival;
                    sums.isDeparture += slotInfo.isDeparture;
                    sums.tma += slotInfo.tma;
                }
                rollingData.set(labels[i], {
                    isArrival: sums.isArrival / numDays,
                    isDeparture: sums.isDeparture / numDays,
                    tma: sums.tma / numDays, // This is the original logic for TMA
                });
            }

            const activeTraffic = [...elements.trafficToggles.querySelectorAll('input:checked')].map(cb => cb.value);
            datasets = TRAFFIC_TYPES.map(type => {
                const data = labels.map(slot => rollingData.get(slot)?.[type.key] || 0);
                return {
                    label: type.label,
                    data: data,
                    backgroundColor: type.color,
                    hidden: !activeTraffic.includes(type.key),
                    type: 'bar',
                    stack: state.isStacked ? 'cohorTMA' : type.key // Use unique stack for side-by-side
                };
            });

            // Add Capacity for COHOR
            if (state.isStacked && Object.keys(state.grilleVacations).length > 0 && Object.keys(state.compoEquipe).length > 0) {
                let gridToUse = state.selectedGrid || 'SemCha';
                let customSelection = state.customAgentSelection;
                
                const sivHypothesis = elements.sivSelect.value;
                
                const capacityResult = capacityCalculator.calculateCapacityWithSpecificGrid(
                    gridToUse,
                    customSelection,
                    sivHypothesis,
                    state.currentStartDate
                );

                const capacityData = capacityResult.capacities;
                
                datasets.push({
                    label: 'Capacité',
                    data: capacityData,
                    backgroundColor: 'rgba(255, 158, 100, 0.2)',
                    borderColor: 'rgba(255, 158, 100, 0.8)',
                    type: 'line',
                    fill: true,
                    pointRadius: 0,
                    stepped: 'middle',
                    order: -1,
                    hidden: !state.isStacked
                });
            }

        } else if (state.activeDataSource === 'predictNM') {
            // --- Predict NM Data Processing ---
            // Prepare data for rolling sum calculation
            const predictNMFlatData = [];
            state.predictNMData.forEach(dayData => {
                const fdate = dayData.metadata.FDATE;
                const startDate = state.currentStartDate.toISOString().slice(0, 10);
                const endDate = state.currentEndDate.toISOString().slice(0, 10);

                if (fdate >= startDate && fdate <= endDate) {
                    dayData.flights.forEach(flight => {
                        // Convert entry time to 15-min slot
                        const [h, m] = flight.entry.split(':').map(Number);
                        const slotStr = `${String(h).padStart(2, '0')}:${String(Math.floor(m / 15) * 15).padStart(2, '0')}`;
                        predictNMFlatData.push({ timeSlot: slotStr, category: flight.category, value: 1 });
                    });
                }
            });

            // Aggregate by category and slot for rolling sum
            const categorySlotData = new Map(); // Map<category, Map<slot, count>>
            for (const key in PREDICT_NM_COLORS) {
                categorySlotData.set(key, new Map());
                for (let h = 0; h < 24; h++) {
                    for (let m = 0; m < 60; m += 15) {
                        const slotStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
                        categorySlotData.get(key).set(slotStr, 0);
                    }
                }
            }

            predictNMFlatData.forEach(item => {
                categorySlotData.get(item.category)?.set(item.timeSlot, categorySlotData.get(item.category).get(item.timeSlot) + item.value);
            });

            // Calculate rolling sums for each Predict NM category
            labels = []; // 15-minute slots
            for (let h = 0; h < 24; h++) {
                for (let m = 0; m < 60; m += 15) {
                    labels.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
                }
            }

            for (const key in PREDICT_NM_COLORS) {
                const categoryDataForRolling = Array.from(categorySlotData.get(key)).map(([slot, count]) => ({ timeSlot: slot, value: count }));
                const { rollingSums } = calculateRollingSum(categoryDataForRolling, 'timeSlot', 'value', numDays);
                
                datasets.push({
                    label: key.replace('_', ' ').replace('+', ' + ').toUpperCase(),
                    data: labels.map(slot => rollingSums.get(slot) || 0),
                    backgroundColor: PREDICT_NM_COLORS[key].replace('0.15', '0.8'),
                    hidden: false,
                    type: 'bar',
                    stack: 'predictNM'
                });
            }

            // Add Capacity for Predict NM (same logic as COHOR)
            if (state.isStacked && Object.keys(state.grilleVacations).length > 0 && Object.keys(state.compoEquipe).length > 0) {
                let gridToUse = state.selectedGrid || 'SemCha';
                let customSelection = state.customAgentSelection;
                
                const sivHypothesis = elements.sivSelect.value;
                
                const capacityResult = capacityCalculator.calculateCapacityWithSpecificGrid(
                    gridToUse,
                    customSelection,
                    sivHypothesis,
                    state.currentStartDate
                );

                const capacityData = capacityResult.capacities;
                
                datasets.push({
                    label: 'Capacité',
                    data: capacityData,
                    backgroundColor: 'rgba(255, 158, 100, 0.2)',
                    borderColor: 'rgba(255, 158, 100, 0.8)',
                    type: 'line',
                    fill: true,
                    pointRadius: 0,
                    stepped: 'middle',
                    order: -1,
                    hidden: !state.isStacked
                });
            }
        }

        console.log('Chart Labels:', labels);
        console.log('Final Chart Datasets:', datasets);

        if (state.trafficChart) state.trafficChart.destroy();
        
        setTimeout(() => {
            state.trafficChart = new Chart(elements.chartCanvas, {
                type: 'bar',
                data: { labels: labels, datasets },
                options: {
                    responsive: true, maintainAspectRatio: false, animation: { duration: 500 },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'var(--text-primary)',
                                generateLabels: function(chart) {
                                    const labels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                                    return labels.map(label => {
                                        if (label.text) {
                                            label.text = label.text.replace('ARRIVÉES', 'Arr').replace('DÉPARTS', 'Dep');
                                        }
                                        return label;
                                    });
                                }
                            }
                        },
                        tooltip: {
                            enabled: true, mode: 'index',
                            titleAlign: 'center', bodyAlign: 'center', footerAlign: 'center',
                            callbacks: {
                                title: function(context) {
                                    const label = context[0].label;
                                    const [h, m] = label.split(':').map(Number);
                                    const utcDate = new Date(Date.UTC(2000, 0, 1, h, m));
                                    
                                    // For both COHOR and Predict NM, show 60-min range
                                    const utcEndDate = new Date(utcDate.getTime() + 59 * 60 * 1000);

                                    const formatTime = (dateObj, useUTC) => {
                                        if (useUTC) {
                                            return `${String(dateObj.getUTCHours()).padStart(2, '0')}:${String(dateObj.getUTCMinutes()).padStart(2, '0')}`;
                                        } else {
                                            const offset = capacityCalculator.getDSTOffset(dateObj);
                                            const localDate = new Date(dateObj.getTime() + offset * 3600 * 1000);
                                            return `${String(localDate.getHours()).padStart(2, '0')}:${String(localDate.getMinutes()).padStart(2, '0')}`;
                                        }
                                    };
                                    
                                    return `Créneau ${formatTime(utcDate, state.useUTC)} - ${formatTime(utcEndDate, state.useUTC)} (${state.useUTC ? 'UTC' : 'Local'})`;
                                },
                                label: function(context) {
                                    let labelText = context.dataset.label;
                                    labelText = labelText.replace('ARRIVÉES', 'Arr').replace('DÉPARTS', 'Dep');
                                    const value = context.parsed.y;
                                    // Format as integer if it's Predict NM data, otherwise keep one decimal
                                    const formattedValue = state.activeDataSource === 'predictNM' ? value.toFixed(0) : value.toFixed(1);
                                    return ` ${labelText}: ${formattedValue}`;
                                },
                                footer: function(context) {
                                    let totalTrafic = 0;
                                    context.forEach(item => {
                                        if (item.dataset.type === 'bar' && !item.dataset.hidden && item.dataset.label !== 'Capacité') {
                                            totalTrafic += item.parsed.y;
                                        }
                                    });
                                    // Format as integer if it's Predict NM data, otherwise keep one decimal
                                    const formattedTotal = state.activeDataSource === 'predictNM' ? totalTrafic.toFixed(0) : totalTrafic.toFixed(1);
                                    return `\nTrafic total: ${formattedTotal}`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: { 
                            stacked: state.isStacked, 
                            ticks: { 
                                color: 'var(--text-secondary)',
                                callback: function(value, index, ticks) {
                                    const slot = this.getLabelForValue(value);
                                    const [h, m] = slot.split(':').map(Number);
                                    const utcDate = new Date(Date.UTC(2000, 0, 1, h, m));
                                    
                                    if (state.useUTC) {
                                        return `${String(utcDate.getUTCHours()).padStart(2, '0')}:${String(utcDate.getUTCMinutes()).padStart(2, '0')}`;
                                    } else {
                                        const offset = capacityCalculator.getDSTOffset(utcDate);
                                        const localDate = new Date(utcDate.getTime() + offset * 3600 * 1000);
                                        return `${String(localDate.getHours()).padStart(2, '0')}:${String(localDate.getMinutes()).padStart(2, '0')}`;
                                    }
                                }
                            }, 
                            grid: { color: 'rgba(161, 170, 184, 0.2)' } 
                        },
                        y: { stacked: state.isStacked, beginAtZero: true, ticks: { color: 'var(--text-secondary)' }, grid: { color: 'rgba(161, 170, 184, 0.2)' } }
                    }
                }
            });
            console.log('Chart initialized with dimensions:', elements.chartCanvas.canvas.width, elements.chartCanvas.canvas.height);
        }, 0);
    }

    function updateSummaryCards(data, numDays) {
        // Summary cards are only for COHOR data
        if (state.activeDataSource !== 'cohor') {
            elements.avgDep.textContent = '0';
            elements.avgArr.textContent = '0';
            elements.avgTma.textContent = '0';
            elements.avgTotal.textContent = '0';
            return;
        }

        const totals = data.reduce((acc, d) => { acc.isArrival += d.isArrival; acc.isDeparture += d.isDeparture; return acc; }, { isArrival: 0, isDeparture: 0 });
        
        // Correct TMA aggregation for summary cards: count unique TMA values per day
        const tmaDailyTracker = new Map(); // Map<dateString, Set<timeSlot>>
        data.forEach(d => {
            if (d.tma > 0) {
                const dateStr = d.date.toISOString().slice(0, 10);
                if (!tmaDailyTracker.has(dateStr)) {
                    tmaDailyTracker.set(dateStr, new Set());
                }
                tmaDailyTracker.get(dateStr).add(d.timeSlot);
            }
        });
        let totalTma = 0;
        tmaDailyTracker.forEach(set => totalTma += set.size); // Sum of unique TMA occurrences across all days

        console.log("--- Débogage TMA Summary Cards ---");
        console.log("Total TMA occurrences uniques :", totalTma);
        console.log("Nombre de jours pour la moyenne :", numDays);
        console.log("Moyenne TMA calculée :", (totalTma / numDays).toFixed(1));
        console.log("---------------------------------");

        const getAvg = (key) => {
            if (key === 'tma') {
                return (totalTma / numDays).toFixed(1);
            }
            return (totals[key] / numDays).toFixed(1);
        };
        
        elements.avgDep.textContent = getAvg('isDeparture');
        elements.avgArr.textContent = getAvg('isArrival');
        elements.avgTma.textContent = getAvg('tma');
        elements.avgTotal.textContent = (parseFloat(elements.avgDep.textContent) + parseFloat(elements.avgArr.textContent) + parseFloat(elements.avgTma.textContent)).toFixed(1);
    }
    
    function updateSummaryTable(data, activeDays, numDays) {
        if (state.activeDataSource !== 'cohor') {
            // If not COHOR, this function should not try to update the summary table
            // as synthesisContent handles Predict NM display.
            return;
        }

        const dailyAggregates = new Map();
        for (let i = 0; i < 7; i++) {
            if (activeDays.includes(i)) {
                const daysOfType = data.filter(d => (d.datetime.getUTCDay() + 6) % 7 === i);
                const numDaysOfType = new Set(daysOfType.map(d => d.date.toISOString().slice(0, 10))).size || 1;
                
                const totals = daysOfType.reduce((acc, d) => { acc.isDeparture += d.isDeparture; acc.isArrival += d.isArrival; return acc; }, { isDeparture: 0, isArrival: 0 });
                
                // Correct TMA aggregation for summary table: count unique TMA values per day type
                const tmaDayTypeTracker = new Map(); // Map<dateString, Set<timeSlot>>
                daysOfType.forEach(d => {
                    if (d.tma > 0) {
                        const dateStr = d.date.toISOString().slice(0, 10);
                        if (!tmaDayTypeTracker.has(dateStr)) {
                            tmaDayTypeTracker.set(dateStr, new Set());
                        }
                        tmaDayTypeTracker.get(dateStr).add(d.timeSlot);
                    }
                });
                let totalTmaForDayType = 0;
                tmaDayTypeTracker.forEach(set => totalTmaForDayType += set.size);

                console.log(`--- Débogage TMA Summary Table - ${DAYS_OF_WEEK[i]} ---`);
                console.log(`  Total TMA occurrences uniques pour ce jour : ${totalTmaForDayType}`);
                console.log(`  Nombre de jours de ce type pour la moyenne : ${numDaysOfType}`);
                console.log(`  Moyenne TMA calculée pour ${DAYS_OF_WEEK[i]} : ${(totalTmaForDayType / numDaysOfType).toFixed(1)}`);
                console.log("---------------------------------");

                dailyAggregates.set(i, { 
                    'Départs': totals.isDeparture / numDaysOfType, 
                    'Arrivées': totals.isArrival / numDaysOfType, 
                    'TMA': totalTmaForDayType / numDaysOfType, // Use corrected TMA total
                    'Total': (totals.isDeparture + totals.isArrival + totalTmaForDayType) / numDaysOfType 
                });
            }
        }
        
        const maxValues = {};
        const metrics = ['Départs', 'Arrivées', 'TMA', 'Total'];
        metrics.forEach(metric => {
            const values = activeDays.map(dayIndex => dailyAggregates.get(dayIndex)?.[metric] || 0);
            maxValues[metric] = d3.max(values);
        });
        
        const allValues = [...dailyAggregates.values()].flatMap(day => Object.values(day));
        const colorScale = d3.scaleLinear().domain([0, d3.max(allValues) || 1])
            .range(['rgba(36, 40, 59, 0.1)', 'rgba(255, 158, 100, 0.6)']);

        elements.summaryTableHead.innerHTML = `<tr><th>Métrique</th>${activeDays.map(i => `<th>${DAYS_OF_WEEK[i]}</th>`).join('')}</tr>`;
        elements.summaryTableBody.innerHTML = '';
        
        metrics.forEach(metric => {
            let rowHtml = `<tr><td>${metric}</td>`;
            activeDays.forEach(dayIndex => {
                const dayData = dailyAggregates.get(dayIndex);
                const value = dayData ? dayData[metric] : 0;
                const color = colorScale(value);
                const isMax = value > 0 && Math.abs(value - maxValues[metric]) < 0.01;
                const className = isMax ? 'max-value' : '';
                rowHtml += `<td style="background-color: ${color};" class="${className}">${value.toFixed(1)}</td>`;
            });
            rowHtml += `</tr>`;
            elements.summaryTableBody.insertAdjacentHTML('beforeend', rowHtml);
        });
    }

    // --- Grid Selection and Agent Management ---
    function handleGridSelection() {
        const selectedGridKey = elements.periodSelect.value;
        console.log('Grid selected:', selectedGridKey);
        
        if (!selectedGridKey) {
            state.selectedGrid = null;
            state.availableAgents = { Je: [], M: [], J: [], SN: [] };
            clearAgentButtons();
            updateDashboard(false);
            return;
        }
        
        state.selectedGrid = selectedGridKey;
        
        // Parse grid key to get the actual grid data
        const dayType = selectedGridKey.substring(0, 3); // "Sem", "Sam", "Dim"
        const periodCode = selectedGridKey.substring(3); // "Cha", "Cre", "Hiv"
        
        console.log('dayType:', dayType);
        console.log('periodCode:', periodCode);
        console.log('state.grilleVacations[dayType]:', state.grilleVacations[dayType]);
        console.log('state.grilleVacations[dayType]?.[periodCode]:', state.grilleVacations[dayType]?.[periodCode]);

        const gridData = state.grilleVacations[dayType]?.[periodCode];
        
        if (gridData && gridData.grid) {
            console.log('gridData.grid found:', gridData.grid);
            state.availableAgents = capacityCalculator.getAgentsByType(gridData);
            generateAgentButtons();
            initializeDefaultSelection();
            renderHeatmapD3(state.selectedGrid); // Appel de la fonction pour afficher la carte de chaleur D3.js
        } else {
            console.error('gridData or gridData.grid is missing for selected grid:', selectedGridKey, gridData);
        }
        
        updateDashboard(false);
    }
    
    function generateAgentButtons() {
        const buttonContainers = {
            Je: document.getElementById('vacationTogglesJe'),
            M: document.getElementById('vacationTogglesM'),
            J: document.getElementById('vacationTogglesJ'),
            SN: document.getElementById('vacationTogglesSN')
        };
        
        // Clear existing buttons
        Object.values(buttonContainers).forEach(container => {
            if (container) container.innerHTML = '';
        });
        
        // Helper to create a button or a styled span
        const createAgentElement = (agent, type, isSelectable = true, isInitiallySelected = false) => {
            const element = document.createElement(isSelectable ? 'button' : 'span');
            element.className = 'agent-button'; // Apply button styling
            if (!isSelectable) {
                element.classList.add('selected'); // Fixed agents are always selected (orange)
                element.style.cursor = 'default'; // Non-clickable
            }
            if (isInitiallySelected) element.classList.add('selected'); // Add selected class if initially selected
            element.textContent = agent.vacation;
            element.dataset.agentType = type;
            element.dataset.agentId = agent.vacation;
            if (isSelectable) {
                element.addEventListener('click', () => toggleAgentSelection(type, agent.vacation, element));
            }
            return element;
        };

        // Generate buttons for Je (3 agents max)
        state.availableAgents.Je.slice(0, 3).forEach(agent => {
            buttonContainers.Je.appendChild(createAgentElement(agent, 'Je', true));
        });

        // Generate buttons for M (MC first as non-selectable, then M agents)
        const mAgents = state.availableAgents.M.filter(agent => agent.vacation !== 'MC');
        const mcAgent = state.availableAgents.M.find(agent => agent.vacation === 'MC');
        if (mcAgent) {
            // MC is non-selectable and always active (orange)
            buttonContainers.M.appendChild(createAgentElement(mcAgent, 'M', false));
        }
        mAgents.slice(0, 8).forEach(agent => { // 8 selectable M agents
            buttonContainers.M.appendChild(createAgentElement(agent, 'M', true));
        });

        // Generate buttons for J (JC first as non-selectable, then J agents)
        const jAgents = state.availableAgents.J.filter(agent => agent.vacation !== 'JC');
        const jcAgent = state.availableAgents.J.find(agent => agent.vacation === 'JC');
        if (jcAgent) {
            // JC is non-selectable and always active (orange)
            buttonContainers.J.appendChild(createAgentElement(jcAgent, 'J', false));
        }
        jAgents.slice(0, 8).forEach(agent => { // 8 selectable J agents
            buttonContainers.J.appendChild(createAgentElement(agent, 'J', true));
        });

        // Generate buttons for SN (NC first as non-selectable, then N agents as non-selectable, then S agents)
        const snAgents = state.availableAgents.SN.filter(agent => agent.vacation !== 'NC' && !agent.vacation.startsWith('N'));
        const ncAgent = state.availableAgents.SN.find(agent => agent.vacation === 'NC');
        const nAgents = state.availableAgents.SN.filter(agent => agent.vacation.startsWith('N'));

        if (ncAgent) {
            // NC is non-selectable and always active (orange)
            buttonContainers.SN.appendChild(createAgentElement(ncAgent, 'SN', false));
        }
        nAgents.slice(0, 2).forEach(agent => { // 2 N agents are non-selectable and always active (orange)
            buttonContainers.SN.appendChild(createAgentElement(agent, 'SN', false));
        });
        snAgents.slice(0, 8).forEach(agent => { // 8 selectable S agents
            buttonContainers.SN.appendChild(createAgentElement(agent, 'SN', true));
        });
    }
    
    function initializeDefaultSelection() {
        // Initialize with default selection (3 Je + 8 M + 8 J + 8 SN)
        state.customAgentSelection = { Je: [], M: [], J: [], SN: [] };
        
        // Add fixed agents to selection first (MC, JC, NC, N)
        const fixedAgents = [];
        const mcAgent = state.availableAgents.M.find(agent => agent.vacation === 'MC');
        if (mcAgent) fixedAgents.push(mcAgent);
        const jcAgent = state.availableAgents.J.find(agent => agent.vacation === 'JC');
        if (jcAgent) fixedAgents.push(jcAgent);
        const ncAgent = state.availableAgents.SN.find(agent => agent.vacation === 'NC');
        if (ncAgent) fixedAgents.push(ncAgent);
        const nAgents = state.availableAgents.SN.filter(agent => agent.vacation.startsWith('N'));
        fixedAgents.push(...nAgents.slice(0, 2)); // Only 2 N agents are fixed

        fixedAgents.forEach(agent => {
            if (agent.vacation.startsWith('M') || agent.vacation === 'MC') {
                if (!state.customAgentSelection.M.includes(agent.vacation)) state.customAgentSelection.M.push(agent.vacation);
            } else if (agent.vacation.startsWith('J') || agent.vacation === 'JC') {
                if (!state.customAgentSelection.J.includes(agent.vacation)) state.customAgentSelection.J.push(agent.vacation);
            } else if (agent.vacation.startsWith('S') || agent.vacation.startsWith('N') || agent.vacation === 'NC') {
                if (!state.customAgentSelection.SN.includes(agent.vacation)) state.customAgentSelection.SN.push(agent.vacation);
            }
        });

        // Ensure fixed agents are marked as selected in the UI
        updateAgentButtonStates(); // Call this here to apply 'selected' class to fixed agents

        // Add selectable agents up to maxAgents
        ['Je', 'M', 'J', 'SN'].forEach(type => {
            const maxAgents = type === 'Je' ? 3 : 8;
            const currentCount = state.customAgentSelection[type].length;
            const remainingToSelect = maxAgents - currentCount;

            if (remainingToSelect > 0) {
                const selectableAgents = state.availableAgents[type].filter(agent => 
                    !state.customAgentSelection[type].includes(agent.vacation) &&
                    !['MC', 'JC', 'NC'].includes(agent.vacation) && // Exclude fixed agents
                    !agent.vacation.startsWith('N') // Exclude N agents (already handled if fixed)
                );
                selectableAgents.slice(0, remainingToSelect).forEach(agent => {
                    state.customAgentSelection[type].push(agent.vacation);
                });
            }
        });
        
        updateAgentButtonStates();
        updateEffectifTitle(); // Update the title after initialization
    }
    
    function toggleAgentSelection(type, agentId, buttonElement) {
        const currentSelection = state.customAgentSelection[type];
        const index = currentSelection.indexOf(agentId);
        
        if (index > -1) {
            // Remove from selection
            currentSelection.splice(index, 1);
            buttonElement.classList.remove('selected');
        } else {
            // Add to selection
            currentSelection.push(agentId);
            buttonElement.classList.add('selected');
        }
        
        updateEffectifTitle(); // Update title when selection changes
        updateDashboard(false);
        renderHeatmapD3(state.selectedGrid); // Mettre à jour la carte de chaleur
    }
    
    function updateAgentButtonStates() {
        document.querySelectorAll('.agent-button').forEach(button => {
            const type = button.dataset.agentType;
            const agentId = button.dataset.agentId;
            
            if (state.customAgentSelection[type] && state.customAgentSelection[type].includes(agentId)) {
                button.classList.add('selected');
                // If element is inactive-agent-button, ensure selected style applies
                if (button.classList.contains('inactive-agent-button')) {
                    button.style.backgroundColor = 'var(--accent-orange)';
                    button.style.color = 'var(--background)';
                    button.style.cursor = 'default';
                }
            } else {
                button.classList.remove('selected');
            }
        });
    }
    
    function clearAgentButtons() {
        const buttonContainers = [
            document.getElementById('vacationTogglesJe'),
            document.getElementById('vacationTogglesM'),
            document.getElementById('vacationTogglesJ'),
            document.getElementById('vacationTogglesSN')
        ];
        
        buttonContainers.forEach(container => {
            if (container) container.innerHTML = '';
        });
        
        state.customAgentSelection = { Je: [], M: [], J: [], SN: [] };
    }

    function splitGridKey(gridKey) {
        const dayType = gridKey.substring(0, 3); // "Sem", "Sam", "Dim"
        const periodCode = gridKey.substring(3); // "Cha", "Cre", "Hiv"
        return [dayType, periodCode];
    }

    // --- D3.js Heatmap ---
    function renderHeatmapD3(gridKey) {
        const container = d3.select("#d3-heatmap-container");
        container.html(""); // Clear previous heatmap

        if (!gridKey || !vacationGrids) {
            container.append("p").text("Veuillez sélectionner une grille de vacation pour afficher la carte de chaleur.");
            return;
        }

        const [dayType, periodCode] = splitGridKey(gridKey);
        const gridData = vacationGrids[dayType]?.[periodCode]?.grid;

        if (!gridData || gridData.length === 0) {
            container.append("p").text(`Aucune donnée de grille trouvée pour ${gridKey}.`);
            return;
        }

        // 1. Préparer les données et trier les vacations
        const selectedVacationsSet = new Set([
            ...state.customAgentSelection.Je,
            ...state.customAgentSelection.M,
            ...state.customAgentSelection.J,
            ...state.customAgentSelection.SN
        ]);

        // Définir les agents fixes qui doivent toujours être affichés
        const fixedVacations = ['MC', 'JC', 'NC', 'N#01', 'N#02'];
        const fixedVacationsSet = new Set(fixedVacations);

        // Filtrer les agents : inclure les fixes ET les sélectionnés
        const agentsToShow = gridData.filter(agent => 
            fixedVacationsSet.has(agent.vacation) || selectedVacationsSet.has(agent.vacation)
        );

        const agentsByType = { Je: [], M: [], J: [], SN: [] }; // Pas de catégories séparées pour MC, JC, NC ici

        agentsToShow.forEach(agent => {
            const vacation = agent.vacation;
            if (vacation.startsWith('Je')) {
                agentsByType.Je.push(agent);
            } else if (vacation.startsWith('M')) {
                agentsByType.M.push(agent);
            } else if (vacation.startsWith('J')) {
                agentsByType.J.push(agent);
            } else if (vacation.startsWith('S') || vacation.startsWith('N')) {
                agentsByType.SN.push(agent);
            }
        });

        // Trier chaque groupe par priorité (numérique)
        Object.keys(agentsByType).forEach(key => {
            agentsByType[key].sort((a, b) => a.priorite - b.priorite);
        });

        // Construire orderedAgents en plaçant les fixes en premier dans leur groupe
        const orderedAgents = [];

        // Fonction utilitaire pour ajouter les agents d'un type, avec les fixes en tête
        const addAgentsInOrder = (typeKey, fixedInGroup) => {
            const fixed = agentsByType[typeKey].filter(agent => fixedInGroup.includes(agent.vacation));
            const others = agentsByType[typeKey].filter(agent => !fixedInGroup.includes(agent.vacation));
            orderedAgents.push(...fixed, ...others);
        };

        addAgentsInOrder('Je', []); // Pas de fixes spécifiques pour Je
        addAgentsInOrder('M', ['MC']);
        addAgentsInOrder('J', ['JC']);
        addAgentsInOrder('SN', ['NC', 'N#01', 'N#02']);

        const yLabels = orderedAgents.map(agent => agent.vacation);
        const heatmapData = [];

        orderedAgents.forEach((agent, yIndex) => {
            for (let slotIndex = 0; slotIndex < 96; slotIndex++) {
                const hour = Math.floor(slotIndex / 4) + 4; // Heure de 4 à 27 (4h du lendemain = 28h)
                const minutes = (slotIndex % 4) * 15;
                const timeKey = `${String(hour % 24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
                const value = agent[timeKey] || '';
                
                heatmapData.push({
                    x: slotIndex,
                    y: yIndex,
                    value: value,
                    vacationName: agent.vacation,
                    time: timeKey
                });
            }
        });

        // 2. Configuration du SVG et des dimensions
        const margin = { top: 50, right: 20, bottom: 50, left: 300 }; // Augmenter la marge gauche pour les labels
        const numSlots = 96; // 24 heures * 4 créneaux/heure

        // Calculer la largeur disponible du conteneur
        const containerWidth = parseInt(container.style("width")) || document.getElementById('d3-heatmap-container').clientWidth;
        
        // Calculer la taille de cellule dynamique
        // La largeur totale des cellules + padding doit être égale à la largeur disponible - marges
        const dynamicCellSize = (containerWidth - margin.left - margin.right) / numSlots;
        const cellSize = Math.max(10, dynamicCellSize); // Taille minimale pour la lisibilité

        const width = numSlots * cellSize;
        const height = yLabels.length * cellSize;

        console.log('Heatmap dimensions:');
        console.log('  containerWidth:', containerWidth);
        console.log('  margin.left:', margin.left);
        console.log('  cellSize:', cellSize);
        console.log('  width (cells):', width);
        console.log('  height (labels):', height);
        console.log('  yLabels:', yLabels);

        // Mapping des codes de grille vers des noms lisibles
        const gridNameMapping = {
            "SemCha": "Semaine Chargée",
            "SamCha": "Samedi Chargé",
            "DimCha": "Dimanche Chargée",
            "SemCre": "Semaine Creuse",
            "SamCre": "Samedi Creux",
            "DimCre": "Dimanche Creux",
            "SemHiv": "Semaine Hiver",
            "SamHiv": "Samedi Hiver",
            "DimHiv": "Dimanche Hiver"
        };
        const displayGridName = gridNameMapping[gridKey] || gridKey;

        container.append("h2").text(`Détails des vacations de la période ${displayGridName}`).attr("class", "card-title");

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // 3. Échelles
        const x = d3.scaleBand()
            .range([0, width])
            .domain(d3.range(numSlots))
            .paddingInner(0.05);

        const y = d3.scaleBand()
            .range([0, height])
            .domain(yLabels)
            .paddingInner(0.05);

        const colorScale = (value) => {
            switch (value) {
                case '1': return '#800080'; // Violet - Actif (opaque)
                case 'C': return '#FF0000';   // Rouge - Chef (opaque)
                case 'P': return '#87CEEB'; // Bleu ciel - Pause (opaque)
                case 'R': return '#FFA500'; // Orange - Repos (opaque)
                default: return 'rgba(0, 0, 0, 0)'; // Transparent
            }
        };

        // 4. Création des cellules
        svg.selectAll(".cell")
            .data(heatmapData)
            .enter().append("rect")
            .attr("class", "cell")
            .attr("x", d => x(d.x))
            .attr("y", d => y(d.vacationName))
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("fill", d => colorScale(d.value))
            .style("stroke", "rgba(0,0,0,0.1)")
            .style("stroke-width", 0.5)
            .on("mouseover", function(event, d) {
                tooltip.style("opacity", 1)
                    .html(`Vacation: ${d.vacationName}<br>Heure: ${d.time}<br>Statut: ${getVacationStatusName(d.value)}`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function() {
                tooltip.style("opacity", 0);
            });

        // 5. Axes
        const xAxis = d3.axisBottom(x)
            .tickValues(d3.range(0, numSlots, 4)) // Toutes les heures (0, 4, 8, ...)
            .tickFormat(d => {
                const hour = Math.floor(d / 4) + 4; // Convertir l'index en heure (décalage de 4h)
                return `${String(hour % 24).padStart(2, '0')}h`;
            });

        const yAxis = d3.axisLeft(y);

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        svg.append("g")
            .attr("class", "y-axis")
            .call(yAxis)
            .selectAll("text") // Sélectionne le texte de l'axe Y
            .attr("text-anchor", "end") // Aligne le texte à la fin (à droite de la ligne de l'axe)
            .attr("dx", "-1em") // Décalage horizontal pour éloigner le texte de l'axe
            .attr("dy", d => y.bandwidth() / 2 + 4) // Ajustement vertical pour centrer le texte et le décaler légèrement vers le bas
            .style("font-size", "12px") // Augmenter la taille de la police
            .style("fill", "var(--text-secondary)")
            .style("background-color", "transparent"); // Retirer le background-color de débogage

        // Style des axes
        svg.selectAll(".x-axis text")
            .style("fill", "var(--text-secondary)");
        svg.selectAll(".x-axis path, .x-axis line, .y-axis path, .y-axis line")
            .style("stroke", "var(--border)"); // Utiliser la couleur de bordure pour les lignes d'axe

        // 6. Tooltip
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // 7. Légende
        const legendData = [
            { value: '1', label: 'Actif', color: 'rgba(128, 0, 128, 0.7)' },
            { value: 'C', label: 'Chef', color: 'rgba(255, 0, 0, 0.7)' },
            { value: 'P', label: 'Pause', color: 'rgba(135, 206, 235, 0.7)' },
            { value: 'R', label: 'Repos', color: 'rgba(255, 165, 0, 0.7)' }
        ];

        const legend = container.append("div")
            .attr("class", "heatmap-legend-d3");

        legend.selectAll(".legend-item")
            .data(legendData)
            .enter().append("div")
            .attr("class", "legend-item")
            .html(d => `<span class="legend-color" style="background-color: ${d.color};"></span><span>${d.label}</span>`);
    }

    // Add resize listener for heatmap
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const selectedGridKey = elements.periodSelect.value;
            if (selectedGridKey) {
                renderHeatmapD3(selectedGridKey);
            }
        }, 250); // Debounce for 250ms
    });

    function getVacationStatusName(code) {
        const types = {
            '1': 'Actif',
            'C': 'Chef',
            'P': 'Pause',
            'R': 'Repos'
        };
        return types[code] || 'Vide';
    }

    // --- Effectif Title Update ---
    function togglePredictNMTableVisibility() {
        const tableContainer = document.getElementById('predictNMTableContainer');
        const button = elements.togglePredictNMTableBtn;

        if (tableContainer.classList.contains('hidden')) {
            tableContainer.classList.remove('hidden');
            button.textContent = 'Masquer';
        } else {
            tableContainer.classList.add('hidden');
            button.textContent = 'Afficher';
        }
    }

    function updateEffectifTitle() {
        const titleElement = document.getElementById('capacityEffectifTitle');
        if (!titleElement) return;

        // Count selected agents by type, including fixed agents
        const jeCount = state.customAgentSelection.Je.length;
        
        // For M: count selected + 1 (always add 1 for MC chef)
        const mCount = state.customAgentSelection.M.length + 1;
        
        // For J: count selected + 1 (always add 1 for JC chef)
        const jCount = state.customAgentSelection.J.length + 1;
        
        // For SN: count selected + 1 (always add 1 for NC chef)
        const snCount = state.customAgentSelection.SN.length + 1;

        // Update title with current selection counts
        titleElement.textContent = `Effectif ${jeCount} Je / ${mCount} M / ${jCount} J / ${snCount} SN`;
    }
});
