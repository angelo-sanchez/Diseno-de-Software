
'use strict'

import * as mongoose from 'mongoose';
import { RolSchema } from './../models/rol';

const RolModel: any = mongoose.model('Rol', RolSchema);

export class RolRepository {
    static findAll(query: any){
        
        return new Promise((resolve: any, reject: any) => {
            RolModel.find(query)
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
            
            if (data.nombre)
                _data.nombre = data.nombre;
            
            if (data.metodologia)
                _data.metodologia = data.metodologia;

            if (data.numero_jerarquico)
                _data.numero_jerarquico = data.numero_jerarquico;

            const newClient = new RolModel(_data);
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
