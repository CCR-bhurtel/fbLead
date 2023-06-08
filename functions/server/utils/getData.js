const axios = require('axios');

const {
    NINOX_SECOND_TABLE_ID,
    NINOX_API_KEY,
    NINOX_BASE_API,
    NINOX_TEAM_ID,
    NINOX_DATABASE_ID,
} = require('../../config/keys');

const baseNinoxTableURL = `${NINOX_BASE_API}/teams/${NINOX_TEAM_ID}/databases/${NINOX_DATABASE_ID}/tables`;
const getFormattedDate = (originalDate) => {
    const date = new Date(originalDate); // Current date

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}/${month}/${day}`;
    return formattedDate;
};

exports.getPieChartAndTableData = (records, interval) => {
    const modulos = {};

    records.forEach((record) => {
        if (
            record.fields['Totale Soggiorno'] &&
            new Date(record.createdAt) >= interval.startDate &&
            new Date(record.createdAt) <= interval.endDate
        ) {
            const moduloName = record.fields.Modulo?.trim().toLowerCase();
            if (modulos[moduloName]) {
                modulos[moduloName].total += record.fields['Totale Soggiorno'];
                if (record.fields['Preventivo Confermato']) {
                    modulos[moduloName].preventivo += record.fields['Totale Soggiorno'];
                }
            } else {
                modulos[moduloName] = {
                    total: record.fields['Totale Soggiorno'],
                    preventivo: record.fields['Preventivo Confermato'] ? record.fields['Totale Soggiorno'] : 0,
                };
            }
        }
    });

    const keyValueArray = Object.entries(modulos);

    // Sort the array based on values
    keyValueArray.sort((a, b) => b[1].total - a[1].total);

    // Create a new object from the sorted array (optional)
    const sortedObj = Object.fromEntries(keyValueArray);

    const result = { other: 0 };

    Object.entries(sortedObj).forEach((item, i) => {
        if (i < 7) {
            result[item[0]] = item[1].total;
        } else {
            result.other += item[1].total;
        }
    });

    const finalPieChartResult = [];
    const finalTableResult = [];
    Object.entries(result).forEach((item) => {
        finalPieChartResult.push({ value: item[1], name: item[0] });
    });
    Object.entries(sortedObj).forEach((item) => {
        finalTableResult.push({ name: item[0], value: item[1] });
    });
    return { pieChartData: finalPieChartResult, tableData: finalTableResult };
};

exports.getGraphData = (records, interval) => {
    // data = {date: value}
    const dates = {};
    records.forEach((record) => {
        if (
            record.fields['Totale Soggiorno'] &&
            new Date(record.createdAt) >= interval.startDate &&
            new Date(record.createdAt) <= interval.endDate
        ) {
            if (dates[getFormattedDate(record.createdAt)]) {
                dates[getFormattedDate(record.createdAt)] += record.fields['Totale Soggiorno'];
            } else {
                dates[getFormattedDate(record.createdAt)] = record.fields['Totale Soggiorno'];
            }
        }
    });
    const labels = [];
    const data = [];
    const keyValueArray = Object.entries(dates);

    keyValueArray.sort((a, b) => new Date(b[0]) - new Date(a[0]));
    keyValueArray.forEach((entry) => {
        labels.push(entry[0]);
        data.push(entry[1]);
    });
    labels.reverse();
    data.reverse();
    return { labels, data };
};

exports.getTableData = async (perPage, page = 0, search, dateOrder, preventivoFilter, totaleOrder) => {
    const res = await axios.post(
        `${baseNinoxTableURL}/${NINOX_SECOND_TABLE_ID}/records?page=${page}&order=B&desc=true&perPage=1500`,

        {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${NINOX_API_KEY}` },
        }
    );
};
