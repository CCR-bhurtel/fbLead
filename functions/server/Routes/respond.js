const express = require('express');
const catchAsync = require('../utils/catchAsync');

const axios = require('axios').default;
const { RESPOND_IO_BASE_API, RESPOND_IO_TOKEN } = require('../../config/keys');

const respondRouter = express.Router();
const getWhatsAppTemplates = async () => {
    try {
        const response = await axios.get(`${RESPOND_IO_BASE_API}/channels/135898/whatsapp/templates`, {
            headers: {
                Authorization: `Bearer ${RESPOND_IO_TOKEN}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

respondRouter.post(
    '/',
    catchAsync((req, res, next) => {
        console.log(req.body);

        // https://api.respond.io/v2
        // /contact/{identifier}/message
        // {
        //     "type": "whatsapp_template",
        //     "template": {
        //       "name": "New Update",
        //       "languageCode": "en",
        //       "components": [
        //         {
        //           "parameters": []
        //         }
        //       ]
        //     }
        //   }
    })
);

respondRouter.get(
    '/templates',
    catchAsync(async (req, res, next) => {
        const templates = await getWhatsAppTemplates();
        return res.status(200).json({ templates });
    })
);

module.exports = respondRouter;
