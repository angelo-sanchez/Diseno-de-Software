
'use strict'

import * as mongoose from 'mongoose';
import { SalaOficina } from './../models/salaOficina';

const SalaOficinaModel: any = mongoose.model('Sala-Oficina', SalaOficina);

export class SalaOficinaRepository {
    static findAll(query: any){
        
        return new Promise((resolve: any, reject: any) => {
            SalaOficinaModel.find(query)
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
            
            if (data.oficina)
                _data.oficina = data.oficina;
            
            if (data.sala)
                _data.sala = data.sala;

            const newClient = new SalaOficinaModel(_data);
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
