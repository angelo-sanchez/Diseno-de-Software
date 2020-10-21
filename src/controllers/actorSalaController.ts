'use strict';

import { Request, Response } from 'express';
import { ActorSalaService } from '../services/actorSalaService';

export class ActorSalaController {

    public findAll(req: Request, res: Response) {

        let query: any = {};

        if (req.body.name) {
            query.name = req.body.name;
        }

        ActorSalaService.findAll(query)
            .then((data: any) => {
                return res.status(data.status || 200).json(data.payload);
            })
            .catch((err: any) => {
                console.log(err);
                return res.status(err.status || 500).json({ errors: [ { general: err.msg } ] });
            });
    }

    public create(req:Request, res:Response) {
        const data : any = {};
        
        if (req.body['name'])
            data.name = req.body.name;
        if (req.body['capacidad'])
            data.capacidad = req.body.capacidad;
        ActorSalaService.create(data)
        .then((data: any) => {
            return res.status(data.status || 201).json(data.payload);
        })
        .catch((err: any) => {
            return res.status(err.status || 500).json({ errors: [ { general: err.msg } ] });
        });
    }
}
