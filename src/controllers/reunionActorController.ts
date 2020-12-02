'use strict';

import { Request, Response } from 'express';
import { ReunionActorRepository } from '../repositories/reunionActorRepository';
import { ActorRepository } from '../repositories/actorRepository';
import { ReunionActorService } from '../services/reunionActorService';
import { isTemplateSpan } from 'typescript';
import { request } from 'http';

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

    public async create(req:Request, res:Response) {
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
        try {
            let created:any = await ReunionActorRepository.create(data)
            return res.status(created.status || 201).json(created.payload || created);
        }
        catch (err) {
            return res.status(err.status || 500).json({ errors: [{ general: err.msg || err, detalle: err.error || err }] });
        }
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
        if(req.body){
           
            const ActorResults: any = await ActorRepository.findAll({});
            
            const results: any = {
                nombre: "ParticipacionesMeeting",
                items: []
            }
            for (const item of ActorResults) {
                var valor = 0
             const ReunionResults: any = await ReunionActorRepository.findAll({actor: item.nameid})
             for(const it of ReunionResults){
                 valor += it.value;
             }
 results.items.push({
                    user_id: item.nameid, // No sé si esto retorna bien
                    value: valor   
                }); }

                return res.status(200).json({out:results}); 
       }else {
        return res.status(500).json( "error al cargar" );
       }
    }

}
