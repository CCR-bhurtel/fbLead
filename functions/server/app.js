const express = require('express');

const facebookWebhookController = require('./hooks/facebookWebhook');
const ninoxWebHookController = require('./hooks/ninoxWebhook');
const cors = require('cors');
const { FACEBOOK_WEBHOOK_VERIFY_TOKEN } = require('../config/keys');

const userRouter = require('./Routes/user');
const formRouter = require('./Routes/form');
const authProtect = require('./middleware/authProtect');
const errorController = require('./controllers/errorController');
const path = require('path');
const ninoxRouter = require('./Routes/ninox');
const respondRouter = require('./Routes/respond');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'out')));

// Define the route for the webhook endpoint

app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/form', authProtect, formRouter);
app.use('/api/data', ninoxRouter);

app.use('/api/respond', respondRouter);

app.use(cors({ origin: ['*'] }));

app.get('/facebookwebhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === FACEBOOK_WEBHOOK_VERIFY_TOKEN) {
        console.log('Webhook verified');
        res.status(200).send(challenge);
    } else {
        console.error('Verification failed. Invalid token.');
        res.sendStatus(403);
    }
});
app.get('/privacypolicy', (req, res) => {
    return res.send('<h2>Privacy policy</h2>');
});
app.get('/tos', (req, res) => {
    return res.send('<h2>Terms of service</h2>');
});
app.post('/facebookwebhook', facebookWebhookController);

app.post('/ninoxwebhook', ninoxWebHookController);

app.use(errorController);
// Start the server

module.exports = app;
