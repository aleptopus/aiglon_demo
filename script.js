document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements & State ---
    const elements = {
        csvFile: document.getElementById('csvFileInput'),
        jsonFile: document.getElementById('jsonFileInput'), // Restored
        csvName: document.getElementById('csvFileName'),
        jsonName: document.getElementById('jsonFileName'),   // Restored
        jsonButton: document.querySelector('button[onclick*="jsonFileInput"]'), // Restored
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
        trafficChartTitle: document.getElementById('trafficChartTitle'), // Added for dynamic title
        chartCanvas: document.getElementById('trafficChart').getContext('2d'),
        toggleChartBtn: document.getElementById('toggleChartTypeBtn'),
        summaryTableHead: document.querySelector('#summaryTable thead'),
        summaryTableBody: document.querySelector('#summaryTable tbody'),
        capacityControlsCard: document.getElementById('capacityControlsCard'),
        staffMatin: document.getElementById('staffMatin'),
        staffJour: document.getElementById('staffJour'),
        staffNuit: document.getElementById('staffNuit'),
        sivSlider: document.getElementById('sivSlider'),
        sivValue: document.getElementById('sivValue'),
        periodSelect: document.getElementById('periodSelect'),
        sivSelect: document.getElementById('sivSelect'),
        // Min/Max stat display elements
        depMinMaxDate: document.getElementById('depMinMaxDate'),
        arrMinMaxDate: document.getElementById('arrMinMaxDate'),
        tmaMinMaxDate: document.getElementById('tmaMinMaxDate'),
        capacityMinMaxDate: document.getElementById('capacityMinMaxDate'),
        agentsMinMaxDate: document.getElementById('agentsMinMaxDate'),
    };

    let state = {
        cohorData: [],
        tmaMap: new Map(),
        grilleVacations: vacationGrids, // Initialize with global data
        compoEquipe: staffingMap, // Initialize with global data
        combinedData: [],
        fullDateRange: [],
        currentStartDate: null,
        currentEndDate: null,
        isStacked: true,
        trafficChart: null,
        windowDurationMs: 0,
        capacityCalculatorInstance: null, // Added for CapacityCalculator
    };
    
    // --- Initialization Functions ---
    let cohorDataLoaded = false;
    let tmaDataLoaded = false;

    function attemptInitializeDashboard() {
        if (cohorDataLoaded && tmaDataLoaded) {
            if (state.cohorData.length > 0 && state.tmaMap.size > 0) {
                console.log("Both COHOR and TMA data ready. Initializing dashboard.");
                initializeDashboard();
            } else {
                console.warn("Dashboard initialization skipped: COHOR data or TMA data missing/empty after loading attempts.");
                if (state.cohorData.length === 0 && cohorDataLoaded) {
                    // Alert/message is handled by handleCohorFile
                }
                if (state.tmaMap.size === 0 && tmaDataLoaded) {
                    if (elements.initialMsg && !elements.initialMsg.textContent.includes("Erreur")) {
                        elements.initialMsg.innerHTML = `<p style="color: orange;">Données TMA non disponibles ou vides. Certaines fonctionnalités peuvent être limitées.</p>`;
                        elements.initialMsg.classList.remove('hidden'); // Ensure message is visible
                    }
                }
            }
        }
    }

    function initializeCapacityCalculator() {
        if (state.grilleVacations && typeof state.grilleVacations === 'object' && Object.keys(state.grilleVacations).length > 0 &&
            state.compoEquipe && typeof state.compoEquipe === 'object' && Object.keys(state.compoEquipe).length > 0 &&
            sivRules && typeof sivRules === 'object' && Object.keys(sivRules).length > 0) {

            state.capacityCalculatorInstance = new CapacityCalculator(
                state.compoEquipe, // This is staffingMap from staffingMap.js
                sivRules,          // This is sivRules from sivRules.js
                state.grilleVacations // This is vacationGrids from vacationGrids.js
            );
            console.log("CapacityCalculator initialized successfully.");
        } else {
            console.warn("CapacityCalculator could not be initialized due to missing critical data (staffingMap, sivRules, or vacationGrids).");
            // Optionally, disable capacity-related UI features if initialization fails
        }
    }

    // --- Constants ---
    const DAYS_OF_WEEK = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    const TRAFFIC_TYPES = [
        { key: "isArrival", label: "Arrivées", color: 'rgba(158, 206, 106, 0.8)' },
        { key: "isDeparture", label: "Départs", color: 'rgba(247, 118, 142, 0.8)' },
        { key: "tma", label: "TMA", color: 'rgba(122, 162, 247, 0.8)' }
    ];

    // --- Event Listeners ---
    elements.csvFile.addEventListener('change', handleCohorFile);
    elements.jsonFile.addEventListener('change', handleTmaFile); // Restored
    elements.toggleChartBtn.addEventListener('click', toggleChartStacking);
    [elements.dateStartInput, elements.dateEndInput].forEach(el => {
        if (el) {
            el.addEventListener('change', updateFromDateInputs);
        }
    });
    [elements.staffMatin, elements.staffJour, elements.staffNuit, elements.sivSlider, elements.periodSelect, elements.sivSelect].forEach(el => {
        if (el) {
            el.addEventListener('input', () => {
                updateDashboard(false);
            });
        }
    });

    initializeCapacityCalculator();
    // loadDefaultTmaData(); // Removed call, will be loaded via file input

    function handleCohorFile(event) {
        const file = event.target.files[0];
        if (!file) return;
        if (elements.csvName) elements.csvName.textContent = file.name;
        cohorDataLoaded = false;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                state.cohorData = processCohorCSV(e.target.result);
                if (state.cohorData.length === 0) {
                    alert("Aucune donnée prévisionnelle trouvée ou traitée dans le fichier COHOR. Vérifiez le format du fichier.");
                    if (elements.csvName) elements.csvName.textContent = "Erreur fichier ou données";
                }
            } catch (error) {
                console.error("Error processing COHOR CSV:", error);
                alert(`Erreur lors du traitement du fichier COHOR: ${error.message}`);
                if (elements.csvName) elements.csvName.textContent = "Erreur de traitement";
                state.cohorData = [];
            } finally {
                cohorDataLoaded = true;
                attemptInitializeDashboard();
            }
        };
        reader.onerror = () => {
            console.error("FileReader error for COHOR CSV.");
            alert("Erreur de lecture du fichier COHOR.");
            if (elements.csvName) elements.csvName.textContent = "Erreur de lecture";
            state.cohorData = [];
            cohorDataLoaded = true;
            attemptInitializeDashboard();
        };
        reader.readAsText(file, 'UTF-8');
    }

    function handleTmaFile(event) { // Restored function
        const file = event.target.files[0];
        if (!file) return;
        if (elements.jsonName) elements.jsonName.textContent = file.name;
        tmaDataLoaded = false;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                state.tmaMap = processTmaJSON(e.target.result);
                if (state.tmaMap.size === 0) {
                    alert("Aucune donnée TMA trouvée ou traitée dans le fichier JSON.");
                     if (elements.jsonName) elements.jsonName.textContent = "Erreur fichier ou données";
                }
            } catch (error) {
                console.error("Error processing TMA JSON:", error);
                alert(`Erreur lors du traitement du fichier TMA: ${error.message}`);
                if (elements.jsonName) elements.jsonName.textContent = "Erreur de traitement";
                state.tmaMap = new Map();
            } finally {
                tmaDataLoaded = true;
                attemptInitializeDashboard();
            }
        };
        reader.onerror = () => {
            console.error("FileReader error for TMA JSON.");
            alert("Erreur de lecture du fichier TMA.");
            if (elements.jsonName) elements.jsonName.textContent = "Erreur de lecture";
            state.tmaMap = new Map();
            tmaDataLoaded = true;
            attemptInitializeDashboard();
        };
        reader.readAsText(file, 'UTF-8');
    }

    // async function loadDefaultTmaData() { ... } // This function is removed

    function initializeDashboard() {
        elements.initialMsg.classList.add('hidden');
        elements.dashboard.classList.remove('hidden');
        if (elements.jsonButton) elements.jsonButton.disabled = false;
        [elements.dateStartInput, elements.dateEndInput].forEach(el => el.disabled = false);

        combineAllData();
        const dates = [...new Set(state.combinedData.map(d => d.date.getTime()))].sort();
        state.fullDateRange = [new Date(dates[0]), new Date(dates[dates.length - 1])];
        
        const sevenDaysLater = new Date(state.fullDateRange[0]);
        sevenDaysLater.setDate(sevenDaysLater.getDate() + 6);
        state.currentStartDate = state.fullDateRange[0];
        state.currentEndDate = sevenDaysLater > state.fullDateRange[1] ? state.fullDateRange[1] : sevenDaysLater;
        state.windowDurationMs = state.currentEndDate.getTime() - state.currentStartDate.getTime();
        
        elements.dateStartInput.valueAsDate = state.currentStartDate;
        elements.dateEndInput.valueAsDate = state.currentEndDate;

        createToggleButtons();
        createDateSlider();
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
                        const offsetMinutes = values[colIndices.ad] === 'A' ? -24 : (values[colIndices.ad] === 'D' ? 11 : 0);
                        const localTmaDt = new Date(utcDt.getTime() + offsetMinutes * 60 * 1000);
                        const makeSlot = (date) => `${String(date.getHours()).padStart(2, '0')}:${String(Math.floor(date.getMinutes() / 15) * 15).padStart(2, '0')}`;
                        flights.push({ 
                            date: new Date(localTmaDt.getFullYear(), localTmaDt.getMonth(), localTmaDt.getDate()), 
                            datetime: localTmaDt,
                            timeSlot: makeSlot(localTmaDt), 
                            isArrival: values[colIndices.ad] === 'A' ? 1 : 0, 
                            isDeparture: values[colIndices.ad] === 'D' ? 1 : 0 
                        });
                    }
                    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
                }
            } catch (e) { console.warn("Ligne COHOR ignorée:", row, e); }
        });
        const today = new Date(); today.setHours(0, 0, 0, 0);
        return flights.filter(f => f.date >= today);
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
        const getDayType = (date) => DAYS_OF_WEEK[(date.getDay() + 6) % 7];
        state.combinedData = state.cohorData.map(flight => {
            const month = flight.datetime.getMonth() + 1;
            const dayType = getDayType(flight.datetime);
        // TMA data is hourly. Get the HH:00 slot for the flight's datetime.
        const flightHourSlot = `${String(flight.datetime.getHours()).padStart(2, '0')}:00`;
        const tmaKey = `${month}-${dayType}-${flightHourSlot}`;
        const tmaValue = state.tmaMap.get(tmaKey) || 0; // Get the hourly TMA value

        // Assign this hourly TMA value to the flight.
        // In updateMainChart, the tmaTracker logic will ensure this hourly value is
        // attributed once per 15-min slot if there's activity in that slot.
            return { ...flight, tma: tmaValue };
        });
    }

    // --- UI Creation & Interaction ---
    function createToggleButtons() {
        elements.dayToggles.innerHTML = DAYS_OF_WEEK.map((day, i) => `<input type="checkbox" id="day-${i}" value="${i}" checked><label for="day-${i}">${day.substring(0,3)}</label>`).join('');
        elements.trafficToggles.innerHTML = TRAFFIC_TYPES.map((type) => `<input type="checkbox" id="type-${type.key}" value="${type.key}" checked><label for="type-${type.key}">${type.label}</label>`).join('');
        document.querySelectorAll('.toggle-group input').forEach(cb => cb.addEventListener('change', updateDashboard));
    }

    function createDateSlider() {
        const [minDate, maxDate] = state.fullDateRange;
        const containerWidth = elements.dateSliderContainer.clientWidth;
        if (containerWidth === 0) return; // Don't draw if not visible
        const margin = { right: 20, left: 20 };
        const width = contuttons() {
        elements.dayToggles.innerHTML = DAYS_OF_WEEK.map((day, i) => `<input type="checkbox" id="day-${i}" value="${i}" checked><label for="day-${i}">${day.substring(0,3)}</label>`).join('');
        elements.trafficToggles.innerHTML = TRAFFIC_TYPES.map((type) => `<input type="checkbox" id="type-${type.key}" value="${type.key}" checked><label for="type-${type.key}">${type.label}</label>`).join('');
        document.querySelectorAll('.toggle-group input').forEach(cb => cb.addEventListener('change', updateDashboard));
    }

    function createDateSlider() {
        const [minDate, maxDate] = state.fallDaieRange;
        consn certainerWidth = elementW.dateSliderContainer.clientWidth;
        if icontainerWidth === 0d return; // Don't draw if not visible
        const margin =th right: 20, left: 20 };
        const width = containerWidth - margin.left - margin.right; - margin.left - margin.right;
        
        elements.dateSliderContainer.innerHTML = '';
        const svg = d3.select(elements.dateSliderContainer).append("svg").attr("width", containerWidth).attr("height", 50);
        const x = d3.scaleTime().domain([minDate, maxDate]).range([0, width]).clamp(true);
        const slider = svg.append("g").attr("class", "slider").attr("transform", `translate(${margin.left}, 25)`);
        
        slider.append("line").attr("class", "slider-track").attr("x1", x.range()[0]).attr("x2", x.range()[1]);
        slider.append("line").attr("class", "slider-track-inset").attr("x1", x.range()[0]).attr("x2", x.range()[1]);
        const handle = slider.insert("circle", ".slider-track-overlay").attr("class", "slider-handle").attr("r", 8);

        handle.call(d3.drag()
            .on("start.interrupt", () => slider.interrupt())
            .on("drag", (event) => {
                let newStartDate = x.invert(event.x);
                let newEndDate = new Date(newStartDate.getTime() + state.windowDurationMs);
                
                if (newEndDate > maxDate) {
                    newEndDate = maxDate;
                    newStartDate = new Date(newEndDate.getTime() - state.windowDurationMs);
                }
                
                state.currentStartDate = newStartDate;
                state.currentEndDate = newEndDate;
                
                elements.dateStartInput.valueAsDate = state.currentStartDate;
                elements.dateEndInput.valueAsDate = state.currentEndDate;
                handle.attr("cx", x(state.currentStartDate));
                
                updateDashboard(false);
            })
        );
        updateSliderHandle();
    }

    function updateFromDateInputs() {
        state.currentStartDate = elements.dateStartInput.valueAsDate;
        state.currentEndDate = elements.dateEndInput.valueAsDate;
        state.windowDurationMs = state.currentEndDate.getTime() - state.currentStartDate.getTime();
        updateSliderHandle();
        updateDashboard(false);
    }
    
    function updateSliderHandle() {
        if (!state.fullDateRange[0] || elements.dateSliderContainer.clientWidth === 0) return;
        const x = d3.scaleTime().domain(state.fullDateRange).range([0, elements.dateSliderContainer.clientWidth - 40]);
        d3.select(".slider-handle").attr("cx", x(state.currentStartDate));
    }

    // --- Dashboard Update Logic ---
    function updateDashboard(redrawSlider = true) {
        if (state.combinedData.length === 0) return;
        if (redrawSlider) createDateSlider();

        const activeDays = [...elements.dayToggles.querySelectorAll('input:checked')].map(cb => parseInt(cb.value));

        // Implement 06h to 06h filtering logic
        let filterStartDateTime = null;
        let filterEndDateTime = null;

        if (state.currentStartDate && state.currentEndDate) {
            filterStartDateTime = new Date(state.currentStartDate);
            filterStartDateTime.setHours(6, 0, 0, 0); // Start date at 06:00 local

            filterEndDateTime = new Date(state.currentEndDate);
            // End date is inclusive for user selection, so target flights up to 05:59:59 on the day AFTER currentEndDate.
            // Thus, the exclusive boundary is 06:00 on (currentEndDate + 1 day).
            filterEndDateTime.setDate(filterEndDateTime.getDate() + 1);
            filterEndDateTime.setHours(6, 0, 0, 0);
        }

        const filtered = state.combinedData.filter(d => {
            const dayOfWeek = (d.datetime.getDay() + 6) % 7; // d.datetime is local
            let includeByDate = true;
            if (filterStartDateTime && filterEndDateTime) {
                includeByDate = d.datetime >= filterStartDateTime && d.datetime < filterEndDateTime;
            }
            return includeByDate && activeDays.includes(dayOfWeek);
        });
        
        const hasCapacityData = state.capacityCalculatorInstance !== null;

        if (hasCapacityData && state.isStacked) {
            elements.capacityControlsCard.classList.remove('hidden');
        } else {
            // Hide capacity controls if no data OR if not in stacked view
            elements.capacityControlsCard.classList.add('hidden');
        }
        
        updateSummaryCards(filtered);
        updateMainChart(filtered);
        updateSummaryTable(filtered, activeDays);
    }
    
    function toggleChartStacking() {
        state.isStacked = !state.isStacked;
        elements.toggleChartBtn.textContent = state.isStacked ? 'Vue Côte à Côte' : 'Vue Empilée';
        updateDashboard(false);
    }

    // Old calculateCapacity function is removed as its logic is now in CapacityCalculator.js
    
    function updateMainChart(data) {
        const numDays = new Set(data.map(d => d.date.toDateString())).size || 1;
        if (elements.trafficChartTitle) {
            elements.trafficChartTitle.textContent = `Trafic moyen par créneau horaire (${numDays} jour${numDays > 1 ? 's' : ''})`;
        }
        const slotData = new Map();
        for (let h = 0; h < 24; h++) { for (let m = 0; m < 60; m += 15) { slotData.set(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`, { isArrival: 0, isDeparture: 0, tma: 0 }); } }
        const tmaTracker = new Set();
        data.forEach(d => {
            const slot = slotData.get(d.timeSlot);
            if(slot) {
                slot.isArrival += d.isArrival; slot.isDeparture += d.isDeparture;
                const tmaKey = `${d.date.toDateString()}-${d.timeSlot}`;
                if (d.tma > 0 && !tmaTracker.has(tmaKey)) { slot.tma += d.tma; tmaTracker.add(tmaKey); }
            }
        });
        
        const rollingData = new Map();
        const sortedSlots = Array.from(slotData.keys()).sort();
        for(let i = 0; i < sortedSlots.length; i++) {
            let sums = { isArrival: 0, isDeparture: 0, tma: 0 };
            for (let j = i; j < Math.min(i + 4, sortedSlots.length); j++) {
                const slotInfo = slotData.get(sortedSlots[j]);
                sums.isArrival += slotInfo.isArrival; sums.isDeparture += slotInfo.isDeparture; sums.tma += slotInfo.tma;
            }
            rollingData.set(sortedSlots[i], {
                isArrival: sums.isArrival / numDays, isDeparture: sums.isDeparture / numDays, tma: sums.tma / numDays,
            });
        }
        
        const activeTraffic = [...elements.trafficToggles.querySelectorAll('input:checked')].map(cb => cb.value);
        const datasets = TRAFFIC_TYPES.map(type => ({
            label: type.label, data: Array.from(rollingData.values()).map(d => d[type.key]),
            backgroundColor: type.color, hidden: !activeTraffic.includes(type.key),
            type: 'bar',
        }));

        // Use new CapacityCalculator instance
        if (state.capacityCalculatorInstance && state.currentStartDate) {
            const sivHypothesis = elements.sivSelect.value;
            const selectedPeriod = elements.periodSelect.value; // "Hiv", "Cha", "Cre"
            
            // The 'activeVacations' parameter is not used by the Python-ported logic in CapacityCalculator,
            // as it selects profiles based on hardcoded rules (top 7 non-chef). Pass null.
            const capacityResult = state.capacityCalculatorInstance.calculateDailyCapacity(
                state.currentStartDate, // Date for which to calculate capacity
                null,                   // activeVacations (not used by current logic)
                sivHypothesis,
                selectedPeriod          // Pass the user-selected period
            );
            const capacityData = capacityResult.capacities;
            updateCapacityAgentMinMaxStats(capacityResult); // Call new function

            // Update SIV display text if sivSlider is still used for display purposes
            // elements.sivValue.textContent = `${elements.sivSlider.value}%`; // This might be misleading now

            const capacityDataset = {
                label: `Capacité (${selectedPeriod})`,
                data: capacityData,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderColor: 'rgba(0, 0, 0, 0.5)',
                type: 'line',
                fill: true,
                pointRadius: 0,
                order: -1, // Draw behind bars
                hidden: !state.isStacked // Hide if not in stacked view
            };
            datasets.push(capacityDataset);
        } else if (state.capacityCalculatorInstance && !state.isStacked) {
            // Ensure capacity is not shown and controls are hidden if not stacked
            if (elements.capacityControlsCard) {
                elements.capacityControlsCard.classList.add('hidden');
            }
        }


        if (state.trafficChart) state.trafficChart.destroy();
        state.trafficChart = new Chart(elements.chartCanvas, {
            type: 'bar',
            data: { labels: sortedSlots, datasets },
            options: {
                responsive: true, maintainAspectRatio: false, animation: { duration: 500 },
                plugins: {
                    legend: { labels: { color: 'var(--text-primary)' } },
                    tooltip: {
                        enabled: true, mode: 'index',
                        titleAlign: 'center', bodyAlign: 'center', footerAlign: 'center',
                        callbacks: {
                            title: function(context) {
                                const label = context[0].label;
                                const h = parseInt(label.split(':')[0]); const m = parseInt(label.split(':')[1]);
                                const startDate = new Date(2000, 0, 1, h, m);
                                const endDate = new Date(startDate.getTime() + 59 * 60 * 1000);
                                const formatTime = (d) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
                                return `Créneau ${formatTime(startDate)} - ${formatTime(endDate)}`;
                            },
                            label: function(context) { return ` ${context.dataset.label}: ${context.parsed.y.toFixed(1)}`; },
                            footer: function(context) {
                                let total = 0;
                                context.forEach(item => { if (!item.dataset.hidden) { total += item.parsed.y; } });
                                return `\nTotal: ${total.toFixed(1)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: { stacked: state.isStacked, ticks: { color: 'var(--text-secondary)' }, grid: { color: 'rgba(161, 170, 184, 0.2)' } },
                    y: { stacked: state.isStacked, beginAtZero: true, ticks: { color: 'var(--text-secondary)' }, grid: { color: 'rgba(161, 170, 184, 0.2)' } }
                }
            }
        });
    }

    function updateSummaryCards(data) {
        const numDays = new Set(data.map(d => d.date.toDateString())).size || 1;
        const totals = data.reduce((acc, d) => { acc.isArrival += d.isArrival; acc.isDeparture += d.isDeparture; return acc; }, { isArrival: 0, isDeparture: 0, tma: 0 });
        const tmaTracker = new Set();
        data.forEach(d => { if (d.tma > 0 && !tmaTracker.has(`${d.date.toDateString()}-${d.timeSlot}`)) { totals.tma += d.tma; tmaTracker.add(`${d.date.toDateString()}-${d.timeSlot}`); } });
        const getAvg = (key) => (totals[key] / numDays).toFixed(1);
    elements.avgDep.textContent = getAvg(totals.isDeparture);
    elements.avgArr.textContent = getAvg(totals.isArrival);
    elements.avgTma.textContent = getAvg(totalTma);
    elements.avgTotal.textContent = (
        parseFloat(elements.avgDep.textContent) +
        parseFloat(elements.avgArr.textContent) +
        parseFloat(elements.avgTma.textContent)
    ).toFixed(1);

    // Min/Max calculation for Dep/Arr/TMA
    const slotAggregates = {};
    data.forEach(flight => {
        const key = `${flight.date.toISOString().slice(0,10)}_${flight.timeSlot}`;
        if (!slotAggregates[key]) {
            slotAggregates[key] = { dep: 0, arr: 0, tma: 0, date: flight.date, slot: flight.timeSlot };
        }
        slotAggregates[key].dep += flight.isDeparture;
        slotAggregates[key].arr += flight.isArrival;
        if (flight.tma > 0) slotAggregates[key].tma = Math.max(slotAggregates[key].tma, flight.tma);
    });

    const aggregateValues = Object.values(slotAggregates);

    const findMinMaxText = (prop) => {
        if (aggregateValues.length === 0) return "N/A";
        let minVal = Infinity, maxVal = -Infinity;
        let minItem = null, maxItem = null;

        aggregateValues.forEach(item => {
            if (item[prop] < minVal) { minVal = item[prop]; minItem = item; }
            if (item[prop] > maxVal) { maxVal = item[prop]; maxItem = item; }
        });

        if (minItem && maxItem) { // Ensure items were found
             return `${minVal.toFixed(0)} (${minItem.date.toLocaleDateString()} ${minItem.slot}) / ${maxVal.toFixed(0)} (${maxItem.date.toLocaleDateString()} ${maxItem.slot})`;
        }
        return "N/A";
    };

    if (elements.depMinMaxDate) elements.depMinMaxDate.textContent = findMinMaxText('dep');
    if (elements.arrMinMaxDate) elements.arrMinMaxDate.textContent = findMinMaxText('arr');
    if (elements.tmaMinMaxDate) elements.tmaMinMaxDate.textContent = findMinMaxText('tma');
}

