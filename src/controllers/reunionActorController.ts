'use strict';

import { Request, Response } from 'express';
import { ReunionActorRepository } from '../repositories/reunionActorRepository';
import { ReunionActorService } from '../services/reunionActorService';

export class ReunionActorController {

    public findAll(req: Request, res: Response) {

        let query: any = {};

        if (req.query.reunion) {
            query.reunion = req.query.reunion;
        }

        if (req.query.actor){
            query.actor = req.query.actor;
        }

        if(req.query.value){
            query.value = req.query.value;
        }

        ReunionActorService.findAll(query)
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
        
        if (req.body.reunion) {
            data.reunion = req.body.reunion;
        }

        if (req.body.actor){
            data.actor = req.body.actor;
        }

        

        if(req.body.value){
            data.value = req.body.value;
        }

        ReunionActorService.create(data)
        .then((data: any) => {
            return res.status(data.status || 201).json(data.payload);
        })
        .catch((err: any) => {
            return res.status(err.status || 500).json({ errors: [ { general: err.msg } ] });
        });
    }

    public async setValue(req:Request, res:Response){
        try {
            if(!(req.body && req.body.actor && req.body.reunion && req.body.value))
            throw {
                status: 400,
                detail: "Error: La consulta no contiene los parámetros necesarios\n"
                    + "\tSe espera body: { nameid, nombreReunion, value }"
            }
            const { actor, reunion, value } = req.body;
            const reunionActor = await ReunionActorRepository.findOne({ actor, reunion, valor: null });
                reunionActor.set("value" , value);
                reunionActor.save();
            return res.status(200).json({out:reunionActor});
        }catch (error) {
             return res.status(error.status || 500).json({ error: error.detail || error });
             }
    }

    public async getActoresReunion (req: Request, res:Response){
        try {
            if(!req.body)
            throw {
                status: 400,
                detail: "Error: La consulta no contiene los parámetros necesarios\n"
                    + "\tSe espera body: { nombreReunion }"
            }
            const {nombreReunion} = req.body;
            const dbResults: any = await ReunionActorRepository.findAll({reunion: nombreReunion});
            const results: any = {
                nombre: nombreReunion,
                items: []
            }
            for (const item of dbResults) {
                results.items.push({
                    user_id: item.actor, // No sé si esto retorna bien
                    value: item.value
                }); }
                return res.status(200).json({out:results});
       }catch(error){
        return res.status(error.status || 500).json({ error: error.detail || error });
       }
       
    }
}
