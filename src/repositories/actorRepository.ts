'use strict'

import * as mongoose from 'mongoose';
import { ActorSchema } from './../models/actor';

const ActorModel: any = mongoose.model('Actor', ActorSchema);

export class ActorRepository {

    static findAll(query: any){
        return new Promise((resolve: any, reject: any) => {
            ActorModel.find(query)
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
            
            if (data.firstName)
                _data.firstName = data.firstName;
            if (data.surname)
                _data.surname = data.surname;
            if (data.email)
                _data.email = data.email;
            if (data.password)
                _data.password = data.password;
                  
            const newClient = new ActorModel(_data);
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