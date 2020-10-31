'use strict';

import { Request, Response } from 'express';
import { SalaOficinaService } from '../services/salaOficinaService';

export class SalaOficinaController {

    public findAll(req: Request, res: Response) {

        let query: any = {};

        if (req.query.oficina) {
            query.oficina = req.query.oficina;
        }

        if (req.query.sala){
            query.sala = req.query.sala;
        }

        SalaOficinaService.findAll(query)
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
        
        if (req.body.oficina) {
            data.oficina = req.body.oficina;
        }

        if (req.body.sala){
            data.sala = req.body.sala;
        }

        SalaOficinaService.create(data)
        .then((data: any) => {
            return res.status(data.status || 201).json(data.payload);
        })
        .catch((err: any) => {
            return res.status(err.status || 500).json({ errors: [ { general: err.msg } ] });
        });
    }
}
