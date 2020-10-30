'use strict'

import * as mongoose from 'mongoose';
import { ReunionSchema } from './../models/reunion';

const ReunionModel: any = mongoose.model('Reunion', ReunionSchema);

export class ReunionRepository {
    static findAll(query: any){
        
        return new Promise((resolve: any, reject: any) => {
            ReunionModel.find(query)
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
            
            if (data.actorCreator)
                _data.actorCreator = data.actorCreator;
            
            if (data.sala)
                _data.sala = data.sala;
            
            if (data.proyecto)
                _data.proyecto = data.proyecto;

            if (data.fecha_inicio)
                _data.fecha_inicio = data.fecha_inicio;

            if (data.fecha_fin)
                _data.fecha_fin = data.fecha_fin;

            const newClient = new ReunionModel(_data);
            newClient.save()
                .then((newClient: any) => {
                    if (newClient)
                        resolve(newClient.getBasic());
                    else
                        resolve();
                })
                .catch((err: any) => {
                    reject({ msg: ('REUNION_CREATE'), error: err })
                })
        });

    }
}
