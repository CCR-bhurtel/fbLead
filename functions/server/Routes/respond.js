const express = require('express');

const getTemplates = require('../controllers/respondIo/getTemplates');
const {
    get_templateMaps,
    search_templateMap,
    update_templateMap,
    delete_templateMap,
    add_templateMaps,
} = require('../controllers/respondIo/templateMaps');
const getCustomFields = require('../controllers/respondIo/getCustomFields');

const respondRouter = express.Router();

respondRouter.get('/templates', getTemplates);

respondRouter.get('/templatemaps', get_templateMaps);

respondRouter.post('/templates', add_templateMaps);

respondRouter.get('/templatemaps/search', search_templateMap);

respondRouter.put('/templatemaps/:id', update_templateMap);

respondRouter.delete('/templatemaps/:id', delete_templateMap);

respondRouter.get('/fields', getCustomFields);

module.exports = respondRouter;
