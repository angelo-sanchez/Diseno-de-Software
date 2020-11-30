'use strict';

import { Request, Response } from 'express';
import { ReunionRepository } from '../repositories/reunionRepository';
import { ReunionService } from '../services/reunionService';

export class ReunionController {

    public findAll(req: Request, res: Response) {

        let query: any = {};

        if(req.query.nombreReunion){
            query.nombreReunion = req.query.nombreReunion;
        }

        if (req.query.actorCreator) {
            query.actorCreator = req.query.actorCreator;
        }

        if(req.query.dialogo){
            query.dialogo = req.query.dialogo;
        }

        if(req.query.dia && req.query.hora){
            const fecha = new Date(req.query.dia+" "+req.query.hora)
            //const [hh, mm] = req.body.hora.split(":")
            //fecha.setHours(parseInt(hh), parseInt(mm), 0)
            query.fecha_inicio = fecha;
        }

        if (req.query.duracion){
            query.duracion = req.query.duracion;
        }

        ReunionService.findAll(query)
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

        if (req.body.nombreReunion){
            data.nombreReunion = req.body.nombreReunion;
        }
        
        if (req.body.actorCreator) {
            data.actorCreator = req.body.actorCreator;
        }

        if(req.body.dialogo){
            data.dialogo = req.body.dialogo;
        }

        if(req.body.dia && req.body.hora){
            data.fecha_inicio = new Date(req.body.dia+" "+ req.body.hora)
           // const [hh, mm] = req.body.hora.split(":")
           // data.fecha_inicio.setHours(parseInt(hh), parseInt(mm), 0)
        }

        if(req.body.duracion){
            data.duracion = req.body.duracion;
        }


        ReunionService.create(data)
        .then((data: any) => {
            return res.status(data.status || 201).json(data.payload);
        })
        .catch((err: any) => {
            return res.status(err.status || 500).json({ errors: [ { general: err.msg } ] });
        });
    }

    public async setDialogo(req: Request, res: Response){
        try {
            if(!(req.body))
            throw {
                status: 400,
                detail: "Error: La consulta no contiene los parámetros necesarios\n"
                    + "\tSe espera body: { nombreReunion, dialogo }"
            }
            const { nombreReunion, dialogo } = req.body;
            const reunion = await ReunionRepository.findOne({ nombreReunion });
                reunion.set("dialogo", dialogo);
                reunion.save();
            return res.status(200).json({out:true});
        }catch (error) {
             return res.status(error.status || 500).json({ error: error.detail || error });
             }
    }
}
