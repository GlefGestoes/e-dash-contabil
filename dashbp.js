// dashbp.js
document.addEventListener('DOMContentLoaded', async function () {
    const sheetId = "SUA_PLANILHA_ID"; // Substitua pelo ID da planilha
    const sheetName = "bpAno";
    const range = "B2:I53"; // Intervalo das células

    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}&range=${range}`;

    try {
        const response = await fetch(url);
        const text = await response.text();
        const jsonText = text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1);
        const data = JSON.parse(jsonText);
        const rows = data.table.rows;

        function formatBR(value) {
            if (value == null || isNaN(value)) return "0,00";
            const absValue = Math.abs(Number(value));
            const formatted = absValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            return Number(value) < 0 ? `(${formatted})` : formatted;
        }

        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].c;

            const mapping = {
                b: cells[0]?.v,
                d: cells[2]?.v,
                g: cells[5]?.v,
                i: cells[7]?.v
            };

            Object.entries(mapping).forEach(([col, val]) => {
                const id = `bpAno-${col}${i + 2}`;
                const el = document.getElementById(id);
                if (el) el.textContent = formatBR(val);
            });
        }

    } catch (err) {
        console.error("Erro ao carregar dados do Balanço Patrimonial:", err);
    }
});
