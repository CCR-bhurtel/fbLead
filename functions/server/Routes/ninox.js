const express = require('express');
const getData = require('../controllers/data/getData');
const { getHotelData, initialData } = require('../controllers/data/getHotels');
const getOffers = require('../controllers/data/getOffers');
const postEnquiry = require('../controllers/data/postEnquiry');

const ninoxRouter = express.Router();

ninoxRouter.get('/', getData);

ninoxRouter.post('/hoteldata', getHotelData);

ninoxRouter.get('/initialhoteldata', initialData);

ninoxRouter.post('/bestoffers', getOffers);


module.exports = ninoxRouter;
