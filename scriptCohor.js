/**
 * AIGLON FUTÉ - Module COHOR
 * Logique spécifique aux données COHOR et TMA
 * Traitement des fichiers CSV COHOR et JSON TMA
 */

window.AiglonCohor = (function() {
    'use strict';

    // Get references to core components
    const core = window.AiglonCore;
    const elements = core.getElements();
    const state = core.getState();
    const capacityCalculator = core.getCapacityCalculator();

    // --- Constants spécifiques COHOR ---
    const TRAFFIC_TYPES = [
        { key: "isArrival", label: "Arrivées", color: 'rgba(158, 206, 106, 0.8)' },
        { key: "isDeparture", label: "Départs", color: 'rgba(247, 118, 142, 0.8)' },
        { key: "tma", label: "TMA", color: 'rgba(122, 162, 247, 0.8)' }
    ];

    // --- Event Listeners Setup ---
    function setupCohorEventListeners() {
        elements.csvFile.addEventListener('change', handleCohorFile);
        elements.jsonFile.addEventListener('change', handleTmaFile);
        
        // Create traffic type toggles for COHOR
        elements.trafficToggles.innerHTML = TRAFFIC_TYPES.map((type) => 
            `<input type="checkbox" id="type-${type.key}" value="${type.key}" checked><label for="type-${type.key}">${type.label}</label>`
        ).join('');
        
        // Add event listeners to traffic toggles
        document.querySelectorAll('#trafficTypeToggles input').forEach(cb => 
            cb.addEventListener('change', () => core.updateDashboard())
        );
    }

    // --- File Handling ---
    function handleCohorFile(event) {
        console.log("handleCohorFile called");
        const file = event.target.files[0];
        if (!file) return;

        // Clear Predict NM data and UI
        core.setState('predictNMData', new Map());
        elements.predictNMName.textContent = 'Aucun fichier';
        elements.predictNMSummaryCard.classList.add('hidden');
        elements.predictNMTableCard.classList.add('hidden');

        // Clear TMA data and UI when new COHOR is loaded
        core.setState('tmaMap', new Map());
        elements.jsonName.textContent = 'Aucun fichier';

        elements.csvName.textContent = file.name;
        core.setState('activeDataSource', 'cohor');

        const reader = new FileReader();
        reader.onload = (e) => {
            const cohorData = processCohorCSV(e.target.result);
            core.setState('cohorData', cohorData);
            if (cohorData.length > 0) {
                initializeApplication('cohor');
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

        if (core.getState('activeDataSource') !== 'cohor') {
            alert("Veuillez charger un fichier COHOR avant de charger un fichier TMA.");
            return;
        }

        elements.jsonName.textContent = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
            const tmaMap = processTmaJSON(e.target.result);
            core.setState('tmaMap', tmaMap);
            combineAllData();
            core.updateDashboard();
        };
        reader.readAsText(file, 'UTF-8');
    }

    // --- Data Processing ---
    function processCohorCSV(csvText) {
        const lines = csvText.split('\n').filter(line => line.trim() !== '');
        const header = lines[0].split(';').map(h => h.trim());
        const dataRows = lines.slice(1);
        const colIndices = { 
            from: header.indexOf("From"), to: header.indexOf("To"), time: header.indexOf("Time"), 
            ad: header.indexOf("A/D"), opsDays: header.indexOf("Ops Days"), airport: header.indexOf("Airport") 
        };
        
        if (Object.values(colIndices).some(index => index === -1)) {
            alert("Une ou plusieurs colonnes requises sont manquantes dans le fichier COHOR.");
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
                        const adjustedDt = new Date(utcDt.getTime() + offsetMinutes * 60 * 1000);
                        const makeSlotUTC = (date) => `${String(date.getUTCHours()).padStart(2, '0')}:${String(Math.floor(date.getUTCMinutes() / 15) * 15).padStart(2, '0')}`;
                        
                        flights.push({ 
                            date: new Date(Date.UTC(adjustedDt.getUTCFullYear(), adjustedDt.getUTCMonth(), adjustedDt.getUTCDate())),
                            datetime: adjustedDt,
                            timeSlot: makeSlotUTC(adjustedDt),
                            isArrival: values[colIndices.ad] === 'A' ? 1 : 0, 
                            isDeparture: values[colIndices.ad] === 'D' ? 1 : 0 
                        });
                    }
                    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
                }
            } catch (e) { console.warn("Ligne COHOR ignorée:", row, e); }
        });
        
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
        const getDayType = (date) => core.DAYS_OF_WEEK[(date.getUTCDay() + 6) % 7];
        const cohorData = core.getState('cohorData');
        const tmaMap = core.getState('tmaMap');
        
        const combinedData = cohorData.map(flight => {
            const month = flight.datetime.getUTCMonth() + 1;
            const dayType = getDayType(flight.datetime);
            const [hours, minutes] = flight.timeSlot.split(':').map(Number);
            const hourlySlot = `${String(hours).padStart(2, '0')}:00`;
            const tmaKey = `${month}-${dayType}-${hourlySlot}`;
            const tmaHourlyValue = tmaMap.get(tmaKey) || 0;
            const tmaValue = tmaHourlyValue / 4;
            return { ...flight, tma: tmaValue };
        });
        core.setState('combinedData', combinedData);
    }

    // --- Application Initialization ---
    function initializeApplication(source) {
        elements.initialMsg.classList.add('hidden');
        elements.dashboard.classList.remove('hidden');
        [elements.dateStartInput, elements.dateEndInput].forEach(el => el.disabled = false);

        let initialDate;
        if (source === 'cohor' && core.getState('cohorData').length > 0) {
            combineAllData();
            const dates = [...new Set(core.getState('combinedData').map(d => d.date.getTime()))].sort();
            const fullDateRange = [new Date(dates[0]), new Date(dates[dates.length - 1])];
            core.setState('fullDateRange', fullDateRange);
            initialDate = fullDateRange[0];
        } else {
            const now = new Date();
            const parisTimezone = 'Europe/Paris';
            const parisDateFormatter = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: parisTimezone });
            const todayParisFormatted = parisDateFormatter.format(now);
            const todayLocalParisForInternal = new Date(todayParisFormatted + 'T00:00:00');
            initialDate = new Date(Date.UTC(todayLocalParisForInternal.getFullYear(), todayLocalParisForInternal.getMonth(), todayLocalParisForInternal.getDate()));
            core.setState('fullDateRange', [initialDate, initialDate]);
        }

        core.setState('currentStartDate', initialDate);
        core.setState('currentEndDate', initialDate);
        core.setState('windowDurationMs', 0);

        const parisDateFormatter = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Europe/Paris' });
        elements.dateStartInput.value = parisDateFormatter.format(core.getState('currentStartDate'));
        elements.dateEndInput.value = parisDateFormatter.format(core.getState('currentEndDate'));

        const { periodCode, dayType } = capacityCalculator.getPeriodAndDayType(core.getState('currentStartDate'));
        const todayGridKey = `${dayType}${periodCode}`;
        const optionExists = Array.from(elements.periodSelect.options).some(option => option.value === todayGridKey);
        
        if (optionExists) {
            elements.periodSelect.value = todayGridKey;
            core.setState('selectedGrid', todayGridKey);
            core.handleGridSelection();
        } else {
            console.warn(`No grid option found for today's date: ${todayGridKey}.`);
            elements.periodSelect.value = "";
            core.setState('selectedGrid', null);
            core.handleGridSelection();
        }

        core.updateChartTypeButtons();
        core.updateTimezoneButtons();
        core.updateDashboard(false);
    }

    // --- Dashboard Update Logic ---
    function updateDashboard(options = {}) {
        const { redrawSlider = true } = options;
        
        let dataToFilter = [];
        let numDays = 1;
        let activeDays = [];

        if (core.getState('activeDataSource') === 'cohor' && core.getState('cohorData').length > 0) {
            activeDays = [...elements.dayToggles.querySelectorAll('input:checked')].map(cb => parseInt(cb.value));
            dataToFilter = core.getState('combinedData').filter(d => {
                const dayOfWeek = (d.datetime.getUTCDay() + 6) % 7;
                return d.date >= core.getState('currentStartDate') &&
                       d.date <= core.getState('currentEndDate') &&
                       activeDays.includes(dayOfWeek);
            });
            const uniqueDays = new Set(dataToFilter.map(d => d.date.toISOString().slice(0, 10))).size;
            numDays = uniqueDays || 1;
            
            // Réafficher les blocs statistiques en vue COHOR
            const statsGrid = document.querySelector('.stats-grid');
            if (statsGrid) statsGrid.classList.remove('hidden');
            
            elements.predictNMSummaryCard.classList.add('hidden');
            elements.predictNMTableCard.classList.add('hidden');
            elements.capacityControlsCard.classList.remove('hidden');
            elements.toggleSideBySideBtn.style.display = 'inline-block';
        } else {
            return; // Don't do anything if not cohor
        }

        updateSummaryCards(dataToFilter, numDays);
        updateMainChart(dataToFilter, numDays);
        updateSynthesisContent(dataToFilter, activeDays, numDays);
    }

    // --- Summary Cards & Table ---
    function updateSummaryCards(data, numDays) {
        const totals = data.reduce((acc, d) => { 
            acc.isArrival += d.isArrival; 
            acc.isDeparture += d.isDeparture; 
            return acc; 
        }, { isArrival: 0, isDeparture: 0 });
        
        // Calcul TMA corrigé : utiliser directement les valeurs d.tma déjà divisées par 4
        let totalTmaValue = 0;
        const processedSlots = new Set(); // Éviter les doublons pour les créneaux identiques
        
        data.forEach(d => {
            if (d.tma > 0) {
                const uniqueKey = `${d.date.toISOString().slice(0, 10)}-${d.timeSlot}`;
                if (!processedSlots.has(uniqueKey)) {
                    totalTmaValue += d.tma;
                    processedSlots.add(uniqueKey);
                }
            }
        });

        const avgTMA = totalTmaValue / numDays;

        elements.avgDep.textContent = (totals.isDeparture / numDays).toFixed(1);
        elements.avgArr.textContent = (totals.isArrival / numDays).toFixed(1);
        elements.avgTma.textContent = avgTMA.toFixed(1);
        elements.avgTotal.textContent = ((totals.isDeparture + totals.isArrival) / numDays + avgTMA).toFixed(1);
    }

    function updateSummaryTable(data, activeDays, numDays) {
        const summaryTableHead = document.querySelector('#summaryTable thead');
        const summaryTableBody = document.querySelector('#summaryTable tbody');
        if(!summaryTableHead || !summaryTableBody) return;

        const dailyAggregates = new Map();
        for (let i = 0; i < 7; i++) {
            if (activeDays.includes(i)) {
                const daysOfType = data.filter(d => (d.datetime.getUTCDay() + 6) % 7 === i);
                const numDaysOfType = new Set(daysOfType.map(d => d.date.toISOString().slice(0, 10))).size || 1;
                
                const totals = daysOfType.reduce((acc, d) => { 
                    acc.isDeparture += d.isDeparture; 
                    acc.isArrival += d.isArrival; 
                    return acc; 
                }, { isDeparture: 0, isArrival: 0 });
                
                // Calcul TMA corrigé pour le tableau de synthèse
                let totalTmaForDayType = 0;
                const processedSlotsForDayType = new Set();
                
                daysOfType.forEach(d => {
                    if (d.tma > 0) {
                        const uniqueKey = `${d.date.toISOString().slice(0, 10)}-${d.timeSlot}`;
                        if (!processedSlotsForDayType.has(uniqueKey)) {
                            totalTmaForDayType += d.tma;
                            processedSlotsForDayType.add(uniqueKey);
                        }
                    }
                });

                const tmaAvg = totalTmaForDayType / numDaysOfType;
                dailyAggregates.set(i, { 
                    'Départs': totals.isDeparture / numDaysOfType, 
                    'Arrivées': totals.isArrival / numDaysOfType, 
                    'TMA': tmaAvg,
                    'Total': ((totals.isDeparture + totals.isArrival) / numDaysOfType) + tmaAvg
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

        summaryTableHead.innerHTML = `<tr><th>Métrique</th>${activeDays.map(i => `<th>${core.DAYS_OF_WEEK[i]}</th>`).join('')}</tr>`;
        summaryTableBody.innerHTML = '';
        
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
            summaryTableBody.insertAdjacentHTML('beforeend', rowHtml);
        });
    }

    // --- Main Chart ---
    function updateMainChart(filteredData, numDays) {
        elements.chartTitle.textContent = `Trafic moyen par créneau horaire (Nombre de jours: ${numDays})`;

        let datasets = [];
        let labels = [];

        labels = []; 
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
            for (let j = 0; j < 4; j++) { 
                const index = (i+j) % labels.length;
                const slotInfo = slotData.get(labels[index]);
                if(slotInfo){
                     sums.isArrival += slotInfo.isArrival;
                     sums.isDeparture += slotInfo.isDeparture;
                     sums.tma += slotInfo.tma;
                }
            }
            rollingData.set(labels[i], {
                isArrival: sums.isArrival / numDays,
                isDeparture: sums.isDeparture / numDays,
                tma: sums.tma / numDays,
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
                stack: core.getState('isStacked') ? 'cohorTMA' : type.key
            };
        });

        if (core.getState('isStacked') && Object.keys(core.getState('grilleVacations')).length > 0) {
            let gridToUse = core.getState('selectedGrid') || 'SemCha';
            let customSelection = core.getState('customAgentSelection');
            const sivHypothesis = elements.sivSelect.value;
            const capacityResult = capacityCalculator.calculateCapacityWithSpecificGrid(
                gridToUse, customSelection, sivHypothesis, core.getState('currentStartDate')
            );
            
            datasets.push({
                label: 'Capacité', data: capacityResult.capacities,
                backgroundColor: 'rgba(255, 158, 100, 0.2)', borderColor: 'rgba(255, 158, 100, 0.8)',
                type: 'line', fill: true, pointRadius: 0, stepped: 'middle', order: -1,
                hidden: !core.getState('isStacked')
            });
        }

        const trafficChart = core.getState('trafficChart');
        if (trafficChart) trafficChart.destroy();
        
        setTimeout(() => {
            const newTrafficChart = new Chart(elements.chartCanvas, {
                 type: 'bar', data: { labels: labels, datasets },
                 options: {
                     responsive: true, maintainAspectRatio: false, animation: { duration: 500 },
                     plugins: {
                        legend: { labels: { color: 'var(--text-primary)' } },
                         tooltip: {
                             enabled: true, mode: 'index', titleAlign: 'center', bodyAlign: 'center', footerAlign: 'center',
                             callbacks: {
                                 title: function(context) {
                                     const label = context[0].label;
                                     const [h, m] = label.split(':').map(Number);
                                     const utcDate = new Date(Date.UTC(2000, 0, 1, h, m));
                                     const utcEndDate = new Date(utcDate.getTime() + 59 * 60 * 1000);
                                     const useUTC = core.getState('useUTC');
                                     const formatTime = (dateObj, useUTC) => {
                                         if (useUTC) {
                                             return `${String(dateObj.getUTCHours()).padStart(2, '0')}:${String(dateObj.getUTCMinutes()).padStart(2, '0')}`;
                                         } else {
                                             const offset = capacityCalculator.getDSTOffset(dateObj);
                                             const localDate = new Date(dateObj.getTime() + offset * 3600 * 1000);
                                             return `${String(localDate.getHours()).padStart(2, '0')}:${String(localDate.getMinutes()).padStart(2, '0')}`;
                                         }
                                     };
                                     return `Créneau ${formatTime(utcDate, useUTC)} - ${formatTime(utcEndDate, useUTC)} (${useUTC ? 'UTC' : 'Local'})`;
                                 },
                                 label: function(context) {
                                     let labelText = context.dataset.label || '';
                                     return ` ${labelText}: ${context.parsed.y.toFixed(1)}`;
                                 },
                                 footer: function(context) {
                                     let totalTrafic = context.reduce((sum, item) => item.dataset.type === 'bar' && !item.dataset.hidden ? sum + item.parsed.y : sum, 0);
                                     return `\nTrafic total: ${totalTrafic.toFixed(1)}`;
                                 }
                             }
                         }
                     },
                     scales: {
                         x: { 
                             stacked: core.getState('isStacked'), 
                             ticks: { 
                                 color: 'var(--text-secondary)',
                                 callback: function(value, index, ticks) {
                                     const slot = this.getLabelForValue(value);
                                     const [h, m] = slot.split(':').map(Number);
                                     const utcDate = new Date(Date.UTC(2000, 0, 1, h, m));
                                     const useUTC = core.getState('useUTC');
                                     if (useUTC) {
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
                         y: { stacked: core.getState('isStacked'), beginAtZero: true, ticks: { color: 'var(--text-secondary)' }, grid: { color: 'rgba(161, 170, 184, 0.2)' } }
                     }
                 }
            });
            core.setState('trafficChart', newTrafficChart);
        }, 0);
    }
    
    function updateSynthesisContent(data, activeDays, numDays){
        const synthesisContent = elements.synthesisContent;
        synthesisContent.innerHTML = '';
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
    }

    // --- Public API ---
    return {
        init: function() {
            console.log("AiglonCohor Initialized");
            setupCohorEventListeners();
            core.on('dashboard:update', (options) => {
                if (core.getState('activeDataSource') === 'cohor') {
                    updateDashboard(options);
                }
            });
        }
    };
})();

// Initialize Module when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if(window.AiglonCore) {
        AiglonCohor.init();
    }
});