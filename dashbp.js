document.addEventListener('DOMContentLoaded', async function() {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSnl7RGbaiQYRZaby0QBFoe34zFmungF9v3ZkPlg_8V5m9C23rSDkd_lYtW_L3GEuWJU19OyAUSSh27/gviz/tq?tqx=out:json&sheet=bpAno';

    async function fetchSheetData() {
        try {
            const res = await fetch(sheetUrl);
            const text = await res.text();
            const json = JSON.parse(text.match(/google\.visualization\.Query\.setResponse\((.*)\);/s)[1]);
            return json.table.rows;
        } catch (error) {
            console.error('Erro ao buscar dados da planilha:', error);
            return [];
        }
    }

    function formatBR(value) {
        if (value === null || value === undefined || value === '') return '0,00';
        const num = parseFloat(value);
        if (isNaN(num)) return value;
        const formatted = Math.abs(num).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        return num < 0 ? `(${formatted})` : formatted;
    }

    function populateBalanceSheet(rows) {
        for (let i = 2; i <= 53; i++) {
            const rowIndex = i - 2; // Ajuste zero-based
            const row = rows[rowIndex];

            if (!row) continue;

            const bCell = row.c[1]?.v ?? '';
            const dCell = row.c[3]?.v ?? '';
            const gCell = row.c[6]?.v ?? '';
            const iCell = row.c[8]?.v ?? '';

            const bEl = document.getElementById(`bpAno-b${i}`);
            const dEl = document.getElementById(`bpAno-d${i}`);
            const gEl = document.getElementById(`bpAno-g${i}`);
            const iEl = document.getElementById(`bpAno-i${i}`);

            if (bEl) bEl.textContent = formatBR(bCell);
            if (dEl) dEl.textContent = formatBR(dCell);
            if (gEl) gEl.textContent = formatBR(gCell);
            if (iEl) iEl.textContent = formatBR(iCell);
        }
    }

    async function updateBalanceSheet() {
        const rows = await fetchSheetData();
        populateBalanceSheet(rows);
    }

    // Atualiza a cada 5 minutos
    updateBalanceSheet();
    setInterval(updateBalanceSheet, 5 * 60 * 1000);
});