// New function for Capacity & Agents Min/Max
function updateCapacityAgentMinMaxStats(capacityResult) {
    if (!capacityResult || !elements.capacityMinMaxDate || !elements.agentsMinMaxDate) {
        if(elements.capacityMinMaxDate) elements.capacityMinMaxDate.textContent = "N/A";
        if(elements.agentsMinMaxDate) elements.agentsMinMaxDate.textContent = "N/A";
        return;
    }

    const { capacities, effectiveAgents } = capacityResult;
    const slots = Array.from({ length: 96 }, (_, i) => {
        const hour = Math.floor(i / 4);
        const minute = (i % 4) * 15;
        return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    });

    const findMinMaxForArrayText = (arr, arrSlots) => {
        if (!arr || arr.length === 0) return "N/A";
        let minVal = Infinity, maxVal = -Infinity;
        let minSlot = "", maxSlot = "";
        arr.forEach((val, idx) => {
            if (val < minVal) { minVal = val; minSlot = arrSlots[idx]; }
            if (val > maxVal) { maxVal = val; maxSlot = arrSlots[idx]; }
        });

        if (minSlot === "" && maxSlot === "" && arr.length > 0) { // Handle case where all values are the same
            minVal = arr[0]; maxVal = arr[0]; minSlot = arrSlots[0]; maxSlot = arrSlots[0];
        } else if (minSlot === "" && maxSlot === "") { // Truly empty or all non-numeric
             return "N/A";
        }

        const refDateStr = state.currentStartDate ? state.currentStartDate.toLocaleDateString() : "N/A";
        return `${minVal.toFixed(0)} (${refDateStr} ${minSlot}) / ${maxVal.toFixed(0)} (${refDateStr} ${maxSlot})`;
    };

    elements.capacityMinMaxDate.textContent = findMinMaxForArrayText(capacities, slots);
    elements.agentsMinMaxDate.textContent = findMinMaxForArrayText(effectiveAgents, slots);
    }
    
    function updateSummaryTable(data, activeDays) {
        const dailyAggregates = new Map();
        for (let i = 0; i < 7; i++) {
            if (activeDays.includes(i)) {
                const daysOfType = data.filter(d => (d.datetime.getDay() + 6) % 7 === i);
                const numDaysOfType = new Set(daysOfType.map(d => d.date.toDateString())).size || 1;
                const totals = daysOfType.reduce((acc, d) => { acc.isDeparture += d.isDeparture; acc.isArrival += d.isArrival; return acc; }, { isDeparture: 0, isArrival: 0, tma: 0 });
                const tmaTracker = new Set();
                daysOfType.forEach(d => { if (d.tma > 0 && !tmaTracker.has(`${d.date.toDateString()}-${d.timeSlot}`)) { totals.tma += d.tma; tmaTracker.add(`${d.date.toDateString()}-${d.timeSlot}`); } });
                dailyAggregates.set(i, { 'Départs': totals.isDeparture / numDaysOfType, 'Arrivées': totals.isArrival / numDaysOfType, 'TMA': totals.tma / numDaysOfType, 'Total': (totals.isDeparture + totals.isArrival + totals.tma) / numDaysOfType });
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

        elements.summaryTableHead.innerHTML = `<tr><th></th>${activeDays.map(i => `<th>${DAYS_OF_WEEK[i]}</th>`).join('')}</tr>`; // "Métrique" removed
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
});
