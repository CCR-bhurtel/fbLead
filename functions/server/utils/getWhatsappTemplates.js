const axios = require('axios')
const {FACEBOOK_USER_ACCESS_TOKEN_NEW} = require('../../config/keys')
module.exports = async () => {
    try {
        const response = await axios.get(`https://graph.facebook.com/v16.0/120810664247121/message_templates?limit=500`, {
            headers: {
                Authorization: `Bearer ${FACEBOOK_USER_ACCESS_TOKEN_NEW}`,
            },
        });
        return response.data.data;
    } catch (err) {
        console.log(err);
    }
};
