const {
    FACEBOOK_USER_ACCESS_TOKEN_NEW,
    RESPOND_IO_BASE_API,
    RESPOND_IO_TOKEN,
    NINOX_BASE_API,
    NINOX_TEAM_ID,
    NINOX_DATABASE_ID,
    NINOX_API_KEY,
} = require('../../../config/keys');
const catchAsync = require('../../utils/catchAsync');
const axios = require('axios').default;

const baseNinoxTableURL = `${NINOX_BASE_API}/teams/${NINOX_TEAM_ID}/databases/${NINOX_DATABASE_ID}/tables`;

const getWhatsAppTemplates = require('../../utils/getWhatsappTemplates');

const getNinoxTables = async () => {
    const response = await axios.get(baseNinoxTableURL, {
        headers: {
            Authorization: `Bearer ${NINOX_API_KEY}`,
        },
    });
    return response.data;
};

module.exports = catchAsync(async (req, res) => {
    const tables = await getNinoxTables();
    const templates = await getWhatsAppTemplates();
    const tables_with_id = tables.map((table) => ({
        ...table,
        fields: [...table.fields, { id: 'X', name: 'Id', type: 'String' }],
    }));
    return res.status(200).json({ tables: tables_with_id, templates });
});
