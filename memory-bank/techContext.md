# Tech Context: Aiglon Futé Dashboard

## Frontend Technologies
*   **HTML5**: For structuring the dashboard interface.
*   **CSS3**: For styling the dashboard, including responsive design and visual elements.
*   **JavaScript (ES6+)**: For all client-side logic, including data manipulation, DOM interaction, and API calls.
*   **Chart.js**: Used for rendering dynamic and interactive traffic charts (e.g., stacked bar charts).
*   **D3.js**: Utilized for creating the heatmap visualization of agent vacation schedules.
*   **Puppeteer**: Used by the Cline environment for browser automation and testing.

## Development Setup & Constraints
*   **Frontend-only**: All logic and data processing occur within the browser. No backend services are required for this feature.
*   **Modular Design**: Code is organized into separate files (e.g., `script.js`, `CapacityCalculator.js`, `vacationGrids.js`, `sivRules.js`, `tmaData.js`) for better maintainability.
*   **State Management**: A global `state` object in `script.js` manages the application's current data and configuration.

## Dependencies
*   **Chart.js**: For charting capabilities.
*   **D3.js**: For data visualization, specifically the heatmap.
*   **`CapacityCalculator.js`**: A custom class encapsulating the logic for calculating control capacity based on staffing, rules, and vacation data.
*   **`sivRules.js`**: Contains specific rules related to SIV hypotheses.
*   **`vacationGrids.js`**: Provides data for agent vacation schedules.
*   **Predict NM Files (.txt)**: A new data source processed differently, displaying specific information such as the number of traffics per day and the import date/time.
