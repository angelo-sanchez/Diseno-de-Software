'use strict'

import * as mongoose from 'mongoose';
import { MetodologiaSchema } from './../models/metodologia';

const MetodologiaModel: any = mongoose.model('Metodologia', MetodologiaSchema);

export class MetologiaRepository {
    static findAll(query: any){
        
        return new Promise((resolve: any, reject: any) => {
            MetodologiaModel.find(query)
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
            
            if (data.nameMetodologia)
                _data.nameMetodologia = data.nameMetodologia;

            const newClient = new MetodologiaModel(_data);
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
