'use strict';

import { Request, Response } from 'express';
import { ProyectoService } from '../services/proyectoService';

export class ProyectoController {

    public findAll(req: Request, res: Response) {

        let query: any = {};

        if (req.params.nameProject) {
            query.nameProject = req.params.nameProject;
        }

        if (req.params.descriptionProject){
            query.descriptionProject = req.params.descriptionProject;
        }

        if (req.params.sala) {
            query.sala = req.params.sala;
        }

        if (req.params.stateProject){
            query.stateProject = req.params.stateProject;
        }

        if (req.params.fecha_limite_fin){
            query.fecha_limite_fin = req.params.fecha_limite_fin;
        }

        if (req.params.fecha_inicio_desarrollo) {
            query.fecha_inicio_desarrollo = req.params.fecha_inicio_desarrollo;
        }

        if (req.params.fecha_finalizacion_desarrollo){
            query.fecha_finalizacion_desarrollo = req.params.fecha_finalizacion_desarrollo;
        }

        ProyectoService.findAll(query)
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
        
        if (req.body.nameProject) {
            data.nameProject = req.body.nameProject;
        }

        if (req.body.descriptionProject){
            data.descriptionProject = req.body.descriptionProject;
        }

        if (req.body.sala) {
            data.sala = req.body.sala;
        }

        if (req.body.stateProject){
            data.stateProject = req.body.stateProject;
        }

        if (req.body.fecha_limite_fin){
            data.fecha_limite_fin = req.body.fecha_limite_fin;
        }

        if (req.body.fecha_inicio_desarrollo) {
            data.fecha_inicio_desarrollo = req.body.fecha_inicio_desarrollo;
        }

        if (req.body.fecha_finalizacion_desarrollo){
            data.fecha_finalizacion_desarrollo = req.body.fecha_finalizacion_desarrollo;
        }


        ProyectoService.create(data)
        .then((data: any) => {
            return res.status(data.status || 201).json(data.payload);
        })
        .catch((err: any) => {
            return res.status(err.status || 500).json({ errors: [ { general: err.msg } ] });
        });
    }
}
