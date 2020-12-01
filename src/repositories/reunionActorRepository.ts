'use strict'

import * as mongoose from 'mongoose';
import { ReunionActor } from './../models/reunionActor';

const ReunionActorModel: any = mongoose.model('Reunion-Actor', ReunionActor);

export class ReunionActorRepository {
    static findAll(query: any){
        
        return new Promise((resolve: any, reject: any) => {
            ReunionActorModel.find(query)
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
            
            if (data.reunion)
                _data.reunion = data.reunion;
            
            if (data.actor)
                _data.actor = data.actor;

            _data.ingreso = Date.now();
            const newClient = new ReunionActorModel(_data);
            newClient.save()
                .then((newClient: any) => {
                    if (newClient)
                        resolve(newClient);
                    else
                        resolve();
                })
                .catch((err: any) => {
                    console.log(err);
                    reject({ msg: ('REUNION_CREATE'), error: err })
                })
        });

    }
    static findOne(filter: { actor: string, reunion: string, valor: Number }) {
        return ReunionActorModel.findOne(filter).exec();
    }
}
