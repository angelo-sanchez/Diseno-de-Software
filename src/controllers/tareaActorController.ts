'use strict';

import { Request, Response } from 'express';
import { TareaActorService } from '../services/tareaActorService';

export class TareaActorController {

    public findAll(req: Request, res: Response) {

        let query: any = {};

        if (req.query.tarea) {
            query.tarea = req.query.tarea;
        }

        if (req.query.actor){
            query.actor = req.query.actor;
        }

        TareaActorService.findAll(query)
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
        
        if (req.body.actor) {
            data.actor = req.body.actor;
        }

        if (req.body.tarea){
            data.tarea = req.body.tarea;
        }

        TareaActorService.create(data)
        .then((data: any) => {
            return res.status(data.status || 201).json(data.payload);
        })
        .catch((err: any) => {
            return res.status(err.status || 500).json({ errors: [ { general: err.msg } ] });
        });
    }
}
