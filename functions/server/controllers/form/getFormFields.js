const { default: axios } = require('axios');
const { FACEBOOK_USER_ACCESS_TOKEN } = require('../../../config/keys');
const catchAsync = require('../../utils/catchAsync');

const fieldGenerator = (questions) => {
    const fields = [];
    questions.forEach((question) => {
        fields.push({ key: question.key, label: question.label });
        if (question['dependent_conditional_questions']) {
            question['dependent_conditional_questions'].forEach((dependent) => {
                fields.push({ key: dependent.field_key, label: dependent.name });
            });
        }
    });
    return fields;
};

const getFields = catchAsync(async (req, res) => {
    const { formId } = req.query;

    try {
        const response = await axios.get(
            `https://graph.facebook.com/v16.0/${formId}?access_token=${FACEBOOK_USER_ACCESS_TOKEN}&fields=id,name,questions`
        );
        const { data } = response;
        return res.status(200).json({ formName: data.name, fields: fieldGenerator(data.questions) });
    } catch (err) {
        console.log(err.response.data);
        return res
            .status(400)
            .json({ message: err.response?.data.message || 'Error verifying form, please check form id' });
    }
});

module.exports = getFields;
