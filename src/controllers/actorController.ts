'use strict';

import { Request, Response } from 'express';
import { ActorService } from './../services/actorService';

export class ActorController {


    public findAll(req: Request, res: Response) {

        let query: any = {};

        if (req.query.firstName){
            query.firstName = req.query.firstName;
        }

        if (req.query.surname) {
            query.surname = req.query.surname;
        }

        if (req.query.email) {
            query.email = req.query.email;
        }

        if(req.query.nameid){
            query.nameid = req.query.nameid;
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

    public getAllNameid(req: Request, res: Response){
        
    }

    public create(req:Request, res:Response) {
        const data : any = {};
        
        if (req.body['firstName'])
            data.firstName = req.body.firstName;
        if (req.body['surname'])
            data.surname = req.body.surname;
        if (req.body['email'])
            data.email = req.body.email;
        if (req.body['password'])
            data.password = req.body.password;
        ActorService.create(data)
        .then((data: any) => {
            return res.status(data.status || 201).json(data.payload);
        })
        .catch((err: any) => {
            return res.status(err.status || 500).json({ errors: [ { general: err.msg } ] });
        });
    }
}