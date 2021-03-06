import { JiraRouter } from './jiraRouter';
import { ReunionRoutes } from './reunionRoutes';
import { TareaRoutes } from './tareaRouter';
import { TareaActorRoutes } from './tareaActorRoutes';
import { SalaOficinaRoutes } from './salaOficinaRouter';
import { ReunionActorRoutes } from './reunionActorRouter';
import { OficinaRouter } from './oficinaRouter';
import { MetodologiaRouter } from './metodologiaRouter';
import { SalaRouter } from './salaRouter';
import { ActorSalaRouter } from './actorSalaRouter';
import { ActorOficinaRouter } from './actorOficinaRouter';
import cors from 'cors';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { config } from '../utils/config';

import { TestRouter } from './testRouter';
import { ActorRouter } from './actorRouter';
import { ProyectoRouter } from './proyectoRouter';
import { LoginRouter } from './LoginRouter';
import { LogoutRouter } from './logoutRouter';
import { RolRouter } from "./RolRouter";
import { recordRouter } from './recordRouter';
import { UserStoryRouter } from './userStoryRouter';

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
        app.use('/api/actorSala', ActorSalaRouter);
        app.use('/api/sala', SalaRouter);
        app.use('/api/metodologia', MetodologiaRouter);
        app.use('/api/oficina', OficinaRouter);
        app.use('/api/proyecto', ProyectoRouter);
        app.use('/api/reunionActor', ReunionActorRoutes);
        app.use('/api/salaOficina', SalaOficinaRoutes);
        app.use('/api/tareaActor', TareaActorRoutes);
        app.use('/api/tarea', TareaRoutes);
        app.use('/api/reunion', ReunionRoutes);
        app.use('/api/jira', JiraRouter);
        app.use('/api/login', LoginRouter);
        app.use('/api/logout', LogoutRouter);
        app.use('/api/record', recordRouter);
        app.use('/api/actorOficina', ActorOficinaRouter);
        app.use('/api/rol', RolRouter);
        app.use('/api/userStory', UserStoryRouter);

        app.use('/api', function (req: Request, res: Response) {
            res.send("API Diseño de Software")
        });
    }



}