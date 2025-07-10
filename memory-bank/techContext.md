# Technical Context: Aiglon Futé Dashboard

## Technologies Used
*   **HTML5**: For structuring the web content.
*   **CSS3**: For styling the dashboard, including a dark theme.
*   **JavaScript (ES6+)**: Core programming language for all frontend logic.
*   **D3.js (v7)**: JavaScript library for data-driven documents, specifically used for the interactive date slider.
*   **Chart.js**: JavaScript charting library for visualizing traffic and capacity data.
*   **FileReader API**: For client-side file reading (COHOR CSV, TMA JSON).

## Development Setup
*   **Local Development Server**: Any simple static file server can host the `index.html` and associated assets.
*   **Browser Compatibility**: Developed for modern web browsers (Chrome, Firefox, Edge, Safari).
*   **No Build Tools**: The project does not use complex build tools like Webpack or Babel. All JavaScript is directly included via `<script>` tags.

## Technical Constraints
*   **Frontend-only**: All data processing must occur in the browser. This implies limitations on data volume and complexity of computations.
*   **CSV/JSON Input**: Data is expected in specific CSV (semicolon-separated) and JSON formats.
*   **Timezone Handling**: Attention il y a un mélange entre les heures locales (Paris) et UTC. Voici les bases: Les données COHOR sont en UTC, les données trafic TMA sont en UTC, 
les données grilles d'armement (vacationGrids.js) sont en heure locale, les données des grilles SIV (sivRules.js) sont en UTC. Il faut trouver un méthode pour définir et pouvoir basculer 
dans l'interface facilement entre heure locale et UTC. Vérifie pour les données TMA j'ai l'impression qu'il n'ajoute pas avec le bon fuseau horaire.

## Dependencies
*   `d3.v7.min.js`: Included via CDN.
*   `chart.js`: Included via CDN.
*   `chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js`: Included via CDN for date handling in Chart.js.
*   `staffingMap.js`: Local JavaScript file, providing staffing data as a global constant.
*   `sivRules.js`: Local JavaScript file, providing SIV rules data as a global constant.
*   `vacationGrids.js`: Local JavaScript file, providing vacation grid data as a global constant.
