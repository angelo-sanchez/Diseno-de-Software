'use strict';

import { Request, Response } from 'express';
import { SalaService } from './../services/salaService';

export class SalaController {


    public findAll(req: Request, res: Response) {

        let query: any = {};

        if (req.query.nameSala){
            query.nameSala = req.query.nameSala;
        }

        if (req.query.members_number){
            query.members_number = req.query.members_number;
        }

        if (req.query.actor) {
            query.actor = req.query.actor;
        }

        if (req.query.metodologia){
            query.metodologia = req.query.metodologia;
        }

        SalaService.findAll(query)
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
        
        if (req.body['nameSala'])
            data.nameSala = req.body.nameSala;
        if (req.body['members_number'])
            data.members_number = req.body.members_number;
        if (req.body['actor'])
            data.actor = req.body.actor;
        if (req.body['metodologia'])
            data.metodologia = req.body.metodologia;
        if (req.body['password'])
            data.password = req.body.password;
        SalaService.create(data)
        .then((data: any) => {
            return res.status(data.status || 201).json(data.payload);
        })
        .catch((err: any) => {
            return res.status(err.status || 500).json({ errors: [ { general: err.msg } ] });
        });
    }
}