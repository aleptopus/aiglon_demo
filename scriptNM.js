/**
 * AIGLON FUTÉ - Module Predict NM
 * Logique spécifique aux données Predict NM
 * Traitement des fichiers TXT Predict NM et visualisation
 */

window.AiglonNM = (function() {
    'use strict';

    // Get references to core components
    const core = window.AiglonCore;
    const elements = core.getElements();
    const state = core.getState();

    // --- Constants spécifiques Predict NM ---
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

    // --- Event Listeners Setup ---
    function setupNMEventListeners() {
        elements.predictNMFile.addEventListener('change', handlePredictNMFiles);
        elements.togglePredictNMTableBtn.addEventListener('click', togglePredictNMTableVisibility);
        
        // Ajouter les event listeners pour les filtres par colonne
        setupColumnFilters();
    }
    
    function setupColumnFilters() {
        const filterIds = ['timeRangeFilter', 'arcidFilter', 'atypFilter', 'adepFilter', 'adesFilter'];
        filterIds.forEach(filterId => {
            const filterElement = document.getElementById(filterId);
            if (filterElement) {
                filterElement.addEventListener('input', updatePredictNMTable);
            }
        });
    }

    // --- File Handling ---
    function handlePredictNMFiles(event) {
        console.log("handlePredictNMFiles called");
        const files = event.target.files;
        if (files.length === 0) return;

        // Clear COHOR data and UI
        core.setState('cohorData', []);
        core.setState('tmaMap', new Map());
        elements.csvName.textContent = 'Aucun fichier';
        elements.jsonName.textContent = 'Aucun fichier';

        elements.predictNMName.textContent = `${files.length} fichier(s) chargé(s)`;
        core.setState('activeDataSource', 'predictNM');

        let filesProcessed = 0;
        const predictNMData = new Map();
        for (const file of files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = processPredictNMFile(e.target.result);
                if (result) {
                    predictNMData.set(result.metadata.FDATE, result);
                }
                filesProcessed++;
                if (filesProcessed === files.length) {
                    core.setState('predictNMData', predictNMData);
                    initializeApplication('predictNM');
                }
            };
            reader.readAsText(file, 'UTF-8');
        }
    }

    // --- Data Processing ---
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

            const isArrival = ades === 'LFLL' || ades === 'LFLY' || ades === 'LFLS' || ades === 'LFLB' || ades === 'LFLP';
            const isDeparture = adep === 'LFLL' || adep === 'LFLY' || adep === 'LFLS' || adep === 'LFLB' || adep === 'LFLP';

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

    // --- Visualization ---
    function updatePredictNMSummary() {
        let summaryHtml = '';
        const predictNMData = core.getState('predictNMData');
        if (predictNMData.size === 0) {
            summaryHtml = '<p>Aucun fichier Predict NM chargé.</p>';
        } else {
            summaryHtml += '<ul>';
            predictNMData.forEach((data, date) => {
                const impDate = new Date(data.metadata.IMPDATE);
                const formattedImpDate = impDate.toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });
                summaryHtml += `<li>**Journée ${data.metadata.FDATE}** : ${data.metadata.NBVOLS} vols (importé le ${formattedImpDate})</li>`;
            });
            summaryHtml += '</ul>';
        }
        elements.predictNMSummaryContent.innerHTML = summaryHtml;
    }

    function updatePredictNMTable() {
        let flightsForSelectedDates = [];
        const currentStartDate = core.getState('currentStartDate');
        const currentEndDate = core.getState('currentEndDate');
        const predictNMData = core.getState('predictNMData');

        predictNMData.forEach((dayData, fdateString) => {
            const fdate = new Date(fdateString + 'T00:00:00Z');
            if (fdate >= currentStartDate && fdate <= currentEndDate) {
                flightsForSelectedDates.push(...dayData.flights);
            }
        });

        flightsForSelectedDates.sort((a, b) => {
            const timeA = a.entry.split(':').map(Number);
            const timeB = b.entry.split(':').map(Number);
            if (timeA[0] !== timeB[0]) return timeA[0] - timeB[0];
            return timeA[1] - timeB[1];
        });

        // Récupérer les valeurs des filtres par colonne
        const timeRangeFilter = document.getElementById('timeRangeFilter')?.value.toLowerCase() || '';
        const arcidFilter = document.getElementById('arcidFilter')?.value.toLowerCase() || '';
        const atypFilter = document.getElementById('atypFilter')?.value.toLowerCase() || '';
        const adepFilter = document.getElementById('adepFilter')?.value.toLowerCase() || '';
        const adesFilter = document.getElementById('adesFilter')?.value.toLowerCase() || '';

        const filteredFlights = flightsForSelectedDates.filter(flight => {
            // Filtre par plage horaire
            if (timeRangeFilter && !matchesTimeRange(flight.entry, timeRangeFilter)) {
                return false;
            }
            
            // Filtres par colonne
            if (arcidFilter && (!flight.arcid || !flight.arcid.toLowerCase().includes(arcidFilter))) {
                return false;
            }
            if (atypFilter && (!flight.atyp || !flight.atyp.toLowerCase().includes(atypFilter))) {
                return false;
            }
            if (adepFilter && (!flight.adep || !flight.adep.toLowerCase().includes(adepFilter))) {
                return false;
            }
            if (adesFilter && (!flight.ades || !flight.ades.toLowerCase().includes(adesFilter))) {
                return false;
            }
            
            return true;
        });

        let tableHtml = '';
        if (filteredFlights.length === 0) {
            tableHtml = '<tr><td colspan="5">Aucun vol trouvé ou correspondant aux filtres.</td></tr>';
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
    
    // Fonction pour vérifier si une heure correspond à une plage horaire
    function matchesTimeRange(flightTime, timeRangeFilter) {
        if (!timeRangeFilter) return true;
        
        // Formats acceptés : "12h00-13h00", "12h-13h", "12:00-13:00"
        const timeRangeRegex = /^(\d{1,2})(?:h|:)(\d{0,2})\s*-\s*(\d{1,2})(?:h|:)(\d{0,2})$/i;
        const match = timeRangeFilter.match(timeRangeRegex);
        
        if (!match) return true; // Si le format n'est pas reconnu, ne pas filtrer
        
        const startHour = parseInt(match[1]);
        const startMin = parseInt(match[2] || '0');
        const endHour = parseInt(match[3]);
        const endMin = parseInt(match[4] || '0');
        
        // Convertir l'heure du vol
        const [flightHour, flightMin] = flightTime.split(':').map(Number);
        
        // Convertir en minutes pour faciliter la comparaison
        const startTotalMin = startHour * 60 + startMin;
        const endTotalMin = endHour * 60 + endMin;
        const flightTotalMin = flightHour * 60 + flightMin;
        
        return flightTotalMin >= startTotalMin && flightTotalMin <= endTotalMin;
    }

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

    // --- Application Initialization ---
    function initializeApplication(source) {
        elements.initialMsg.classList.add('hidden');
        elements.dashboard.classList.remove('hidden');
        [elements.dateStartInput, elements.dateEndInput].forEach(el => el.disabled = false);

        // Set initial date range based on Predict NM data
        let initialDate;
        const predictNMData = core.getState('predictNMData');
        if (source === 'predictNM' && predictNMData.size > 0) {
            const firstPredictNMDate = Array.from(predictNMData.keys()).sort()[0];
            initialDate = new Date(firstPredictNMDate + 'T00:00:00Z');
            core.setState('fullDateRange', [initialDate, initialDate]);
        } else {
            // Fallback to today's date if no data
            const now = new Date();
            const parisTimezone = 'Europe/Paris';
            const parisDateFormatter = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: parisTimezone });
            const todayParisFormatted = parisDateFormatter.format(now);
            const todayLocalParisForInternal = new Date(todayParisFormatted + 'T00:00:00');
            initialDate = new Date(Date.UTC(todayLocalParisForInternal.getFullYear(), todayLocalParisForInternal.getMonth(), todayLocalParisForInternal.getDate()));
            core.setState('fullDateRange', [initialDate, initialDate]);
        }

        core.setState('currentStartDate', initialDate);
        core.setState('currentEndDate', initialDate); // Single day view by default
        core.setState('windowDurationMs', 0); // For single day, duration is 0

        // Set input values visually
        const parisDateFormatter = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Europe/Paris' });
        elements.dateStartInput.value = parisDateFormatter.format(core.getState('currentStartDate'));
        elements.dateEndInput.value = parisDateFormatter.format(core.getState('currentEndDate'));

        // Automatically select the grid for the current start date
        const capacityCalculator = core.getCapacityCalculator();
        const { periodCode, dayType } = capacityCalculator.getPeriodAndDayType(core.getState('currentStartDate'));
        const todayGridKey = `${dayType}${periodCode}`;
        
        const optionExists = Array.from(elements.periodSelect.options).some(option => option.value === todayGridKey);
        
        if (optionExists) {
            elements.periodSelect.value = todayGridKey;
            core.setState('selectedGrid', todayGridKey);
            core.handleGridSelection();
        } else {
            console.warn(`No grid option found for today's date: ${todayGridKey}. Defaulting to no selection.`);
            elements.periodSelect.value = "";
            core.setState('selectedGrid', null);
            core.handleGridSelection();
        }

        core.updateChartTypeButtons();
        core.updateTimezoneButtons();
        core.updateDashboard(false);
        
        // S'assurer que les filtres par colonne sont configurés après l'initialisation
        setTimeout(() => setupColumnFilters(), 100);
    }

    // --- Dashboard Update Logic ---
    function updateDashboard(options = {}) {
        const { redrawSlider = true } = options;
        
        let numDays = 1;

        if (core.getState('activeDataSource') === 'predictNM' && core.getState('predictNMData').size > 0) {
            numDays = Array.from(core.getState('predictNMData').keys()).filter(fdate => {
                const fdateObj = new Date(fdate + 'T00:00:00Z');
                return fdateObj >= core.getState('currentStartDate') && fdateObj <= core.getState('currentEndDate');
            }).length || 1;

            // Masquer les blocs statistiques en vue NM
            const statsGrid = document.querySelector('.stats-grid');
            if (statsGrid) statsGrid.classList.add('hidden');
            
            // Masquer le bloc "Résumé des imports Predict NM"
            elements.predictNMSummaryCard.classList.add('hidden');
            
            // Afficher uniquement la table des vols et les contrôles de capacité
            elements.predictNMTableCard.classList.remove('hidden');
            elements.capacityControlsCard.classList.remove('hidden');
            elements.toggleSideBySideBtn.style.display = 'none';
            core.setState('isStacked', true);
            core.updateChartTypeButtons();
        } else {
            return;
        }

        updateMainChart(numDays);
        updatePredictNMTable();
        updateSynthesisContent();
    }
    
    // --- Main Chart for Predict NM ---
    function updateMainChart(numDays) {
        elements.chartTitle.textContent = `Trafic moyen par créneau horaire (Nombre de jours: ${numDays})`;

        let datasets = [];
        let labels = [];

        // --- Predict NM Data Processing ---
        const predictNMData = core.getState('predictNMData');
        const predictNMFlatData = [];
        predictNMData.forEach(dayData => {
            const fdate = dayData.metadata.FDATE;
            const startDate = core.getState('currentStartDate').toISOString().slice(0, 10);
            const endDate = core.getState('currentEndDate').toISOString().slice(0, 10);

            if (fdate >= startDate && fdate <= endDate) {
                dayData.flights.forEach(flight => {
                    const [h, m] = flight.entry.split(':').map(Number);
                    const slotStr = `${String(h).padStart(2, '0')}:${String(Math.floor(m / 15) * 15).padStart(2, '0')}`;
                    predictNMFlatData.push({ timeSlot: slotStr, category: flight.category, value: 1 });
                });
            }
        });

        const categorySlotData = new Map();
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

        labels = [];
        for (let h = 0; h < 24; h++) {
            for (let m = 0; m < 60; m += 15) {
                labels.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
            }
        }

        const calculateRollingSum = (data, intervalMinutes = 15, windowMinutes = 60) => {
            const slotData = new Map();
            data.forEach(item => slotData.set(item.timeSlot, item.value));

            const rollingSums = new Map();
            const slotsPerWindow = windowMinutes / intervalMinutes;

            for (let i = 0; i < labels.length; i++) {
                let currentSum = 0;
                for (let j = 0; j < slotsPerWindow; j++) {
                    const index = (i + j) % labels.length;
                    currentSum += slotData.get(labels[index]) || 0;
                }
                rollingSums.set(labels[i], currentSum / numDays);
            }
            return rollingSums;
        };

        for (const key in PREDICT_NM_COLORS) {
            const categoryDataForRolling = Array.from(categorySlotData.get(key)).map(([slot, count]) => ({ timeSlot: slot, value: count }));
            const rollingSums = calculateRollingSum(categoryDataForRolling);
            
            datasets.push({
                label: key.replace('_', ' ').replace('+', ' + ').toUpperCase(),
                data: labels.map(slot => rollingSums.get(slot) || 0),
                backgroundColor: PREDICT_NM_COLORS[key].replace('0.15', '0.8'),
                hidden: false,
                type: 'bar',
                stack: 'predictNM'
            });
        }
        
        // Add Capacity for Predict NM
        const capacityCalculator = core.getCapacityCalculator();
        if (core.getState('isStacked') && Object.keys(core.getState('grilleVacations')).length > 0) {
            let gridToUse = core.getState('selectedGrid') || 'SemCha';
            let customSelection = core.getState('customAgentSelection');
            const sivHypothesis = elements.sivSelect.value;
            const capacityResult = capacityCalculator.calculateCapacityWithSpecificGrid(
                gridToUse,
                customSelection,
                sivHypothesis,
                core.getState('currentStartDate')
            );
            datasets.push({
                label: 'Capacité',
                data: capacityResult.capacities,
                backgroundColor: 'rgba(255, 158, 100, 0.2)',
                borderColor: 'rgba(255, 158, 100, 0.8)',
                type: 'line',
                fill: true,
                pointRadius: 0,
                stepped: 'middle',
                order: -1,
                hidden: !core.getState('isStacked')
            });
        }

        const trafficChart = core.getState('trafficChart');
        if (trafficChart) trafficChart.destroy();
        
        setTimeout(() => {
            const newTrafficChart = new Chart(elements.chartCanvas, {
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
                                     let labelText = context.dataset.label;
                                     labelText = labelText.replace('ARRIVÉES', 'Arr').replace('DÉPARTS', 'Dep');
                                     const value = context.parsed.y;
                                     const formattedValue = value.toFixed(0);
                                     return ` ${labelText}: ${formattedValue}`;
                                 },
                                 footer: function(context) {
                                     let totalTrafic = 0;
                                     context.forEach(item => {
                                         if (item.dataset.type === 'bar' && !item.dataset.hidden && item.dataset.label !== 'Capacité') {
                                             totalTrafic += item.parsed.y;
                                         }
                                     });
                                     const formattedTotal = totalTrafic.toFixed(0);
                                     return `\nTrafic total: ${formattedTotal}`;
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
    
    // --- Synthesis Content for Predict NM ---
    function updateSynthesisContent() {
        const synthesisContent = elements.synthesisContent;
        synthesisContent.innerHTML = '';
        const grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
        grid.style.gap = '1rem';

        core.getState('predictNMData').forEach((data, date) => {
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
            importInfo.textContent = `Importé le ${formattedImportDate} UTC`;
            importInfo.style.margin = '0 0 1rem 0';
            importInfo.style.color = 'var(--text-secondary)';
            importInfo.style.fontSize = '0.9rem';
            block.appendChild(importInfo);

            const trafficCount = document.createElement('div');
            trafficCount.style.fontSize = '2rem';
            trafficCount.style.fontWeight = '700';
            trafficCount.style.color = 'var(--accent-orange)';
            trafficCount.textContent = `${data.metadata.NBVOLS} vols`;
            block.appendChild(trafficCount);

            grid.appendChild(block);
        });

        synthesisContent.appendChild(grid);
    }

    // --- Public API ---
    return {
        init: function() {
            console.log("AiglonNM Initialized");
            setupNMEventListeners();
            core.on('dashboard:update', (options) => {
                if (core.getState('activeDataSource') === 'predictNM') {
                    updateDashboard(options);
                }
            });
        }
    };
})();

// Initialize Module when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    AiglonNM.init();
});