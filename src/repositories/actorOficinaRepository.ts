'use strict'

import * as mongoose from 'mongoose';
import { ActorOficinaSchema } from './../models/actorOficina';

const ActorOficinaModel: any = mongoose.model('Actor-Oficina', ActorOficinaSchema);

export class ActorOficinaRepository {
    static findAll(query: any){
        
        return new Promise((resolve: any, reject: any) => {
            ActorOficinaModel.find(query)
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
            if (data.usuario)
                _data.usuario = data.usuario;
            if (data.oficina)
                _data.oficina = data.oficina;
            _data.entrada = Date.now();
            const newClient = new ActorOficinaModel(_data);
            newClient.save()
                .then((newClient: any) => {
                    if (newClient)
                        resolve(newClient.getBasic());
                    else
                        resolve();
                })
                .catch((err: any) => {
                    reject({ msg: ('ACTOROFICINA.ERROR_CREATE'), error: err })
                })
        });

    }

    static findOne(filter: { usuario: string, oficina: string, salida: Date }) {
        return ActorOficinaModel.findOne(filter).exec();
    }
}