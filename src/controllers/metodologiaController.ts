'use strict';

import { Request, Response } from 'express';
import { MetodologiaService } from '../services/metodologiaService';

export class ActorSalaController {

    public findAll(req: Request, res: Response) {

        let query: any = {};

        if (req.params.nameMetodlogia) {
            query.nameMetodologia = req.params.nameMetodlogia;
        }

        MetodologiaService.findAll(query)
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
        
        if (req.body['nameMetodologia'])
            data.nameMetodologia = req.body.nameMetodologia;
            
        MetodologiaService.create(data)
        .then((data: any) => {
            return res.status(data.status || 201).json(data.payload);
        })
        .catch((err: any) => {
            return res.status(err.status || 500).json({ errors: [ { general: err.msg } ] });
        });
    }
}
