
'use strict'

import * as mongoose from 'mongoose';
import { SalaSchema } from './../models/sala';

const SalaModel: any = mongoose.model('Sala', SalaSchema);

export class SalaRepository {

    static findAll(query: any){
        return new Promise((resolve: any, reject: any) => {
            SalaModel.find(query)
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
            
            if (data.nameSala)
                _data.nameSala = data.nameSala;
            if (data.members_number)
                _data.members_number = data.members_number;
            if (data.actor)
                _data.actor = data.actor;
            if (data.password)
                _data.password = data.password;
                  
            const newClient = new SalaModel(_data);
            newClient.save()
                .then((newClient: any) => {
                    if (newClient)
                        resolve(newClient.getBasic());
                    else
                        resolve();
                })
                .catch((err: any) => {
                    reject({ msg: ('ACTOR.ERROR_CREATE'), error: err })
                })
        });

    }

}