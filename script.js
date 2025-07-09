document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements & State ---
    const elements = {
        csvFile: document.getElementById('csvFileInput'),
        jsonFile: document.getElementById('jsonFileInput'),
        csvName: document.getElementById('csvFileName'),
        jsonName: document.getElementById('jsonFileName'),
        jsonButton: document.querySelector('button[onclick*="jsonFileInput"]'),
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
        trafficChartTitle: document.getElementById('trafficChartTitle'),
        nivoChartContainer: document.getElementById('nivoChartContainer'),
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
        depMinMaxDate: document.getElementById('depMinMaxDate'),
        arrMinMaxDate: document.getElementById('arrMinMaxDate'),
        tmaMinMaxDate: document.getElementById('tmaMinMaxDate'),
        capacityMinMaxDate: document.getElementById('capacityMinMaxDate'),
        agentsMinMaxDate: document.getElementById('agentsMinMaxDate'),
    };

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
        windowDurationMs: 0,
        capacityCalculatorInstance: null,
    };
    
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
                    // Alert handled in handleCohorFile
                }
                if (state.tmaMap.size === 0 && tmaDataLoaded) {
                    if (elements.initialMsg && elements.initialMsg.textContent && !elements.initialMsg.textContent.includes("Erreur")) {
                        elements.initialMsg.innerHTML = `<p style="color: orange;">Données TMA non disponibles ou vides. Certaines fonctionnalités peuvent être limitées.</p>`;
                        elements.initialMsg.classList.remove('hidden');
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
                state.compoEquipe,
                sivRules,
                state.grilleVacations
            );
            console.log("CapacityCalculator initialized successfully.");
        } else {
            console.warn("CapacityCalculator could not be initialized due to missing critical data.");
        }
    }

    const DAYS_OF_WEEK = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    const TRAFFIC_TYPES = [
        { key: "isArrival", label: "Arrivées", color: 'rgba(158, 206, 106, 0.8)' },
        { key: "isDeparture", label: "Départs", color: 'rgba(247, 118, 142, 0.8)' },
        { key: "tma", label: "TMA", color: 'rgba(122, 162, 247, 0.8)' }
    ];

    elements.csvFile.addEventListener('change', handleCohorFile);
    elements.jsonFile.addEventListener('change', handleTmaFile);
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

    function handleTmaFile(event) {
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

    function initializeDashboard() {
        elements.initialMsg.classList.add('hidden');
        elements.dashboard.classList.remove('hidden');
        if (elements.jsonButton) elements.jsonButton.disabled = false;
        [elements.dateStartInput, elements.dateEndInput].forEach(el => el.disabled = false);

        combineAllData();
        const dates = [...new Set(state.combinedData.map(d => d.date.getTime()))].sort();
        if (dates.length === 0) {
            alert("Aucune donnée à afficher après combinaison des fichiers. Vérifiez les fichiers et les filtres.");
            const todayForRange = new Date();
            const tomorrowForRange = new Date(todayForRange);
            tomorrowForRange.setDate(todayForRange.getDate() + 1);
            state.fullDateRange = [todayForRange, tomorrowForRange];
        } else {
            state.fullDateRange = [new Date(dates[0]), new Date(dates[dates.length - 1])];
        }
        
        if (!state.fullDateRange[0] || isNaN(state.fullDateRange[0].getTime())) {
            console.error("fullDateRange start is invalid after data processing. Dashboard initialization cannot fully proceed.");
            elements.initialMsg.innerHTML = `<p style="color: red;">Erreur: Impossible de déterminer la plage de dates à partir des données. Veuillez vérifier les fichiers.</p>`;
            elements.initialMsg.classList.remove('hidden');
            return;
        }

        const sevenDaysLater = new Date(state.fullDateRange[0]);
        sevenDaysLater.setDate(sevenDaysLater.getDate() + 6);

        state.currentStartDate = new Date(state.fullDateRange[0]);
        let potentialEndDate = new Date(sevenDaysLater > state.fullDateRange[1] ? state.fullDateRange[1] : sevenDaysLater);
        if (potentialEndDate < state.currentStartDate) {
            potentialEndDate = new Date(state.currentStartDate);
            if (potentialEndDate > state.fullDateRange[1]) potentialEndDate = new Date(state.fullDateRange[1]);
        }
        state.currentEndDate = potentialEndDate;

        state.windowDurationMs = state.currentEndDate.getTime() - state.currentStartDate.getTime();
        if (state.windowDurationMs < 0) state.windowDurationMs = 0;
        
        elements.dateStartInput.valueAsDate = state.currentStartDate;
        elements.dateEndInput.valueAsDate = state.currentEndDate;

        createToggleButtons();
        createDateSlider();
        updateDashboard(false);
    }
    
    function processCohorCSV(csvText) {
        const lines = csvText.split('\n').filter(line => line.trim() !== '');
        if (lines.length < 2) {
            console.warn("COHOR CSV is empty or has no data rows.");
            return [];
        }
        const header = lines[0].split(';').map(h => h.trim());
        const dataRows = lines.slice(1);
        const colIndices = { from: header.indexOf("From"), to: header.indexOf("To"), time: header.indexOf("Time"), ad: header.indexOf("A/D"), opsDays: header.indexOf("Ops Days"), airport: header.indexOf("Airport") };
        
        if (Object.values(colIndices).some(index => index === -1)) {
            console.error("Colonnes COHOR manquantes:", colIndices);
            return [];
        }

        let flights = [];
        dataRows.forEach(row => {
            const values = row.split(';').map(v => v.trim());
            if (values.length < Math.max(colIndices.from, colIndices.to, colIndices.time, colIndices.ad, colIndices.opsDays, colIndices.airport) + 1 || values[colIndices.airport]?.toUpperCase() !== "LYS") {
                return;
            }
            try {
                const fromDateStr = values[colIndices.from], toDateStr = values[colIndices.to];
                const timeStr = values[colIndices.time].padStart(4, '0'), opsDaysStr = values[colIndices.opsDays].padStart(7, '0');
                
                let currentDate = new Date(Date.UTC(parseInt(fromDateStr.slice(0, 4)), parseInt(fromDateStr.slice(4, 6)) - 1, parseInt(fromDateStr.slice(6, 8))));
                const finalToDate = new Date(Date.UTC( parseInt(toDateStr.slice(0, 4)), parseInt(toDateStr.slice(4, 6)) - 1, parseInt(toDateStr.slice(6, 8))));

                if (isNaN(currentDate.getTime()) || isNaN(finalToDate.getTime())) {
                    console.warn("Invalid date format in COHOR row, skipping:", row);
                    return;
                }

                while (currentDate <= finalToDate) {
                    const dayOfWeek = (currentDate.getUTCDay() + 6) % 7;
                    if (opsDaysStr[dayOfWeek] !== '0') {
                        const utcDt = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), parseInt(timeStr.slice(0, 2)), parseInt(timeStr.slice(2, 4))));
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
            } catch (e) { console.warn("Ligne COHOR ignorée (erreur pendant traitement):", row, e); }
        });
        const today = new Date(); today.setHours(0, 0, 0, 0);
        return flights.filter(f => f.date >= today);
    }
    
    function processTmaJSON(jsonText) {
        const monthMap = {"Janvier": 1,"Février": 2,"Mars": 3,"Avril": 4,"Mai": 5,"Juin": 6,"Juillet": 7,"Août": 8,"Septembre": 9,"Octobre": 10,"Novembre": 11,"Décembre": 12};
        let rawTma = [];
        try {
            rawTma = JSON.parse(jsonText);
        } catch (e) {
            console.error("Invalid TMA JSON format:", e);
            return new Map();
        }
        const tmaMap = new Map();
        if (Array.isArray(rawTma)) {
            rawTma.forEach(item => {
                if (item && item.Mois && item.Jour_Semaine && item.Créneau_Horaire && typeof item.mean !== 'undefined') {
                    const month = monthMap[item.Mois];
                    const dayType = item.Jour_Semaine;
                    const slot = item.Créneau_Horaire.split(' - ')[0].replace('h', ':');
                    tmaMap.set(`${month}-${dayType}-${slot}`, item.mean);
                } else {
                    console.warn("Invalid item in TMA JSON:", item);
                }
            });
        } else {
            console.error("TMA JSON is not an array.");
        }
        return tmaMap;
    }
    
    function combineAllData() {
        if (!state.cohorData || !state.tmaMap) {
             console.warn("Cannot combine data: COHOR or TMA data not ready.");
             state.combinedData = [];
             return;
        }
        const getDayType = (date) => DAYS_OF_WEEK[(date.getDay() + 6) % 7];
        state.combinedData = state.cohorData.map(flight => {
            const month = flight.datetime.getMonth() + 1;
            const dayType = getDayType(flight.datetime);
            const flightHourSlot = `${String(flight.datetime.getHours()).padStart(2, '0')}:00`;
            const tmaKey = `${month}-${dayType}-${flightHourSlot}`;
            const tmaValue = state.tmaMap.get(tmaKey) || 0;
            return { ...flight, tma: tmaValue };
        });
    }

    function createToggleButtons() {
        elements.dayToggles.innerHTML = DAYS_OF_WEEK.map((day, i) => `<input type="checkbox" id="day-${i}" value="${i}" checked><label for="day-${i}">${day.substring(0,3)}</label>`).join('');
        elements.trafficToggles.innerHTML = TRAFFIC_TYPES.map((type) => `<input type="checkbox" id="type-${type.key}" value="${type.key}" checked><label for="type-${type.key}">${type.label}</label>`).join('');
        document.querySelectorAll('.toggle-group input').forEach(cb => cb.addEventListener('change', () => updateDashboard(false)));
    }

    function createDateSlider() {
        const [minDate, maxDate] = state.fullDateRange;
        if (!minDate || !maxDate || isNaN(minDate.getTime()) || isNaN(maxDate.getTime())) {
            console.warn("Date range not valid for slider creation."); return;
        }
        const containerWidth = elements.dateSliderContainer.clientWidth;
        if (containerWidth === 0) return;
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
                if (isNaN(newStartDate.getTime())) return;

                let newEndDate = new Date(newStartDate.getTime() + state.windowDurationMs);
                
                if (newEndDate > maxDate) {
                    newEndDate = new Date(maxDate);
                    newStartDate = new Date(newEndDate.getTime() - state.windowDurationMs);
                }
                if (newStartDate < minDate) {
                    newStartDate = new Date(minDate);
                    newEndDate = new Date(newStartDate.getTime() + state.windowDurationMs);
                     if (newEndDate > maxDate) newEndDate = new Date(maxDate);
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
        const newStartDate = elements.dateStartInput.valueAsDate;
        const newEndDate = elements.dateEndInput.valueAsDate;

        if (newStartDate && newEndDate && newStartDate <= newEndDate) {
            state.currentStartDate = newStartDate;
            state.currentEndDate = newEndDate;
            state.windowDurationMs = state.currentEndDate.getTime() - state.currentStartDate.getTime();
            if (state.windowDurationMs < 0) state.windowDurationMs = 0;

            if (state.fullDateRange && state.fullDateRange.length === 2) {
                 if (state.currentStartDate < state.fullDateRange[0]) state.currentStartDate = new Date(state.fullDateRange[0]);
                 if (state.currentEndDate > state.fullDateRange[1]) state.currentEndDate = new Date(state.fullDateRange[1]);
                 if (state.currentStartDate > state.currentEndDate) state.currentStartDate = new Date(state.currentEndDate);
                 elements.dateStartInput.valueAsDate = state.currentStartDate;
                 elements.dateEndInput.valueAsDate = state.currentEndDate;
            }

        } else {
            console.warn("Invalid date range from inputs. Start date might be after end date.");
            elements.dateStartInput.valueAsDate = state.currentStartDate;
            elements.dateEndInput.valueAsDate = state.currentEndDate;
        }
        updateSliderHandle();
        updateDashboard(false);
    }
    
    function updateSliderHandle() {
        if (!state.fullDateRange || state.fullDateRange.length < 2 || !state.currentStartDate || isNaN(state.currentStartDate.getTime()) || elements.dateSliderContainer.clientWidth === 0) return;
        const x = d3.scaleTime().domain(state.fullDateRange).range([0, elements.dateSliderContainer.clientWidth - 40]);
        d3.select(".slider-handle").attr("cx", x(state.currentStartDate));
    }

    function updateDashboard(redrawSlider = true) {
        if (!state.cohorData || state.cohorData.length === 0 || !state.tmaMap || state.tmaMap.size === 0) {
            if (!cohorDataLoaded || !tmaDataLoaded) {
                console.log("UpdateDashboard: Waiting for COHOR and/or TMA data to be loaded.");
            } else {
                console.warn("UpdateDashboard: COHOR or TMA data is empty after loading. Cannot update dashboard.");
                if (elements.initialMsg && elements.initialMsg.classList.contains('hidden')) {
                    elements.initialMsg.innerHTML = `<p style="color: orange;">Données COHOR ou TMA manquantes ou vides. Impossible d'afficher le tableau de bord.</p>`;
                    elements.initialMsg.classList.remove('hidden');
                }
            }
            return;
        }
        if (state.combinedData.length === 0 && state.cohorData.length > 0 && state.tmaMap.size > 0) {
             combineAllData();
             if(state.combinedData.length === 0 && state.cohorData.length > 0) {
                console.warn("Combined data is empty even after COHOR and TMA are loaded. This may indicate an issue with data combination or empty COHOR source.");
             }
        }
        if (state.combinedData.length === 0) return;

        if (redrawSlider) createDateSlider();

        const activeDays = [...elements.dayToggles.querySelectorAll('input:checked')].map(cb => parseInt(cb.value));

        let filterStartDateTime = null;
        let filterEndDateTime = null;

        if (state.currentStartDate && state.currentEndDate && !isNaN(state.currentStartDate.getTime()) && !isNaN(state.currentEndDate.getTime())) {
            filterStartDateTime = new Date(state.currentStartDate);
            filterStartDateTime.setHours(6, 0, 0, 0);
            filterEndDateTime = new Date(state.currentEndDate);
            filterEndDateTime.setDate(filterEndDateTime.getDate() + 1);
            filterEndDateTime.setHours(6, 0, 0, 0);
        } else {
            console.warn("Current start/end date is not valid for filtering.");
            return;
        }

        const filtered = state.combinedData.filter(d => {
            const dayOfWeek = (d.datetime.getDay() + 6) % 7;
            let includeByDate = true;
            if (filterStartDateTime && filterEndDateTime) {
                includeByDate = d.datetime >= filterStartDateTime && d.datetime < filterEndDateTime;
            }
            return includeByDate && activeDays.includes(dayOfWeek);
        });
        
        const hasCapacityCalculator = state.capacityCalculatorInstance !== null;

        if (hasCapacityCalculator && state.isStacked) {
            elements.capacityControlsCard.classList.remove('hidden');
        } else {
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
                slot.isArrival += d.isArrival;
                slot.isDeparture += d.isDeparture;
                const tmaUniqueKeyForSlot = `${d.date.toDateString()}-${d.timeSlot}`;
                if (d.tma > 0 && !tmaTracker.has(tmaUniqueKeyForSlot)) {
                    slot.tma += d.tma;
                    tmaTracker.add(tmaUniqueKeyForSlot);
                }
            }
        });
        
        const rollingData = new Map();
        const sortedSlots = Array.from(slotData.keys()).sort();
        for(let i = 0; i < sortedSlots.length; i++) {
            let sums = { isArrival: 0, isDeparture: 0, tma: 0 };
            for (let j = i; j < Math.min(i + 4, sortedSlots.length); j++) {
                const slotInfo = slotData.get(sortedSlots[j]);
                sums.isArrival += slotInfo.isArrival;
                sums.isDeparture += slotInfo.isDeparture;
                sums.tma += slotInfo.tma;
            }
            rollingData.set(sortedSlots[i], {
                isArrival: sums.isArrival / numDays,
                isDeparture: sums.isDeparture / numDays,
                tma: sums.tma / numDays,
            });
        }
        
        const nivoBarData = sortedSlots.map(slot => ({
            "slot": slot,
            "Arrivées": parseFloat((rollingData.get(slot)?.isArrival || 0).toFixed(1)),
            "Départs": parseFloat((rollingData.get(slot)?.isDeparture || 0).toFixed(1)),
            "TMA": parseFloat((rollingData.get(slot)?.tma || 0).toFixed(1))
        }));

        let nivoLineData = [];
        let activeCapacity = false;
        const selectedPeriodKey = elements.periodSelect.value;

        if (state.capacityCalculatorInstance && state.currentStartDate && !isNaN(state.currentStartDate.getTime()) && state.isStacked) {
            const sivHypothesis = elements.sivSelect.value;
            
            const capacityResult = state.capacityCalculatorInstance.calculateDailyCapacity(
                state.currentStartDate,
                null,
                sivHypothesis,
                selectedPeriodKey
            );
            updateCapacityAgentMinMaxStats(capacityResult);

            if (capacityResult && capacityResult.capacities) {
                const capacityPoints = capacityResult.capacities.map((value, index) => ({
                    x: sortedSlots[index],
                    y: parseFloat(value.toFixed(1))
                }));
                nivoLineData = [{
                    id: `Capacité (${selectedPeriodKey})`,
                    data: capacityPoints
                }];
                activeCapacity = true;
            }
        } else {
            updateCapacityAgentMinMaxStats(null);
            if (elements.capacityControlsCard) {
                elements.capacityControlsCard.classList.add('hidden');
            }
        }

        const activeTrafficKeys = TRAFFIC_TYPES
            .filter(type => {
                const toggle = elements.trafficToggles.querySelector(`input[value="${type.key}"]`);
                return toggle ? toggle.checked : false;
            })
            .map(type => type.label);

        renderNivoChart(nivoBarData, activeTrafficKeys, nivoLineData, activeCapacity, state.isStacked);
    }

    function renderNivoChart(barData, barKeys, lineData, isCapacityActive, isStackedView) {
        if (!elements.nivoChartContainer || typeof ReactDOM === 'undefined' || typeof React === 'undefined' || typeof NivoBar === 'undefined' || (isCapacityActive && lineData.length > 0 && typeof NivoLine === 'undefined')) {
            console.error("Nivo chart container or essential Nivo/React libraries not found/loaded.");
            if(elements.nivoChartContainer) elements.nivoChartContainer.innerHTML = '<p style="color:red;">Erreur: Bibliothèques de graphiques non chargées.</p>';
            return;
        }

        const nivoContainer = elements.nivoChartContainer;
        ReactDOM.unmountComponentAtNode(nivoContainer);
        nivoContainer.innerHTML = '';

        const chartContainerStyle = getComputedStyle(nivoContainer);
        const chartHeight = parseInt(chartContainerStyle.height) || 650;

        const singleChartHeight = chartHeight - 20;
        const splitChartHeight = Math.floor(chartHeight / 2) - 10;


        const theme = {
            textColor: 'var(--text-primary)',
            fontSize: 11,
            axis: {
                domain: { line: { stroke: 'var(--border)', strokeWidth: 1 } },
                ticks: { line: { stroke: 'var(--border)', strokeWidth: 1 }, text: { fill: 'var(--text-secondary)', fontSize: 10 } },
                legend: { text: { fill: 'var(--text-primary)', fontSize: 12, fontWeight: 500 } }
            },
            grid: { line: { stroke: 'var(--border)', strokeWidth: 0.5, strokeDasharray: '4 4' } },
            legends: {
                text: { fill: 'var(--text-primary)', fontSize: 11 }
            },
            tooltip: {
                container: {
                    background: 'var(--card-background)',
                    color: 'var(--text-primary)',
                    fontSize: '12px',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                },
            },
            labels: { text: { fill: 'var(--text-primary)' } },
        };

        const commonMargin = { top: 30, right: 100, bottom: 50, left: 50 };

        const barChartProps = {
            data: barData,
            keys: barKeys,
            indexBy: "slot",
            groupMode: isStackedView ? 'stacked' : 'grouped',
            margin: commonMargin,
            padding: 0.2,
            innerPadding: isStackedView ? 0 : 2,
            valueScale: { type: 'linear' },
            indexScale: { type: 'band', round: true },
            colors: ({ id, data }) => {
                const trafficType = TRAFFIC_TYPES.find(t => t.label === id);
                return trafficType ? trafficType.color : '#ccc';
            },
            borderColor: { from: 'color', modifiers: [ [ 'darker', 0.6 ] ] },
            axisBottom: {
                tickSize: 5, tickPadding: 5, tickRotation: -45,
                legend: (isCapacityActive && lineData.length > 0 && isStackedView) ? '' : 'Créneau Horaire',
                legendPosition: 'middle', legendOffset: 40,
                format: v => (parseInt(v.split(':')[1]) % 30 === 0 ? v : '')
            },
            axisLeft: {
                tickSize: 5, tickPadding: 5, tickRotation: 0,
                legend: 'Moy. Vols / Créneau', legendPosition: 'middle', legendOffset: -40
            },
            enableGridX: false,
            enableGridY: true,
            labelSkipWidth: 12,
            labelSkipHeight: 12,
            labelTextColor: { from: 'color', modifiers: [ [ 'darker', 2 ] ] },
            legends: barKeys.length > 0 ? [
                {
                    dataFrom: 'keys', anchor: 'top-right', direction: 'column',
                    itemWidth: 80, itemHeight: 18, itemsSpacing: 2,
                    symbolSize: 10, itemDirection: 'left-to-right',
                    translateX: 95, translateY: -25,
                }
            ] : [],
            theme: theme,
            animate: true,
            motionConfig: "gentle",
            tooltip: ({ id, value, indexValue, color }) => (
                React.createElement('div', {
                    style: {
                        padding: '3px 6px',
                        background: 'var(--card-background)',
                        border: `1px solid ${color}`,
                        color: 'var(--text-primary)',
                        borderRadius: '3px'
                    }
                }, `${id}: ${value} à ${indexValue}`)
            )
        };

        if (isCapacityActive && lineData.length > 0 && NivoLine) {
            const barDiv = document.createElement('div');
            barDiv.style.height = `${splitChartHeight}px`;
            barDiv.style.width = '100%';
            nivoContainer.appendChild(barDiv);
            ReactDOM.render(React.createElement(NivoBar.ResponsiveBar, barChartProps), barDiv);

            const lineDiv = document.createElement('div');
            lineDiv.style.height = `${splitChartHeight}px`;
            lineDiv.style.width = '100%';
            nivoContainer.appendChild(lineDiv);

            const lineChartProps = {
                data: lineData,
                margin: commonMargin,
                xScale: { type: 'point' },
                yScale: { type: 'linear', min: 0, max: 'auto', stacked: false, reverse: false },
                colors: ['var(--accent-orange)'],
                lineWidth: 2,
                enableArea: true,
                areaOpacity: 0.15,
                pointSize: 0,
                useMesh: true,
                axisBottom: {
                    tickSize: 5, tickPadding: 5, tickRotation: -45,
                    legend: 'Créneau Horaire', legendPosition: 'middle', legendOffset: 40,
                    format: v => (parseInt(v.split(':')[1]) % 30 === 0 ? v : '')
                },
                axisLeft: {
                    tickSize: 5, tickPadding: 5, tickRotation: 0,
                    legend: 'Capacité', legendPosition: 'middle', legendOffset: -40
                },
                enableGridX: false,
                enableGridY: true,
                theme: theme,
                animate: true,
                motionConfig: "gentle",
                tooltip: ({ point }) => (
                     React.createElement('div', {
                        style: {
                            padding: '3px 6px',
                            background: 'var(--card-background)',
                            border: `1px solid ${point.serieColor}`,
                            color: 'var(--text-primary)',
                            borderRadius: '3px'
                        }
                    }, `${point.serieId}: ${point.data.yFormatted} à ${point.data.xFormatted}`)
                ),
            };
            ReactDOM.render(React.createElement(NivoLine.ResponsiveLine, lineChartProps), lineDiv);

        } else {
            const barDiv = document.createElement('div');
            barDiv.style.height = `${singleChartHeight}px`;
            barDiv.style.width = '100%';
            nivoContainer.appendChild(barDiv);
            ReactDOM.render(React.createElement(NivoBar.ResponsiveBar, barChartProps), barDiv);
        }
    }

    function updateSummaryCards(data) {
        const numDays = new Set(data.map(d => d.date.toDateString())).size || 1;
        const totals = data.reduce((acc, d) => {
            acc.isArrival += d.isArrival;
            acc.isDeparture += d.isDeparture;
            return acc;
        }, { isArrival: 0, isDeparture: 0 });

        let totalTmaForAvg = 0;
        const hourlyTmaTracker = new Set();
        data.forEach(d => {
            if (d.tma > 0) {
                const dateHourKey = `${d.date.toDateString()}-${d.datetime.getHours()}:00`;
                if (!hourlyTmaTracker.has(dateHourKey)) {
                    totalTmaForAvg += d.tma;
                    hourlyTmaTracker.add(dateHourKey);
                }
            }
        });

        const getAvg = (value) => (value / numDays).toFixed(1);

        elements.avgDep.textContent = getAvg(totals.isDeparture);
        elements.avgArr.textContent = getAvg(totals.isArrival);
        elements.avgTma.textContent = getAvg(totalTmaForAvg);
        elements.avgTotal.textContent = (
            parseFloat(elements.avgDep.textContent) +
            parseFloat(elements.avgArr.textContent) +
            parseFloat(elements.avgTma.textContent)
        ).toFixed(1);

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

        if (minItem && maxItem) {
             return `${minVal.toFixed(0)} (${minItem.date.toLocaleDateString()} ${minItem.slot}) / ${maxVal.toFixed(0)} (${maxItem.date.toLocaleDateString()} ${maxItem.slot})`;
        } else if (maxItem) {
             return `0 / ${maxVal.toFixed(0)} (${maxItem.date.toLocaleDateString()} ${maxItem.slot})`;
        } else if (minItem) {
             return `${minVal.toFixed(0)} (${minItem.date.toLocaleDateString()} ${minItem.slot}) / 0`;
        }
        return "N/A";
    };

    if (elements.depMinMaxDate) elements.depMinMaxDate.textContent = findMinMaxText('dep');
    if (elements.arrMinMaxDate) elements.arrMinMaxDate.textContent = findMinMaxText('arr');
    if (elements.tmaMinMaxDate) elements.tmaMinMaxDate.textContent = findMinMaxText('tma');
}

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

        if (minSlot === "" && maxSlot === "" && arr.length > 0) {
            minVal = arr[0]; maxVal = arr[0]; minSlot = arrSlots[0]; maxSlot = arrSlots[0];
        } else if (minSlot === "" && maxSlot === "") {
             return "N/A";
        }

        const refDateStr = state.currentStartDate && !isNaN(state.currentStartDate.getTime()) ? state.currentStartDate.toLocaleDateString() : "N/A";
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
                const totals = daysOfType.reduce((acc, d) => { acc.isDeparture += d.isDeparture; acc.isArrival += d.isArrival; return acc; }, { isDeparture: 0, isArrival: 0 });

                let dayTotalTma = 0;
                const dayHourlyTmaTracker = new Set();
                daysOfType.forEach(d => {
                    if (d.tma > 0) {
                        const dateHourKey = `${d.date.toDateString()}-${d.datetime.getHours()}:00`;
                        if (!dayHourlyTmaTracker.has(dateHourKey)) {
                            dayTotalTma += d.tma;
                            dayHourlyTmaTracker.add(dateHourKey);
                        }
                    }
                });

                dailyAggregates.set(i, {
                    'Départs': totals.isDeparture / numDaysOfType,
                    'Arrivées': totals.isArrival / numDaysOfType,
                    'TMA': dayTotalTma / numDaysOfType,
                    'Total': (totals.isDeparture + totals.isArrival + dayTotalTma) / numDaysOfType
                });
            }
        }
        
        const maxValues = {};
        const metrics = ['Départs', 'Arrivées', 'TMA', 'Total'];
        metrics.forEach(metric => {
            const values = activeDays.map(dayIndex => dailyAggregates.get(dayIndex)?.[metric] || 0);
            maxValues[metric] = d3.max(values) || 0;
        });
        
        const allValues = [...dailyAggregates.values()].flatMap(day => Object.values(day));
        const colorScale = d3.scaleLinear().domain([0, d3.max(allValues) || 1])
            .range(['rgba(36, 40, 59, 0.1)', 'rgba(255, 158, 100, 0.6)']);

        elements.summaryTableHead.innerHTML = `<tr><th></th>${activeDays.map(i => `<th>${DAYS_OF_WEEK[i]}</th>`).join('')}</tr>`;
        elements.summaryTableBody.innerHTML = '';
        
        metrics.forEach(metric => {
            let rowHtml = `<tr><td>${metric}</td>`;
            activeDays.forEach(dayIndex => {
                const dayData = dailyAggregates.get(dayIndex);
                const value = dayData && dayData[metric] !== undefined ? dayData[metric] : 0;
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
