document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements & State ---
    const elements = {
        csvFile: document.getElementById('csvFileInput'),
        jsonFile: document.getElementById('jsonFileInput'),
        grilleFile: document.getElementById('grilleFileInput'),
        compoFile: document.getElementById('compoFileInput'),
        csvName: document.getElementById('csvFileName'),
        jsonName: document.getElementById('jsonFileName'),
        grilleName: document.getElementById('grilleFileName'),
        compoName: document.getElementById('compoFileName'),
        jsonButton: document.querySelector('button[onclick*="jsonFileInput"]'),
        grilleButton: document.querySelector('button[onclick*="grilleFileInput"]'),
        compoButton: document.querySelector('button[onclick*="compoFileInput"]'),
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
        toggleChartBtn: document.getElementById('toggleChartTypeBtn'),
        summaryTableHead: document.querySelector('#summaryTable thead'),
        summaryTableBody: document.querySelector('#summaryTable tbody'),
        capacityControlsCard: document.getElementById('capacityControlsCard'),
        periodSelect: document.getElementById('periodSelect'), // New: Period select
        sivSelect: document.getElementById('sivSelect'),       // New: SIV select
    };

    console.log('vacationGrids at init:', vacationGrids);
    console.log('staffingMap at init:', staffingMap);

    let state = {
        cohorData: [],
        tmaMap: new Map(),
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
        useUTC: true, // Nouvel état pour le fuseau horaire
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

    // --- Event Listeners ---
        elements.csvFile.addEventListener('change', handleCohorFile);
        elements.jsonFile.addEventListener('change', handleTmaFile);
        // elements.grilleFile.addEventListener('change', handleGrilleFile); // No longer needed
        // elements.compoFile.addEventListener('change', handleCompoFile); // No longer needed
        elements.toggleChartBtn.addEventListener('click', toggleChartStacking);
        [elements.dateStartInput, elements.dateEndInput].forEach(el => el.addEventListener('change', updateFromDateInputs));
        elements.sivSelect.addEventListener('change', () => updateDashboard(false));
        elements.periodSelect.addEventListener('change', handleGridSelection);
        document.getElementById('toggleTimezoneBtn').addEventListener('click', toggleTimezone);

        console.log('Chart Canvas Context:', elements.chartCanvas);
        console.log('Chart Canvas Width:', elements.chartCanvas.canvas.width);
        console.log('Chart Canvas Height:', elements.chartCanvas.canvas.height);

    function handleCohorFile(event) {
        const file = event.target.files[0];
        if (!file) return;
        elements.csvName.textContent = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
            state.cohorData = processCohorCSV(e.target.result);
            if (state.cohorData.length > 0) {
                initializeDashboard();
            } else {
                alert("Aucune donnée prévisionnelle trouvée dans le fichier COHOR. Vérifiez le format du fichier.");
            }
        };
        reader.readAsText(file, 'UTF-8');
    }

    function handleTmaFile(event) {
        const file = event.target.files[0];
        if (!file) return;
        elements.jsonName.textContent = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
            state.tmaMap = processTmaJSON(e.target.result);
            combineAllData();
            updateDashboard();
        };
        reader.readAsText(file, 'UTF-8');
    }

    function initializeDashboard() {
        elements.initialMsg.classList.add('hidden');
        elements.dashboard.classList.remove('hidden');
        elements.jsonButton.disabled = false;
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
        console.log('initializeDashboard - state.grilleVacations before updateDashboard:', state.grilleVacations);
        console.log('initializeDashboard - state.compoEquipe before updateDashboard:', state.compoEquipe);
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
                        // timeSlot doit être basé sur l'heure UTC du vol, car les données TMA sont en UTC
                        const makeSlotUTC = (date) => `${String(date.getUTCHours()).padStart(2, '0')}:${String(Math.floor(date.getUTCMinutes() / 15) * 15).padStart(2, '0')}`;
                        
                        // localTmaDt est utilisé pour la date du vol, mais le timeSlot doit être UTC
                        const offsetMinutes = values[colIndices.ad] === 'A' ? -24 : (values[colIndices.ad] === 'D' ? 11 : 0);
                        const localTmaDt = new Date(utcDt.getTime() + offsetMinutes * 60 * 1000); // Keep this for date/datetime if needed elsewhere

                        flights.push({ 
                            date: new Date(utcDt.getFullYear(), utcDt.getMonth(), utcDt.getDate()), // Date should be UTC for consistency
                            datetime: utcDt, // Datetime should be UTC for consistency
                            timeSlot: makeSlotUTC(utcDt), // timeSlot should be UTC
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
            const tmaKey = `${month}-${dayType}-${flight.timeSlot}`;
            const tmaValue = state.tmaMap.get(tmaKey) || 0;
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
        const width = containerWidth - margin.left - margin.right;
        
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
        const filtered = state.combinedData.filter(d => {
            const dayOfWeek = (d.datetime.getDay() + 6) % 7;
            return d.date >= state.currentStartDate && d.date <= state.currentEndDate && activeDays.includes(dayOfWeek);
        });
        
        // const isSingleDay = state.currentStartDate.toDateString() === state.currentEndDate.toDateString(); // Removed as per user request
        console.log('updateDashboard - state.grilleVacations:', state.grilleVacations);
        console.log('updateDashboard - state.compoEquipe:', state.compoEquipe);
        const hasCapacityData = Object.keys(state.grilleVacations).length > 0 && Object.keys(state.compoEquipe).length > 0;
        console.log('updateDashboard - hasCapacityData:', hasCapacityData);

        if (hasCapacityData) { // Capacity should always be shown if data is available
            console.log('Removing hidden class from capacityControlsCard');
            elements.capacityControlsCard.classList.remove('hidden');
        } else {
            console.log('Adding hidden class to capacityControlsCard');
            elements.capacityControlsCard.classList.add('hidden');
        }
        
        updateSummaryCards(filtered);
        updateMainChart(filtered, hasCapacityData);
        updateSummaryTable(filtered, activeDays);
    }
    
    function toggleChartStacking() {
        state.isStacked = !state.isStacked;
        elements.toggleChartBtn.textContent = state.isStacked ? 'Vue Côte à Côte' : 'Vue Empilée';
        updateDashboard(false);
    }
    
    function toggleTimezone() {
        state.useUTC = !state.useUTC;
        document.getElementById('toggleTimezoneBtn').textContent = state.useUTC ? 'UTC' : 'Local';
        updateDashboard(false);
    }

    function updateMainChart(data, showCapacity) { // showCapacity is now always true if hasCapacityData
        const numDays = new Set(data.map(d => d.date.toDateString())).size || 1;
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
        const datasets = TRAFFIC_TYPES.map(type => {
            const data = Array.from(rollingData.values()).map(d => d[type.key]);
            console.log(`Dataset for ${type.label}:`, data);
            return {
                label: type.label, data: data,
                backgroundColor: type.color, hidden: !activeTraffic.includes(type.key),
                type: 'bar',
            };
        });

        // Afficher la capacité si les données sont disponibles et si la vue est empilée
        if (state.isStacked && showCapacity && Object.keys(state.grilleVacations).length > 0 && Object.keys(state.compoEquipe).length > 0) {
            // Si aucune grille n'est sélectionnée, utiliser une grille par défaut
            let gridToUse = state.selectedGrid;
            let customSelection = state.customAgentSelection;
            
            if (!gridToUse) {
                // Sélection automatique d'une grille par défaut (Semaine Chargée)
                gridToUse = 'SemCha';
                customSelection = null; // Utiliser la sélection automatique
            }
            
            const sivHypothesis = elements.sivSelect.value; // ex: "VFR fort"
            
            // Utiliser la nouvelle méthode avec grille spécifique et sélection d'agents
            const capacityResult = capacityCalculator.calculateCapacityWithSpecificGrid(
                gridToUse,                    // Grille sélectionnée ou par défaut
                customSelection,              // Sélection d'agents personnalisée ou automatique
                sivHypothesis                 // Hypothèse SIV
            );

            const capacityData = capacityResult.capacities;
            console.log('Données de capacité finales:', capacityData);
            
            datasets.push({
                label: 'Capacité',
                data: capacityData,
                backgroundColor: 'rgba(255, 158, 100, 0.2)',
                borderColor: 'rgba(255, 158, 100, 0.8)',
                type: 'line',
                fill: true,
                pointRadius: 0,
                stepped: 'before',  // Courbe en escalier, alignée sur le début du créneau
                order: -1,
                hidden: !state.isStacked // Hide if not stacked
            });
        }

        console.log('Chart Labels (sortedSlots):', sortedSlots);
        console.log('Final Chart Datasets:', datasets);

        if (state.trafficChart) state.trafficChart.destroy();
        
        // Add a small delay to ensure canvas dimensions are calculated
        setTimeout(() => {
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
                                    const getTime = (d) => state.useUTC ? 
                                        `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}` :
                                        `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
                                    return `Créneau ${getTime(startDate)} - ${getTime(endDate)} (${state.useUTC ? 'UTC' : 'Local'})`;
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
                        x: { 
                            stacked: state.isStacked, 
                            ticks: { 
                                color: 'var(--text-secondary)',
                                callback: function(value, index, ticks) {
                                    const slot = this.getLabelForValue(value);
                                    const [h, m] = slot.split(':').map(Number);
                                    const date = new Date(2000, 0, 1, h, m);
                                    return state.useUTC ? 
                                        `${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}` :
                                        slot;
                                }
                            }, 
                            grid: { color: 'rgba(161, 170, 184, 0.2)' } 
                        },
                        y: { stacked: state.isStacked, beginAtZero: true, ticks: { color: 'var(--text-secondary)' }, grid: { color: 'rgba(161, 170, 184, 0.2)' } }
                    }
                }
            });
            console.log('Chart initialized with dimensions:', elements.chartCanvas.canvas.width, elements.chartCanvas.canvas.height);
        }, 0); // Smallest possible delay
    }

    function updateSummaryCards(data) {
        const numDays = new Set(data.map(d => d.date.toDateString())).size || 1;
        const totals = data.reduce((acc, d) => { acc.isArrival += d.isArrival; acc.isDeparture += d.isDeparture; return acc; }, { isArrival: 0, isDeparture: 0, tma: 0 });
        const tmaTracker = new Set();
        data.forEach(d => { if (d.tma > 0 && !tmaTracker.has(`${d.date.toDateString()}-${d.timeSlot}`)) { totals.tma += d.tma; tmaTracker.add(`${d.date.toDateString()}-${d.timeSlot}`); } });
        const getAvg = (key) => (totals[key] / numDays).toFixed(1);
        elements.avgDep.textContent = getAvg('isDeparture'); elements.avgArr.textContent = getAvg('isArrival');
        elements.avgTma.textContent = getAvg('tma');
        elements.avgTotal.textContent = (parseFloat(elements.avgDep.textContent) + parseFloat(elements.avgArr.textContent) + parseFloat(elements.avgTma.textContent)).toFixed(1);
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
        const gridData = state.grilleVacations[dayType]?.[periodCode];
        
        if (gridData && gridData.grid) {
            state.availableAgents = capacityCalculator.getAgentsByType(gridData);
            generateAgentButtons();
            initializeDefaultSelection();
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
        
        // Generate buttons for each agent type, excluding fixed ones
        ['Je', 'M', 'J', 'SN'].forEach(type => { // Explicitly iterate over types that have selectable buttons
            const container = buttonContainers[type];
            if (!container) return;
            
            const agents = state.availableAgents[type];
            const maxAgents = type === 'Je' ? 3 : 8; // Max agents to display for selection
            
            // Filter out fixed agents (MC, JC, NC) if they somehow appear here, though they should be in their own categories
            const selectableAgents = agents.filter(agent => !['MC', 'JC', 'NC'].includes(agent.vacation));

            selectableAgents.slice(0, maxAgents).forEach((agent, index) => {
                const button = document.createElement('button');
                button.className = 'agent-button';
                button.textContent = agent.vacation;
                button.dataset.agentType = type;
                button.dataset.agentId = agent.vacation;
                button.addEventListener('click', () => toggleAgentSelection(type, agent.vacation, button));
                container.appendChild(button);
            });
        });
    }
    
    function initializeDefaultSelection() {
        // Initialize with default selection (3 Je + 8 M + 8 J + 8 SN)
        state.customAgentSelection = { Je: [], M: [], J: [], SN: [] };
        
        // Add fixed agents to selection first
        if (state.availableAgents.MC) state.customAgentSelection.M.push(...state.availableAgents.MC.map(a => a.vacation));
        if (state.availableAgents.JC) state.customAgentSelection.J.push(...state.availableAgents.JC.map(a => a.vacation));
        if (state.availableAgents.NC) state.customAgentSelection.SN.push(...state.availableAgents.NC.map(a => a.vacation));

        ['Je', 'M', 'J', 'SN'].forEach(type => {
            const maxAgents = type === 'Je' ? 3 : 8;
            // Filter out fixed agents from the slice, as they are already handled
            const agentsToSelect = state.availableAgents[type].filter(agent => !['MC', 'JC', 'NC'].includes(agent.vacation));
            
            // Adjust slice based on how many fixed agents are already included in the type's count
            const currentCount = state.customAgentSelection[type].length;
            const remainingToSelect = maxAgents - currentCount;

            if (remainingToSelect > 0) {
                agentsToSelect.slice(0, remainingToSelect).forEach(agent => {
                    state.customAgentSelection[type].push(agent.vacation);
                });
            }
        });
        
        updateAgentButtonStates();
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
        
        updateDashboard(false);
    }
    
    function updateAgentButtonStates() {
        document.querySelectorAll('.agent-button').forEach(button => {
            const type = button.dataset.agentType;
            const agentId = button.dataset.agentId;
            
            if (state.customAgentSelection[type] && state.customAgentSelection[type].includes(agentId)) {
                button.classList.add('selected');
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
});
