const {
    NINOX_SECOND_TABLE_ID,
    NINOX_THIRD_TABLE_ID,
    NINOX_BASE_API,
    NINOX_TEAM_ID,
    NINOX_DATABASE_ID,
    NINOX_API_KEY,
} = require('../../../config/keys');
const catchAsync = require('../../utils/catchAsync');
const { getPieChartAndTableData, getGraphData, getTableData } = require('../../utils/getData');
const { oneMonthAgo, twoWeeksAgo, oneWeekAgo } = require('../../utils/getDates');
const axios = require('axios').default;

const baseNinoxTableURL = `${NINOX_BASE_API}/teams/${NINOX_TEAM_ID}/databases/${NINOX_DATABASE_ID}/tables`;

const getAllData = async (interval) => {
    let page1 = 0;
    let page2 = 0;
    let loop1 = true;
    let loop2 = true;
    let records = [];

    while (loop1 || loop2) {
        console.log('Starting loop');

        if (loop1) {
            const res = await axios.get(
                `${baseNinoxTableURL}/${NINOX_SECOND_TABLE_ID}/records?page=${page1}&order=I&desc=true&perPage=7000`,

                {
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${NINOX_API_KEY}` },
                }
            );
            records = records.concat(res.data);
            console.log(res.data.length);
            if (res.data.length) {
                const record = res.data[res.data.length - 1];

                if (new Date(record.createdAt) < interval.startDate) loop1 = false;
                page1++;
            } else {
                loop1 = false;
            }
        }
        if (loop2) {
            const res = await axios.get(
                `${baseNinoxTableURL}/${NINOX_THIRD_TABLE_ID}/records?page=${page2}&order=B&desc=true&perPage=7000`,

                {
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${NINOX_API_KEY}` },
                }
            );
            records = records.concat(res.data);
            if (res.data.length) {
                const record = res.data[res.data.length - 1];
                if (new Date(record.createdAt) < interval.startDate) loop2 = false;
                page2++;
            } else {
                loop2 = false;
            }
        }
    }
    return records;
};

const getInterval = (interval) => {
    switch (interval) {
        case 'month':
            return oneMonthAgo();

        case 'fortnight':
            return twoWeeksAgo();

        case 'week':
            return oneWeekAgo();

        default:
            return oneWeekAgo();
    }
};

module.exports = catchAsync(async (req, res, next) => {
    // let interval = getInterval(req.query.time);
    let startDate = new Date(req.query.startDate);
    let endDate = new Date(req.query.endDate);
    console.log(req.query);

    let interval = { startDate, endDate };

    let perPage = req.query.perPage;
    let page = req.query.page || 0;
    let search = req.query.search;
    let dateOrder = req.query.dateOrder || 1; // 1 means descending 2 means ascending
    let preventivoFilter = req.query.preventivo; // 1 means display si, 2 means display no
    let totaleOrder = req.query.totaleOrder || 1; // 1 means descending 2 means ascending

    const data = await getAllData(interval);
    const pieChartAndTableData = getPieChartAndTableData(data, interval);
    const barGraphData = getGraphData(data, interval);
    return res.status(200).json({ pieChartAndTableData, barGraphData });
});
