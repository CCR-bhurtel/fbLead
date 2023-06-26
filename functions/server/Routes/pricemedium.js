const express = require('express');
const catchAsync = require('../utils/catchAsync');
const PriceMedium = require('../models/Price');
const fetchData = require('../utils/fetchData');

const priceMediumRouter = express.Router();

// priceMediumRouter.post(
//     '/',
//     catchAsync(async (req, res, next) => {
//         await PriceMedium.create({ data: [] });
//         return res.status(200).json({ status: 'success' });
//     })
// );

// priceMediumRouter.get(
//     '/fetch',
//     catchAsync(async (req, res, next) => {
//         await fetchData();
//         return res.status(200).json({ status: 'success' });
//     })
// );

priceMediumRouter.get(
    '/',
    catchAsync(async (req, res, next) => {
        return res.send('Script is Running!');
    })
);

priceMediumRouter.get(
    '/data',
    catchAsync(async (req, res, next) => {
        try {
            const averageValues = await PriceMedium.findById('64971284f2269b06b2297a3f');

            res.send(JSON.stringify(averageValues.data, null, 2));
        } catch (error) {
            res.status(500).json({ error: 'Error occurred while fetching data' });
        }
    })
);

module.exports = priceMediumRouter;
