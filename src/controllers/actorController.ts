'use strict';

import { Request, Response } from 'express';
import { ActorService } from './../services/actorService';

export class ActorController {


    public findAll(req: Request, res: Response) {

        let query: any = {};

        if (req.body.firstName) {
            query.firstName = req.body.firstName;
        }

        ActorService.findAll(query)
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
        
        if (req.body['firstName'])
            data.firstName = req.body.firstName;
        if (req.body['userName'])
            data.userName = req.body.userName;
        ActorService.create(data)
        .then((data: any) => {
            return res.status(data.status || 201).json(data.payload);
        })
        .catch((err: any) => {
            return res.status(err.status || 500).json({ errors: [ { general: err.msg } ] });
        });
    }
}