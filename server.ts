import express from 'express';
import * as bodyParser from 'body-parser';

class Server {

    public app: express.Application;
    
    constructor() {
        this.app = express();
        // Mongodb connection
        //this.mongoSetup();

        
    }
}

export default new Server().app;