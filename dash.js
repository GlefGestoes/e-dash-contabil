const SHEET_ID = '12Dri94-KNQVGEJX3sB0w06-FWjsG70EoL0QoL52ffsU';
const SHEET_NAME = 'drAnoIrfs';
const FETCH_INTERVAL = 5 * 60 * 1000; // 5 minutos

async function fetchSheetData() {
    const endpoint = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}&tq=select B,D`;
    try {
        const response = await fetch(endpoint);
        const text = await response.text();
        // A resposta vem com "google.visualization.Query.setResponse(...)"
        const json = JSON.parse(text.match(/google\.visualization\.Query\.setResponse\((.*)\);/)[1]);
        const rows = json.table.rows;

        rows.forEach((row, index) => {
            const colB = row.c[0] ? row.c[0].v : '';
            const colD = row.c[1] ? row.c[1].v : '';

            const idB = document.getElementById(`drAnoIrfs-b${index + 2}`);
            const idD = document.getElementById(`drAnoIrfs-d${index + 2}`);

            if (idB) idB.textContent = colB;
            if (idD) idD.textContent = colD;
        });
    } catch (error) {
        console.error('Erro ao buscar dados da planilha:', error);
    }
}

// Atualiza ao carregar a página
fetchSheetData();

// Atualiza a cada 5 minutos
setInterval(fetchSheetData, FETCH_INTERVAL);
