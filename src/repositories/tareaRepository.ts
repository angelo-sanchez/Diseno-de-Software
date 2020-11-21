
'use strict'

import * as mongoose from 'mongoose';
import { TareaSchema } from './../models/tarea';

const TareaModel: any = mongoose.model('Tarea', TareaSchema);

export class TareaRepository {
    static findAll(query: any){
        
        return new Promise((resolve: any, reject: any) => {
            TareaModel.find(query)
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
            
            if (data.description)
                _data.description = data.description;
            
            if (data.actorCreador)
                _data.actorCreador = data.actorCreador;
            
            if (data.proyecto)
                _data.proyecto = data.proyecto;
            
            if (data.estado)
                _data.estado = data.estado;

            if (data.story_point_stimate)
                _data.story_point_stimate = data.story_point_stimate;

            const newClient = new TareaModel(_data);
            newClient.save()
                .then((newClient: any) => {
                    if (newClient)
                        resolve(newClient.getBasic());
                    else
                        resolve();
                })
                .catch((err: any) => {
                    reject({ msg: ('ROL_CREATE'), error: err })
                })
        });

    }
}
