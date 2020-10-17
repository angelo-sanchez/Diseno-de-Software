import express from 'express';
import * as bodyParser from 'body-parser';

class Server {

    public app: express.Application;



    constructor() {
        this.app = express();
        // Mongodb connection
        //this.mongoSetup();

        
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        
    }


    // private mongoSetup(): void {
    //     mongoose.Promise = global.Promise;
    //     mongoose.connect(this.mongoUrl, { 
    //         useUnifiedTopology: true, 
    //         useNewUrlParser: true,
    //         useFindAndModify: false,
    //         useCreateIndex: true
    //     });
    // }
}

export default new Server().app;