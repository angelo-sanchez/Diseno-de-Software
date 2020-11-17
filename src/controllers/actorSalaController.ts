'use strict';

import { Request, Response } from 'express';
import { ActorSalaService } from '../services/actorSalaService';

export class ActorSalaController {

    public findAll(req: Request, res: Response) {

        let query: any = {};

        if (req.query.usuario) {
            query.usuario = req.query.usuario;
        }

        if (req.query.sala){
            query.sala = req.query.sala;
        }

        if (req.query.rol) {
            query.rol = req.query.rol;
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
        
        if (req.body['id'])
            data.usuario.id = req.body.id;
        if (req.body['entrada'])
            data.usuario.entrada = req.body.entrada;
        if (req.body['salida'])
            data.usuario.salida = req.body.salida;
        if (req.body['rol'])
            data.usuario.rol = req.body.rol;
        if(req.body['sala'])
        data.sala = req.body.sala

        ActorSalaService.create(data)
        .then((data: any) => {
            return res.status(data.status || 201).json(data.payload);
        })
        .catch((err: any) => {
            return res.status(err.status || 500).json({ errors: [ { general: err.msg } ] });
        });
    }
}
