const express = require('express');
const getData = require('../controllers/data/getData');

const ninoxRouter = express.Router();

ninoxRouter.get('/', getData);

module.exports = ninoxRouter;
