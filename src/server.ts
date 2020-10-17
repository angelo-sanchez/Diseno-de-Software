import express from 'express';
import * as bodyParser from 'body-parser';
import mongoose = require("mongoose");
import { config } from './utils/config';
import { Routes } from './routes';
class Server {
    public routePrv: Routes = new Routes();
    public mongoUrl: string = config.MONGO_DB.CONN_STRING;
    public app: express.Application;



    constructor() {
        this.app = express();
        // Mongodb connection
        this.mongoSetup();
        
        this.routePrv.routes(this.app);
        
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        
    }


    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        console.log(this.mongoUrl);
        mongoose.connect(this.mongoUrl, { 
            useUnifiedTopology: true, 
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    }
}

export default new Server().app;