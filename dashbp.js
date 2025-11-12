// dashbp.js - versão isolada para bpAnoIrfs

const SHEET_ID_BP = '12Dri94-KNQVGEJX3sB0w06-FWjsG70EoL0QoL52ffsU';
const SHEET_NAME_BP = 'bpAnoIrfs';
const FETCH_INTERVAL_BP = 5 * 60 * 1000; // 5 minutos

async function fetchSheetDataBp() {
    const endpoint = `https://docs.google.com/spreadsheets/d/${SHEET_ID_BP}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME_BP}&tq=select A,B,C,D,E,F,G`;
    try {
        const response = await fetch(endpoint);
        const text = await response.text();
        const json = JSON.parse(text.match(/google\.visualization\.Query\.setResponse\((.*)\);/)[1]);
        const rows = json.table.rows;

        rows.forEach((row, index) => {
            const colA = row.c[0] ? row.c[0].v : '';
            const colB = row.c[1] ? row.c[1].v : '';
            const colC = row.c[2] ? row.c[2].v : '';
            const colD = row.c[3] ? row.c[3].v : '';
            const colE = row.c[4] ? row.c[4].v : '';
            const colF = row.c[5] ? row.c[5].v : '';
            const colG = row.c[6] ? row.c[6].v : '';

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
        console.error('Erro ao buscar dados da planilha bpAnoIrfs:', error);
    }
}

fetchSheetDataBp();
setInterval(fetchSheetDataBp, FETCH_INTERVAL_BP);






