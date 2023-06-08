const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../', 'config.env') });

const NINOX_API_KEY = process.env.NINOX_API_KEY;
const NINOX_DATABASE_ID = process.env.NINOX_DATABASE_ID;
const NINOX_FIRST_TABLE_ID = process.env.NINOX_FIRST_TABLE_ID;
const NINOX_SECOND_TABLE_ID = process.env.NINOX_SECOND_TABLE_ID;
const NINOX_THIRD_TABLE_ID = process.env.NINOX_THIRD_TABLE_ID;
const NODE_ENV = process.env.NODE_ENV || 'production';

const NINOX_TEAM_ID = process.env.NINOX_TEAM_ID;
const PORT = process.env.PORT || 8000;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
const FACEBOOK_PAGE_ACCESS_TOKEN = process.env.FACEBOOK_APP_ACCESS_TOKEN;
const FACEBOOK_PAGE_ACCESS_TOKEN_TYPE = process.env.FACEBOOK_APP_ACCESS_TOKEN_TYPE;
const FACEBOOK_WEBHOOK_VERIFY_TOKEN = process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN;
const FACEBOOK_USER_ACCESS_TOKEN = process.env.FACEBOOK_USER_ACCESS_TOKEN;
const NINOX_BASE_API = process.env.NINOX_BASE_API;
const MONGODB = process.env.MONGODB;
const RESPOND_IO_TOKEN = process.env.RESPOND_IO_TOKEN;
const RESPOND_IO_BASE_API = process.env.RESPOND_IO_BASE_API;
module.exports = {
    NINOX_API_KEY,
    RESPOND_IO_BASE_API,
    RESPOND_IO_TOKEN,
    NINOX_DATABASE_ID,
    NINOX_FIRST_TABLE_ID,
    NINOX_SECOND_TABLE_ID,
    FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET,
    PORT,
    NINOX_THIRD_TABLE_ID,
    FACEBOOK_PAGE_ACCESS_TOKEN,
    FACEBOOK_PAGE_ACCESS_TOKEN_TYPE,
    FACEBOOK_WEBHOOK_VERIFY_TOKEN,
    FACEBOOK_USER_ACCESS_TOKEN,
    NINOX_TEAM_ID,
    NINOX_BASE_API,
    MONGODB,
};