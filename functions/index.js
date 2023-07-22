const next = require('next');
const connectDB = require('./server/db/connect');
const { onRequest } = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');
const cron = require('node-cron');

const dev = process.env.NODE_ENV !== 'production';

const { parse } = require('url');

const server = require('./server/app');
const duplicatePrevent = require('./duplicatePrevent');
const fetchData = require('./server/utils/fetchData');
// const { PORT } = require('./config/keys');
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    connectDB().catch((err) => console.log(err));
    cron.schedule('0 0 * * *', async () => {
        try {
            await fetchData();

            console.log('Data updated successfully');
        } catch (error) {
            console.error('Error occurred while updating data:', error);
        }
    });

    // cron.schedule('0 16 * * *', () => {
    //     duplicatePrevent().catch((err) => {
    //         console.log(err);
    //     });
    //     // Add your code here to perform the desired task
    // });
});
exports.nextServer = onRequest({ cors: true }, server);

process.on('uncaughtException', (err) => {
    console.log('Uncaught exception: shutting down the app');
    console.log(err.name, err.message);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION: Shutting down the app');
    server.close(() => {
        process.exit(1);
    });
});
