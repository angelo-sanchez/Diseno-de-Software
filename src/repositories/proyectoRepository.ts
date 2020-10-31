'use strict'

import * as mongoose from 'mongoose';
import { ProyectoSchema } from './../models/proyecto';

const ProyectoModel: any = mongoose.model('Proyecto', ProyectoSchema);

export class ProyectoRepository {
    static findAll(query: any){
        return new Promise((resolve: any, reject: any) => {
            ProyectoModel.find(query)
                .then((data: any) => {
                    if (data) {
                        resolve(data)
                    } else 
                        resolve();
                })
                .catch((err: any) => {
                    console.error(err);
                })
        })
    }

    static create(data: any) {

        return new Promise((resolve: any, reject: any) => {
            const _data: any = {};
            
            if (data.nameProject)
                _data.nameProject = data.nameProject;
            
            if (data.descriptionProject)
                _data.descriptionProject = data.descriptionProject;
            
            if (data.sala)
                _data.sala = data.sala;
            
            if (data.stateProject)
                _data.stateProject = data.stateProject;
            
            if (data.fecha_limite_fin)
                _data.fecha_limite_fin = data.fecha_limite_fin;
            
            if (data.fecha_inicio_desarrollo)
                _data.fecha_inicio_desarrollo = data.fecha_inicio_desarrollo;

            if (data.fecha_finalizacion_desarrollo)
                _data.fecha_finalizacion_desarrollo = data.fecha_finalizacion_desarrollo;

            const newClient = new ProyectoModel(_data);
            newClient.save()
                .then((newClient: any) => {
                    if (newClient)
                        resolve(newClient.getBasic());
                    else
                        resolve();
                })
                .catch((err: any) => {
                    reject({ msg: ('PROJECT_CREATE'), error: err })
                })
        });

    }
}
