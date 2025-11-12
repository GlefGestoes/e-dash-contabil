// ======================================================
// DASHBOARD CONTÁBIL - CONEXÃO GOOGLE SHEETS (IFRS)
// ======================================================

// Configuração base
const SHEET_ID = '12Dri94-KNQVGEJX3sB0w06-FWjsG70EoL0QoL52ffsU';
const FETCH_INTERVAL = 5 * 60 * 1000; // 5 minutos

// ======================================================
// ABA 1: DRE (Demonstração do Resultado)
// ======================================================
async function fetchDreData() {
    const SHEET_NAME = 'dreAnoIrfs';
    const endpoint = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}&tq=select A,B,C,D,E,F,G`;

    try {
        const response = await fetch(endpoint);
        const text = await response.text();
        const json = JSON.parse(text.match(/google\.visualization\.Query\.setResponse\((.*)\);/)[1]);
        const rows = json.table.rows;

        rows.forEach((row, index) => {
            const colC = row.c[2]?.v || '';
            const colD = row.c[3]?.v || '';
            const colF = row.c[5]?.v || '';
            const colG = row.c[6]?.v || '';

            const idC = document.getElementById(`dreAnoIrfs-c${index + 2}`);
            const idD = document.getElementById(`dreAnoIrfs-d${index + 2}`);
            const idG = document.getElementById(`dreAnoIrfs-g${index + 2}`);
            const idH = document.getElementById(`dreAnoIrfs-h${index + 2}`);

            if (idC) idC.textContent = colC;
            if (idD) idD.textContent = colD;
            if (idG) idG.textContent = colF;
            if (idH) idH.textContent = colG;
        });
    } catch (error) {
        console.error('Erro ao buscar dados da aba DRE:', error);
    }
}

// ======================================================
// ABA 2: BP (Balanço Patrimonial)
// ======================================================
async function fetchBpData() {
    const SHEET_NAME = 'bpAnoIrfs';
    const endpoint = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}&tq=select A,B,C,D,E,F,G`;

    try {
        const response = await fetch(endpoint);
        const text = await response.text();
        const json = JSON.parse(text.match(/google\.visualization\.Query\.setResponse\((.*)\);/)[1]);
        const rows = json.table.rows;

        rows.forEach((row, index) => {
            const colC = row.c[2]?.v || '';
            const colD = row.c[3]?.v || '';
            const colF = row.c[5]?.v || '';
            const colG = row.c[6]?.v || '';

            const idC = document.getElementById(`bpAnoIrfs-c${index + 2}`);
            const idD = document.getElementById(`bpAnoIrfs-d${index + 2}`);
            const idG = document.getElementById(`bpAnoIrfs-g${index + 2}`);
            const idH = document.getElementById(`bpAnoIrfs-h${index + 2}`);

            if (idC) idC.textContent = colC;
            if (idD) idD.textContent = colD;
            if (idG) idG.textContent = colF;
            if (idH) idH.textContent = colG;
        });
    } catch (error) {
        console.error('Erro ao buscar dados da aba BP:', error);
    }
}

// ======================================================
// Inicialização automática ao carregar a página
// ======================================================
function atualizarTabelas() {
    fetchDreData();
    fetchBpData();
}

// Primeira atualização imediata
atualizarTabelas();

// Atualização automática a cada 5 minutos
setInterval(atualizarTabelas, FETCH_INTERVAL);


