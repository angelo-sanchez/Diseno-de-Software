'use strict';

import { Request, Response } from 'express';
import { ReunionActorService } from '../services/reunionActorService';

export class ReunionActorController {

    public findAll(req: Request, res: Response) {

        let query: any = {};

        if (req.query.reunion) {
            query.reunion = req.query.reunion;
        }

        if (req.query.actor){
            query.actor = req.query.actor;
        }

        ReunionActorService.findAll(query)
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
        
        if (req.body.reunion) {
            data.reunion = req.body.reunion;
        }

        if (req.body.actor){
            data.actor = req.body.actor;
        }

        ReunionActorService.create(data)
        .then((data: any) => {
            return res.status(data.status || 201).json(data.payload);
        })
        .catch((err: any) => {
            return res.status(err.status || 500).json({ errors: [ { general: err.msg } ] });
        });
    }
}
