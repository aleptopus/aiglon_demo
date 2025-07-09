# System Patterns: Aiglon Futé Dashboard

## Architecture
The system follows a client-side, single-page application (SPA) architecture. All data processing and visualization occur within the user's browser.

## Key Technical Decisions
*   **Frontend-only Processing**: No backend server is used for the core dashboard functionality. This simplifies deployment and reduces infrastructure costs.
*   **Data Loading**: COHOR CSV and TMA JSON data files are loaded directly by the browser using `FileReader` API. Capacity-related data (`vacationGrids`, `staffingMap`, `sivRules`) are pre-loaded as global JavaScript constants.
*   **Data Storage**: Application state and loaded data are managed in a global JavaScript `state` object.
*   **UI Rendering**: HTML elements are dynamically generated and updated using standard DOM manipulation and D3.js for the date slider.
*   **Charting**: Chart.js library is used for rendering the main traffic and capacity charts.
*   **Modularity**: JavaScript code is organized into functions with clear responsibilities (e.g., `handleFile`, `processData`, `updateDashboard`, `calculateCapacity`).

## Design Patterns in Use
*   **Module Pattern**: JavaScript code is encapsulated within a `DOMContentLoaded` listener, preventing global scope pollution.
*   **State Management**: A central `state` object holds all application data, facilitating data flow and UI updates.
*   **Event-Driven Programming**: User interactions (file uploads, select changes, slider changes) trigger specific functions via event listeners.
*   **Data-Driven Documents (D3.js)**: Used for interactive elements like the date slider, demonstrating a data-binding approach.

## Component Relationships
*   `index.html`: Defines the static structure and acts as the entry point.
*   `script.js`: Contains the main application logic, interacting with DOM elements, processing data, and orchestrating updates.
*   `staffingMap.js`, `sivRules.js`, `vacationGrids.js`: External JavaScript files providing pre-processed data as global constants, directly consumed by `script.js`.
*   `CapacityCalculator.js`: Module for capacity calculation, used by `script.js`.
*   `style.css`: Provides styling for the dashboard.

## Data Flow
1.  User uploads COHOR CSV and TMA JSON files via `input type="file"`.
2.  `FileReader` reads file content.
3.  Content is parsed by `processCohorCSV` and `processTmaJSON` functions.
4.  Parsed data updates the `state` object (`cohorData`, `tmaMap`). `state.grilleVacations` and `state.compoEquipe` are initialized from global constants.
5.  `initializeDashboard` is called on initial COHOR data load.
6.  `updateDashboard` is the central update function, triggered by UI interactions or data changes.
7.  `updateDashboard` filters data, calls `calculateCapacity` (if applicable), and updates `updateMainChart`, `updateSummaryCards`, `updateSummaryTable`.
8.  `calculateCapacity` uses `state.grilleVacations`, `state.compoEquipe`, `sivRules` to compute capacity data.
9.  `updateMainChart` renders traffic and capacity data using Chart.js.
