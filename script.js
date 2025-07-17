document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements & State ---
    const elements = {
        csvFile: document.getElementById('csvFileInput'),
        jsonFile: document.getElementById('jsonFileInput'),
        csvName: document.getElementById('csvFileName'),
        jsonName: document.getElementById('jsonFileName'),
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
        periodSelect: document.getElementById('periodSelect'),
        sivSelect: document.getElementById('sivSelect'),
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

    function handleCohorFile(event) {
        console.log("handleCohorFile called");
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
        console.log("handleTmaFile called");
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
                        
                        // Appliquer les décalages spécifiques pour les arrivées et départs
                        const offsetMinutes = values[colIndices.ad] === 'A' ? -24 : (values[colIndices.ad] === 'D' ? 11 : 0);
                        const adjustedDt = new Date(utcDt.getTime() + offsetMinutes * 60 * 1000);

                        // timeSlot doit être basé sur l'heure UTC du vol ajusté
                        const makeSlotUTC = (date) => `${String(date.getUTCHours()).padStart(2, '0')}:${String(Math.floor(date.getUTCMinutes() / 15) * 15).padStart(2, '0')}`;
                        
                        flights.push({ 
                            date: new Date(adjustedDt.getFullYear(), adjustedDt.getMonth(), adjustedDt.getDate()), // Date should be UTC for consistency
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
        
        if (isTransitionPeriod(state.currentStartDate, state.currentEndDate)) {
            alert("La période sélectionnée chevauche un changement d'heure. Veuillez sélectionner une période entièrement en heure d'été ou d'hiver.");
            return;
        }

        updateSliderHandle();
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
        
        // Generate slots for internal data processing (always UTC)
        const utcSlots = [];
        for (let h = 0; h < 24; h++) {
            for (let m = 0; m < 60; m += 15) {
                const slotStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
                utcSlots.push(slotStr);
                slotData.set(slotStr, { isArrival: 0, isDeparture: 0, tma: 0 });
            }
        }

        const tmaTracker = new Set();
        data.forEach(d => {
            const slot = slotData.get(d.timeSlot); // d.timeSlot is always UTC
            if(slot) {
                slot.isArrival += d.isArrival; slot.isDeparture += d.isDeparture;
                const tmaKey = `${d.date.toDateString()}-${d.timeSlot}`;
                if (d.tma > 0 && !tmaTracker.has(tmaKey)) { slot.tma += d.tma; tmaTracker.add(tmaKey); }
            }
        });
        
        const rollingData = new Map();
        for(let i = 0; i < utcSlots.length; i++) {
            let sums = { isArrival: 0, isDeparture: 0, tma: 0 };
            for (let j = i; j < Math.min(i + 4, utcSlots.length); j++) {
                const slotInfo = slotData.get(utcSlots[j]);
                sums.isArrival += slotInfo.isArrival; sums.isDeparture += slotInfo.isDeparture; sums.tma += slotInfo.tma;
            }
            rollingData.set(utcSlots[i], {
                isArrival: sums.isArrival / numDays, isDeparture: sums.isDeparture / numDays, tma: sums.tma / numDays,
            });
        }
        
        const activeTraffic = [...elements.trafficToggles.querySelectorAll('input:checked')].map(cb => cb.value);
        const datasets = TRAFFIC_TYPES.map(type => {
            // Map data to the new sortedSlots (display labels)
            const data = utcSlots.map(utcSlot => rollingData.get(utcSlot)?.[type.key] || 0);
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
                sivHypothesis,                // Hypothèse SIV
                state.currentStartDate        // Date de début pour le calcul DST
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
                stepped: 'middle',  // Courbe en escalier, alignée sur le milieu du créneau
                order: -1,
                hidden: !state.isStacked // Hide if not stacked
            });
        }

        console.log('Chart Labels (utcSlots):', utcSlots);
        console.log('Final Chart Datasets:', datasets);

        if (state.trafficChart) state.trafficChart.destroy();
        
        // Add a small delay to ensure canvas dimensions are calculated
        setTimeout(() => {
            state.trafficChart = new Chart(elements.chartCanvas, {
                type: 'bar',
                data: { labels: utcSlots, datasets }, // Use utcSlots as base labels
                options: {
                    responsive: true, maintainAspectRatio: false, animation: { duration: 500 },
                    plugins: {
                        legend: { labels: { color: 'var(--text-primary)' } },
                        tooltip: {
                            enabled: true, mode: 'index',
                            titleAlign: 'center', bodyAlign: 'center', footerAlign: 'center',
                            callbacks: {
                                title: function(context) {
                                    const label = context[0].label; // This is now the UTC slot label
                                    const [h, m] = label.split(':').map(Number);
                                    const utcDate = new Date(Date.UTC(2000, 0, 1, h, m));
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
                                    const slot = this.getLabelForValue(value); // This is the UTC slot label
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
        }, 0); // Smallest possible delay
    }

    function updateSummaryCards(data) {
        const numDays = new Set(data.map(d => d.date.toDateString())).size || 1;
        const totals = data.reduce((acc, d) => { acc.isArrival += d.isArrival; acc.isDeparture += d.isDeparture; return acc; }, { isArrival: 0, isDeparture: 0, tma: 0 });
        const tmaTracker = new Set();
        data.forEach(d => { if (d.tma > 0 && !tmaTracker.has(`${d.date.toDateString()}-${d.timeSlot}`)) { totals.tma += d.tma; tmaTracker.add(`${d.date.toDateString()}-${d.timeSlot}`); } });
        
        const getAvg = (key) => (totals[key] / numDays).toFixed(1);
        
        elements.avgDep.textContent = getAvg('isDeparture');
        elements.avgArr.textContent = getAvg('isArrival');
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
        const orderedAgents = [];
        const agentsByType = { Je: [], MC: [], M: [], JC: [], J: [], S: [], NC: [], N: [] };

        gridData.forEach(agent => {
            const vacation = agent.vacation;
            if (vacation.startsWith('Je')) {
                agentsByType.Je.push(agent);
            } else if (vacation === 'MC') {
                agentsByType.MC.push(agent);
            } else if (vacation.startsWith('M')) {
                agentsByType.M.push(agent);
            } else if (vacation === 'JC') {
                agentsByType.JC.push(agent);
            } else if (vacation.startsWith('J')) {
                agentsByType.J.push(agent);
            } else if (vacation.startsWith('S')) { // Only S, not SN
                agentsByType.S.push(agent);
            } else if (vacation === 'NC') {
                agentsByType.NC.push(agent);
            } else if (vacation.startsWith('N')) {
                agentsByType.N.push(agent);
            }
        });

        // Sort each group alphabetically by vacation name
        Object.keys(agentsByType).forEach(key => {
            agentsByType[key].sort((a, b) => a.vacation.localeCompare(b.vacation));
        });

        // Add in specified order
        orderedAgents.push(...agentsByType.Je);
        orderedAgents.push(...agentsByType.MC); // MC before M
        orderedAgents.push(...agentsByType.M);
        orderedAgents.push(...agentsByType.JC); // JC before J
        orderedAgents.push(...agentsByType.J);
        orderedAgents.push(...agentsByType.S);
        orderedAgents.push(...agentsByType.NC);
        orderedAgents.push(...agentsByType.N);

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
        const margin = { top: 50, right: 20, bottom: 50, left: 80 };
        const cellSize = 15; // Taille d'une cellule carrée
        const width = 96 * cellSize + margin.left + margin.right;
        const height = yLabels.length * cellSize + margin.top + margin.bottom;

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
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // 3. Échelles
        const x = d3.scaleBand()
            .range([0, 96 * cellSize])
            .domain(d3.range(96))
            .paddingInner(0.05);

        const y = d3.scaleBand()
            .range([0, yLabels.length * cellSize])
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
            .tickValues(d3.range(0, 96, 4)) // Toutes les heures (0, 4, 8, ...)
            .tickFormat(d => {
                const hour = Math.floor(d / 4) + 4; // Convertir l'index en heure (décalage de 4h)
                return `${String(hour % 24).padStart(2, '0')}h`;
            });

        const yAxis = d3.axisLeft(y);

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0, ${yLabels.length * cellSize})`)
            .call(xAxis);

        svg.append("g")
            .attr("class", "y-axis")
            .call(yAxis);

        // Style des axes
        svg.selectAll(".x-axis text")
            .style("fill", "var(--text-secondary)");
        svg.selectAll(".y-axis text")
            .style("fill", "var(--text-secondary)");
        svg.selectAll(".x-axis path, .x-axis line, .y-axis path, .y-axis line")
            .style("stroke", "var(--text-secondary)");

        // 6. Tooltip
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // 7. Légende
        const legendData = [
            { value: '1', label: 'Actif (1)', color: 'rgba(128, 0, 128, 0.7)' },
            { value: 'C', label: 'Chef (C)', color: 'rgba(255, 0, 0, 0.7)' },
            { value: 'P', label: 'Pause (P)', color: 'rgba(135, 206, 235, 0.7)' },
            { value: 'R', label: 'Repos (R)', color: 'rgba(255, 165, 0, 0.7)' }
        ];

        const legend = container.append("div")
            .attr("class", "heatmap-legend-d3");

        legend.selectAll(".legend-item")
            .data(legendData)
            .enter().append("div")
            .attr("class", "legend-item")
            .html(d => `<span class="legend-color" style="background-color: ${d.color};"></span><span>${d.label}</span>`);
    }

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
