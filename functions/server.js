const next = require('next');
const connectDB = require('./server/db/connect');
const cron = require('node-cron');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production';

const { parse } = require('url');

const server = require('./server/app');
const duplicatePrevent = require('./duplicatePrevent');

// const { PORT } = require('./config/keys');
const app = next({ dev: true });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
    cron.schedule('0 14 * * *', () => {
        duplicatePrevent().catch((err) => {
            console.log(err);
        });
        // Add your code here to perform the desired task
    });
    await connectDB();
    console.log('Connected to the database');
    server.all('*', (req, res) => {
        const parsedUrl = parse(req.url, true);
        return handle(req, res, parsedUrl);
    });
    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('Express server is running of port 3000');
    });
});

process.on('uncaughtException', (err) => {
    console.log('Uncaught exception: shutting down the app');
    console.log(err.name, err.message);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION: Shutting down the app');
    process.exit(1);
});
