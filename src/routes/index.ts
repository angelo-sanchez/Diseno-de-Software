import { ActorController } from './../controllers/actorController';
import cors from 'cors';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { config } from '../utils/config';

import { TestRouter } from './testRouter';
import { ActorRouter } from './actorRouter';

export class Routes {

    public routes(app: any): void {

        // Validate requests from whitelist hosts
        const whitelist = config.CORS.WHITELIST;
        const corsOptionsDelegate = function (req: Request, callback: any) {
            let corsOptions;
            corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
            callback(null, corsOptions) // callback expects two parameters: error and options
        }

        // Options for cors midddleware
        const options: cors.CorsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: '*',
            preflightContinue: false
        };

        // Use cors middleware
        app.use(cors(corsOptionsDelegate));

        // Enable pre-flight
        app.options("*", cors(options));

        // Routes
        app.use('/api/test', TestRouter);
        app.use('/api/actor', ActorRouter);
    }

     

}