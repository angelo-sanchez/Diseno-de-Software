'use strict';

import { Request, Response } from 'express';
import { OficinaService } from '../services/oficinaService';

export class OficinaController {

    public findAll(req: Request, res: Response) {

        let query: any = {};

        if (req.params.nombreOficina) {
            query.nombreOficina = req.params.nombreOficina;
        }

        OficinaService.findAll(query)
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
        
        if (req.body['nombreOficina'])
            data.nombreOficina = req.body['nombreOficina'];
            
        OficinaService.create(data)
        .then((data: any) => {
            return res.status(data.status || 201).json(data.payload);
        })
        .catch((err: any) => {
            return res.status(err.status || 500).json({ errors: [ { general: err.msg } ] });
        });
    }
}
