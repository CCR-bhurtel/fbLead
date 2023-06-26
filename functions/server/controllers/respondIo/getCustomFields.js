const { default: axios } = require('axios');
const catchAsync = require('../../utils/catchAsync');
const { RESPOND_IO_BASE_API, RESPOND_IO_TOKEN } = require('../../../config/keys');
module.exports = catchAsync(async (req, res, next) => {
    const response = await axios.get(`${RESPOND_IO_BASE_API}/space/custom_field?limit=100`, {
        headers: {
            Authorization: `Bearer ${RESPOND_IO_TOKEN}`,
        },
    });
    const fields = response.data.items;
    const newFields = fields.map((field) => ({ ...field, fieldType: 'custom' }));
    return res.status(200).json({ fields: newFields });
});
