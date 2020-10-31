'use strict';

import { Request, Response } from 'express';
import { ReunionService } from '../services/reunionService';

export class ReunionController {

    public findAll(req: Request, res: Response) {

        let query: any = {};

        if (req.query.actorCreator) {
            query.actorCreator = req.query.actorCreator;
        }

        if (req.query.sala){
            query.sala = req.query.sala;
        }

        if (req.query.proyecto) {
            query.proyecto = req.query.proyecto;
        }

        if (req.query.fecha_inicio){
            query.fecha_inicio = req.query.fecha_inicio;
        }

        if (req.query.fecha_fin){
            query.fecha_fin = req.query.fecha_fin;
        }

        ReunionService.findAll(query)
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
        
        if (req.body.actorCreator) {
            data.actorCreator = req.body.actorCreator;
        }

        if (req.body.sala){
            data.sala = req.body.sala;
        }

        if (req.body.proyecto) {
            data.proyecto = req.body.proyecto;
        }

        if (req.body.fecha_inicio){
            data.fecha_inicio = req.body.fecha_inicio;
        }

        if (req.body.fecha_fin){
            data.fecha_fin = req.body.fecha_fin;
        }


        ReunionService.create(data)
        .then((data: any) => {
            return res.status(data.status || 201).json(data.payload);
        })
        .catch((err: any) => {
            return res.status(err.status || 500).json({ errors: [ { general: err.msg } ] });
        });
    }
}
