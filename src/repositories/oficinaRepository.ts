'use strict'

import * as mongoose from 'mongoose';
import { OficinaSchema } from './../models/oficina';

const OficinaModel: any = mongoose.model('Oficina', OficinaSchema);

export class OficinaRepository {
    static findAll(query: any){
        
        return new Promise((resolve: any, reject: any) => {
            OficinaModel.find(query)
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
            
            if (data.nombreOficina)
                _data.nombreOficina = data.nombreOficina;

            const newClient = new OficinaModel(_data);
            newClient.save()
                .then((newClient: any) => {
                    if (newClient)
                        resolve(newClient.getBasic());
                    else
                        resolve();
                })
                .catch((err: any) => {
                    reject({ msg: ('METODOLOGIA_CREATE'), error: err })
                })
        });

    }
}
