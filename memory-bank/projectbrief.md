# Project Brief: Aiglon Futé - Advanced Dashboard

## General Objective
Develop an integrated solution for air traffic control capacity analysis, traffic forecasting, and planning verification for LFLL (Lyon St Exupéry) airport.

## Specific Frontend Objective (Aiglon Futé Dashboard)
Enhance an existing HTML/D3.js website (`index.html`) to provide dynamic and interactive calculation of air traffic control capacity ("armement") directly in the browser. This involves porting Python logic to JavaScript and integrating new UI controls for user interaction.

## Core Requirements
*   **Interactive Capacity Calculation**: Implement the capacity calculation logic from `LFLL_MV_inf_DL.py` in `script.js`.
*   **Dynamic UI Controls**: Add new HTML elements (radio buttons, checkboxes) for selecting periods, SIV hypotheses, and active vacation profiles.
*   **Real-time Visualization**: Update the existing Chart.js graph dynamically to display the calculated capacity as an area chart (black line, grey area) based on user selections.
*   **Frontend-only**: No backend development for this specific feature. All data processing must occur in the browser.
*   **Data Integration**: Convert necessary CSV data (`MV_staffings.csv`, `repartition_agents_SIV.csv`, `Vacs_*.csv`) into JavaScript-friendly formats.
*   **Minor UI/UX Improvements**: Implement various small corrections and enhancements to the existing dashboard.
