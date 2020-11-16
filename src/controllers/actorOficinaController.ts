'use strict';

import { Request, Response } from 'express';
import { ActorOficinaService } from '../services/actorOficinaService';

export class ActorOficinaController {

    public findAll(req: Request, res: Response) {

        let query: any = {};

        if (req.query.usuario) {
            query.usuario = req.query.usuario;
        }

        if (req.query.sala){
            query.sala = req.query.sala;
        }
        

        ActorOficinaService.findAll(query)
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
        
        if (req.body['id'])
            data.id = req.body.id;
        if (req.body['entrada'])
            data.entrada = req.body.entrada;
        if (req.body['salida'])
            data.salida = req.body.salida;

        ActorOficinaService.create(data)
        .then((data: any) => {
            return res.status(data.status || 201).json(data.payload);
        })
        .catch((err: any) => {
            return res.status(err.status || 500).json({ errors: [ { general: err.msg } ] });
        });
    }
}