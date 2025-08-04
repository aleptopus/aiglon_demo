/**
 * AIGLON FUTÉ - Module Core
 * Composants communs partagés entre COHOR et Predict NM
 * Gestion de l'état, UI, capacité, et visualisations communes
 */

// Global Core Object
window.AiglonCore = (function() {
    'use strict';

    // --- DOM Elements & State ---
    const elements = {
        csvFile: document.getElementById('csvFileInput'),
        jsonFile: document.getElementById('jsonFileInput'),
        predictNMFile: document.getElementById('predictNMFileInput'),
        csvName: document.getElementById('csvFileName'),
        jsonName: document.getElementById('jsonFileName'),
        predictNMName: document.getElementById('predictNMFileName'),
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
        capacityControlsCard: document.getElementById('capacityControlsCard'),
        periodSelect: document.getElementById('periodSelect'),
        sivSelect: document.getElementById('sivSelect'),
        synthesisContent: document.getElementById('synthesisContent'),
        predictNMSummaryCard: document.getElementById('predictNMSummaryCard'),
        predictNMTableCard: document.getElementById('predictNMTableCard'),
        predictNMTableBody: document.querySelector('#predictNMTable tbody'),
        predictNMFilterInput: document.getElementById('predictNMFilterInput'),
        togglePredictNMTableBtn: document.getElementById('togglePredictNMTableBtn'),
    };

    let state = {
        cohorData: [],
        tmaMap: new Map(),
        predictNMData: new Map(),
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
        activeDataSource: null, // 'cohor' or 'predictNM'
    };

    // Instantiate CapacityCalculator
    const capacityCalculator = new CapacityCalculator(staffingMap, sivRules, vacationGrids);
    
    // --- Constants ---
    const DAYS_OF_WEEK = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

    // --- Event System ---
    const eventListeners = new Map();

    function on(event, callback) {
        if (!eventListeners.has(event)) {
            eventListeners.set(event, []);
        }
        eventListeners.get(event).push(callback);
    }

    function emit(event, data) {
        if (eventListeners.has(event)) {
            eventListeners.get(event).forEach(callback => callback(data));
        }
    }

    // --- Core Event Listeners Setup ---
    function setupCoreEventListeners() {
        [elements.dateStartInput, elements.dateEndInput].forEach(el => 
            el.addEventListener('change', updateFromDateInputs)
        );
        elements.sivSelect.addEventListener('change', () => updateDashboard(false));
        elements.periodSelect.addEventListener('change', handleGridSelection);
        
        // Chart view and timezone buttons
        elements.toggleStackedBtn.addEventListener('click', () => {
            state.isStacked = true;
            updateChartTypeButtons();
            updateDashboard(false);
        });
        elements.toggleSideBySideBtn.addEventListener('click', () => {
            state.isStacked = false;
            updateChartTypeButtons();
            updateDashboard(false);
        });
        elements.toggleUTCBtn.addEventListener('click', () => {
            state.useUTC = true;
            updateTimezoneButtons();
            updateDashboard(false);
        });
        elements.toggleLocalBtn.addEventListener('click', () => {
            state.useUTC = false;
            updateTimezoneButtons();
            updateDashboard(false);
        });
    }

    // --- UI Creation & Interaction ---
    function createToggleButtons() {
        elements.dayToggles.innerHTML = DAYS_OF_WEEK.map((day, i) => 
            `<input type="checkbox" id="day-${i}" value="${i}" checked><label for="day-${i}">${day.substring(0,3)}</label>`
        ).join('');
        
        // Traffic toggles will be created by specific modules
        document.querySelectorAll('.toggle-group input').forEach(cb => 
            cb.addEventListener('change', updateDashboard)
        );
    }

    function updateFromDateInputs() {
        const startDateString = elements.dateStartInput.value;
        const endDateString = elements.dateEndInput.value;

        const selectedStartDateLocal = new Date(startDateString + 'T00:00:00');
        const selectedEndDateLocal = new Date(endDateString + 'T00:00:00');

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

        const oneDay = 24 * 60 * 60 * 1000;
        if (state.currentEndDate.getTime() - state.currentStartDate.getTime() === oneDay) {
            state.currentEndDate = new Date(state.currentStartDate);
            elements.dateEndInput.value = elements.dateStartInput.value;
        }

        state.windowDurationMs = state.currentEndDate.getTime() - state.currentStartDate.getTime();
        
        if (isTransitionPeriod(state.currentStartDate, state.currentEndDate)) {
            alert("La période sélectionnée chevauche un changement d'heure. Veuillez sélectionner une période entièrement en heure d'été ou d'hiver.");
            return;
        }
        
        const { periodCode, dayType } = capacityCalculator.getPeriodAndDayType(state.currentStartDate);
        const newGridKey = `${dayType}${periodCode}`;
        
        const optionExists = Array.from(elements.periodSelect.options).some(option => option.value === newGridKey);
        
        if (optionExists) {
            elements.periodSelect.value = newGridKey;
            state.selectedGrid = newGridKey;
            handleGridSelection();
        } else {
            console.warn(`No grid option found for selected date: ${newGridKey}. Defaulting to no selection.`);
            elements.periodSelect.value = "";
            state.selectedGrid = null;
            handleGridSelection();
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
                return true;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return false;
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

    // --- Dashboard Update Logic ---
    function updateDashboard(redrawSlider = true) {
        emit('dashboard:update', { redrawSlider });
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
        
        const dayType = selectedGridKey.substring(0, 3);
        const periodCode = selectedGridKey.substring(3);
        
        const gridData = state.grilleVacations[dayType]?.[periodCode];
        
        if (gridData && gridData.grid) {
            state.availableAgents = capacityCalculator.getAgentsByType(gridData);
            generateAgentButtons();
            initializeDefaultSelection();
            renderHeatmapD3(state.selectedGrid);
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
        
        Object.values(buttonContainers).forEach(container => {
            if (container) container.innerHTML = '';
        });
        
        const createAgentElement = (agent, type, isSelectable = true, isInitiallySelected = false) => {
            const element = document.createElement(isSelectable ? 'button' : 'span');
            element.className = 'agent-button';
            if (!isSelectable) {
                element.classList.add('selected');
                element.style.cursor = 'default';
            }
            if (isInitiallySelected) element.classList.add('selected');
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
            buttonContainers.M.appendChild(createAgentElement(mcAgent, 'M', false));
        }
        mAgents.slice(0, 8).forEach(agent => {
            buttonContainers.M.appendChild(createAgentElement(agent, 'M', true));
        });

        // Generate buttons for J (JC first as non-selectable, then J agents)
        const jAgents = state.availableAgents.J.filter(agent => agent.vacation !== 'JC');
        const jcAgent = state.availableAgents.J.find(agent => agent.vacation === 'JC');
        if (jcAgent) {
            buttonContainers.J.appendChild(createAgentElement(jcAgent, 'J', false));
        }
        jAgents.slice(0, 8).forEach(agent => {
            buttonContainers.J.appendChild(createAgentElement(agent, 'J', true));
        });

        // Generate buttons for SN (NC first as non-selectable, then N agents as non-selectable, then S agents)
        const snAgents = state.availableAgents.SN.filter(agent => agent.vacation !== 'NC' && !agent.vacation.startsWith('N'));
        const ncAgent = state.availableAgents.SN.find(agent => agent.vacation === 'NC');
        const nAgents = state.availableAgents.SN.filter(agent => agent.vacation.startsWith('N'));

        if (ncAgent) {
            buttonContainers.SN.appendChild(createAgentElement(ncAgent, 'SN', false));
        }
        nAgents.slice(0, 2).forEach(agent => {
            buttonContainers.SN.appendChild(createAgentElement(agent, 'SN', false));
        });
        snAgents.slice(0, 8).forEach(agent => {
            buttonContainers.SN.appendChild(createAgentElement(agent, 'SN', true));
        });
    }

    function initializeDefaultSelection() {
        state.customAgentSelection = { Je: [], M: [], J: [], SN: [] };
        
        const fixedAgents = [];
        const mcAgent = state.availableAgents.M.find(agent => agent.vacation === 'MC');
        if (mcAgent) fixedAgents.push(mcAgent);
        const jcAgent = state.availableAgents.J.find(agent => agent.vacation === 'JC');
        if (jcAgent) fixedAgents.push(jcAgent);
        const ncAgent = state.availableAgents.SN.find(agent => agent.vacation === 'NC');
        if (ncAgent) fixedAgents.push(ncAgent);
        const nAgents = state.availableAgents.SN.filter(agent => agent.vacation.startsWith('N'));
        fixedAgents.push(...nAgents.slice(0, 2));

        fixedAgents.forEach(agent => {
            if (agent.vacation.startsWith('M') || agent.vacation === 'MC') {
                if (!state.customAgentSelection.M.includes(agent.vacation)) state.customAgentSelection.M.push(agent.vacation);
            } else if (agent.vacation.startsWith('J') || agent.vacation === 'JC') {
                if (!state.customAgentSelection.J.includes(agent.vacation)) state.customAgentSelection.J.push(agent.vacation);
            } else if (agent.vacation.startsWith('S') || agent.vacation.startsWith('N') || agent.vacation === 'NC') {
                if (!state.customAgentSelection.SN.includes(agent.vacation)) state.customAgentSelection.SN.push(agent.vacation);
            }
        });

        updateAgentButtonStates();

        ['Je', 'M', 'J', 'SN'].forEach(type => {
            const maxAgents = type === 'Je' ? 3 : 8;
            const currentCount = state.customAgentSelection[type].length;
            const remainingToSelect = maxAgents - currentCount;

            if (remainingToSelect > 0) {
                const selectableAgents = state.availableAgents[type].filter(agent => 
                    !state.customAgentSelection[type].includes(agent.vacation) &&
                    !['MC', 'JC', 'NC'].includes(agent.vacation) &&
                    !agent.vacation.startsWith('N')
                );
                selectableAgents.slice(0, remainingToSelect).forEach(agent => {
                    state.customAgentSelection[type].push(agent.vacation);
                });
            }
        });
        
        updateAgentButtonStates();
        updateEffectifTitle();
    }

    function toggleAgentSelection(type, agentId, buttonElement) {
        const currentSelection = state.customAgentSelection[type];
        const index = currentSelection.indexOf(agentId);
        
        if (index > -1) {
            currentSelection.splice(index, 1);
            buttonElement.classList.remove('selected');
        } else {
            currentSelection.push(agentId);
            buttonElement.classList.add('selected');
        }
        
        updateEffectifTitle();
        updateDashboard(false);
        renderHeatmapD3(state.selectedGrid);
    }

    function updateAgentButtonStates() {
        document.querySelectorAll('.agent-button').forEach(button => {
            const type = button.dataset.agentType;
            const agentId = button.dataset.agentId;
            
            if (state.customAgentSelection[type] && state.customAgentSelection[type].includes(agentId)) {
                button.classList.add('selected');
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

    function updateEffectifTitle() {
        const titleElement = document.getElementById('capacityEffectifTitle');
        if (!titleElement) return;

        const jeCount = state.customAgentSelection.Je.length;
        const mCount = state.customAgentSelection.M.length + 1;
        const jCount = state.customAgentSelection.J.length + 1;
        const snCount = state.customAgentSelection.SN.length + 1;

        titleElement.textContent = `Effectif ${jeCount} Je / ${mCount} M / ${jCount} J / ${snCount} SN`;
    }

    // --- D3.js Heatmap ---
    function renderHeatmapD3(gridKey) {
        const container = d3.select("#d3-heatmap-container");
        container.html("");

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

        const selectedVacationsSet = new Set([
            ...state.customAgentSelection.Je,
            ...state.customAgentSelection.M,
            ...state.customAgentSelection.J,
            ...state.customAgentSelection.SN
        ]);

        const fixedVacations = ['MC', 'JC', 'NC', 'N#01', 'N#02'];
        const fixedVacationsSet = new Set(fixedVacations);

        const agentsToShow = gridData.filter(agent => 
            fixedVacationsSet.has(agent.vacation) || selectedVacationsSet.has(agent.vacation)
        );

        const agentsByType = { Je: [], M: [], J: [], SN: [] };

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

        Object.keys(agentsByType).forEach(key => {
            agentsByType[key].sort((a, b) => a.priorite - b.priorite);
        });

        const orderedAgents = [];

        const addAgentsInOrder = (typeKey, fixedInGroup) => {
            const fixed = agentsByType[typeKey].filter(agent => fixedInGroup.includes(agent.vacation));
            const others = agentsByType[typeKey].filter(agent => !fixedInGroup.includes(agent.vacation));
            orderedAgents.push(...fixed, ...others);
        };

        addAgentsInOrder('Je', []);
        addAgentsInOrder('M', ['MC']);
        addAgentsInOrder('J', ['JC']);
        addAgentsInOrder('SN', ['NC', 'N#01', 'N#02']);

        const yLabels = orderedAgents.map(agent => agent.vacation);
        const heatmapData = [];

        orderedAgents.forEach((agent, yIndex) => {
            for (let slotIndex = 0; slotIndex < 96; slotIndex++) {
                const hour = Math.floor(slotIndex / 4) + 4;
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

        const margin = { top: 50, right: 20, bottom: 50, left: 300 };
        const numSlots = 96;

        const containerWidth = parseInt(container.style("width")) || document.getElementById('d3-heatmap-container').clientWidth;
        const dynamicCellSize = (containerWidth - margin.left - margin.right) / numSlots;
        const cellSize = Math.max(10, dynamicCellSize);

        const width = numSlots * cellSize;
        const height = yLabels.length * cellSize;

        const gridNameMapping = {
            "SemCha": "Semaine Chargée", "SamCha": "Samedi Chargé", "DimCha": "Dimanche Chargée",
            "SemCre": "Semaine Creuse", "SamCre": "Samedi Creux", "DimCre": "Dimanche Creux",
            "SemHiv": "Semaine Hiver", "SamHiv": "Samedi Hiver", "DimHiv": "Dimanche Hiver"
        };
        const displayGridName = gridNameMapping[gridKey] || gridKey;

        container.append("h2").text(`Détails des vacations de la période ${displayGridName}`).attr("class", "card-title");

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand().range([0, width]).domain(d3.range(numSlots)).paddingInner(0.05);
        const y = d3.scaleBand().range([0, height]).domain(yLabels).paddingInner(0.05);

        const colorScale = (value) => {
            switch (value) {
                case '1': return '#800080';
                case 'C': return '#FF0000';
                case 'P': return '#87CEEB';
                case 'R': return '#FFA500';
                default: return 'rgba(0, 0, 0, 0)';
            }
        };

        const tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

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

        const xAxis = d3.axisBottom(x)
            .tickValues(d3.range(0, numSlots, 4))
            .tickFormat(d => {
                const hour = Math.floor(d / 4) + 4;
                return `${String(hour % 24).padStart(2, '0')}h`;
            });

        const yAxis = d3.axisLeft(y);

        svg.append("g").attr("class", "x-axis").attr("transform", `translate(0, ${height})`).call(xAxis);
        svg.append("g").attr("class", "y-axis").call(yAxis)
            .selectAll("text")
            .attr("text-anchor", "end")
            .attr("dx", "-1em")
            .attr("dy", d => y.bandwidth() / 2 + 4)
            .style("font-size", "12px")
            .style("fill", "var(--text-secondary)");

        svg.selectAll(".x-axis text").style("fill", "var(--text-secondary)");
        svg.selectAll(".x-axis path, .x-axis line, .y-axis path, .y-axis line").style("stroke", "var(--border)");

        const legendData = [
            { value: '1', label: 'Actif', color: 'rgba(128, 0, 128, 0.7)' },
            { value: 'C', label: 'Chef', color: 'rgba(255, 0, 0, 0.7)' },
            { value: 'P', label: 'Pause', color: 'rgba(135, 206, 235, 0.7)' },
            { value: 'R', label: 'Repos', color: 'rgba(255, 165, 0, 0.7)' }
        ];

        const legend = container.append("div").attr("class", "heatmap-legend-d3");
        legend.selectAll(".legend-item")
            .data(legendData)
            .enter().append("div")
            .attr("class", "legend-item")
            .html(d => `<span class="legend-color" style="background-color: ${d.color};"></span><span>${d.label}</span>`);
    }

    function splitGridKey(gridKey) {
        const dayType = gridKey.substring(0, 3);
        const periodCode = gridKey.substring(3);
        return [dayType, periodCode];
    }

    function getVacationStatusName(code) {
        const types = { '1': 'Actif', 'C': 'Chef', 'P': 'Pause', 'R': 'Repos' };
        return types[code] || 'Vide';
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
        }, 250);
    });

    // --- Public API ---
    return {
        // State Management
        getState: (key) => key ? state[key] : state,
        setState: (key, value) => { state[key] = value; },
        
        // Elements Access
        getElements: () => elements,
        
        // Event System
        on: on,
        emit: emit,
        
        // UI Management
        updateDashboard: updateDashboard,
        updateChartTypeButtons: updateChartTypeButtons,
        updateTimezoneButtons: updateTimezoneButtons,
        createToggleButtons: createToggleButtons,
        
        // Capacity Integration
        getCapacityCalculator: () => capacityCalculator,
        
        // Constants
        DAYS_OF_WEEK: DAYS_OF_WEEK,
        
        handleGridSelection: handleGridSelection, // Expose function

        // Initialization
        init: function() {
            console.log('AiglonCore initialized');
            setupCoreEventListeners();
            createToggleButtons();
        }
    };
})();

// Initialize Core when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    AiglonCore.init();
});