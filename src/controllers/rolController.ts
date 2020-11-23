'use strict';

import { Request, Response } from 'express';
import { RolService } from '../services/rolService';

export class RolController {

    public findAll(req: Request, res: Response) {

        let query: any = {};

        if (req.query.nombre) {
            query.nombre = req.query.nombre;
        }

        if (req.query.metodologia){
            query.metodologia = req.query.metodologia;
        }

        if (req.query.numero_jerarquico){
            query.numero_jerarquico = req.query.numero_jerarquico;
        }


        RolService.findAll(query)
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
        if (req.body.nombre) {
            data.nombre = req.body.nombre;
        }

        if (req.body.metodologia){
            data.metodologia = req.body.metodologia;
        }

        if (req.body.numero_jerarquico){
            data.numero_jerarquico = req.body.numero_jerarquico;
        }


        RolService.create(data)
        .then((data: any) => {
            return res.status(data.status || 201).json(data.payload);
        })
        .catch((err: any) => {
            return res.status(err.status || 500).json({ errors: [ { general: err.msg } ] });
        });
    }
}
