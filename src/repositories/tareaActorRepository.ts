
'use strict'

import * as mongoose from 'mongoose';
import { TareaActor } from './../models/tareaActor';

const TareaActorModel: any = mongoose.model('Rol', TareaActor);

export class TareaActorRepository {
    static findAll(query: any){
        
        return new Promise((resolve: any, reject: any) => {
            TareaActorModel.find(query)
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
            
            if (data.tarea)
                _data.tarea = data.tarea;
            
            if (data.actor)
                _data.actor = data.actor;

            const newClient = new TareaActorModel(_data);
            newClient.save()
                .then((newClient: any) => {
                    if (newClient)
                        resolve(newClient.getBasic());
                    else
                        resolve();
                })
                .catch((err: any) => {
                    reject({ msg: ('TAREA_ACTOR_CREATE'), error: err })
                })
        });

    }
}
