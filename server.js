const next = require('next');
const connectDB = require('./server/db/connect');

const dev = process.env.NODE_ENV !== 'production';
const server = next({ dev });
const handle = server.getRequestHandler();

const app = require('./server/app');
const { PORT } = require('./config/keys');

server.prepare().then(() => {
    app.get('*', (req, res) => {
        return handle(req, res);
    });

    try {
        connectDB()
            .then((res) => {
                console.log('Connected to the database');

                app.listen(PORT, () => {
                    console.log(`server is listening on port ${PORT}`);
                });
            })
            .catch((err) => {
                process.exit(1);
            });
    } catch (err) {
        console.error(err.message);

        // Exit process with faliure
        process.exit(1);
    }
});

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
