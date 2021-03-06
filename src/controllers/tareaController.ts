'use strict';

import { Request, Response } from 'express';
import { TareaService } from '../services/tareaService';

export class TareaController {

    public findAll(req: Request, res: Response) {

        let query: any = {};

        if (req.query.description) {
            query.description = req.query.description;
        }

        if (req.query.actorCreador){
            query.actorCreador = req.query.actorCreador;
        }

        if (req.query.proyecto){
            query.proyecto = req.query.proyecto;
        }

        if (req.query.estado){
            query.estado = req.query.estado;
        }
        
        if (req.query.story_point_stimate){
            query.story_point_stimate = req.query.story_point_stimate;
        }

        TareaService.findAll(query)
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
        console.log(req.body)
        return;
        if (req.body.description) {
            data.description = req.body.description;
        }

        if (req.body.actorCreador){
            data.actorCreador = req.body.actorCreador;
        }

        if (req.body.proyecto){
            data.proyecto = req.body.proyecto;
        }

        if (req.body.estado){
            data.estado = req.body.estado;
        }
        
        if (req.body.story_point_stimate){
            data.story_point_stimate = req.body.story_point_stimate;
        }

        TareaService.create(data)
        .then((data: any) => {
            return res.status(data.status || 201).json(data.payload);
        })
        .catch((err: any) => {
            return res.status(err.status || 500).json({ errors: [ { general: err.msg } ] });
        });
    }
}
