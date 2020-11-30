import { Router } from 'express';
import server from './server';
import { config } from './utils/config';


import bodyParser from "body-parser";
const PORT = Number(config.PORT || 3000);
process.env.TZ = 'America/Argentina/Buenos_Aires';
const router: Router = Router();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));


process.on('uncaughtException', err => {
    console.log(err);
    ;
});

process.on('unhandledRejection', (reason, p) => {
    console.log(reason);
    console.log(p);
    ;
});

// Allow any method from any host and log requests
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
});


server.listen(PORT, () => {
    console.info(`Server listening on port [${PORT}] `);
})