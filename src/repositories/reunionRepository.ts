'use strict'

import * as mongoose from 'mongoose';
import { ReunionSchema } from './../models/reunion';

const ReunionModel: any = mongoose.model('Reunión', ReunionSchema);

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

            if(data.nombreReunion)
                _data.nombreReunion = data.nombreReunion;
            
            if (data.actorCreator)
                _data.actorCreator = data.actorCreator;

            if (data.fecha_inicio){
                _data.fecha_inicio = data.fecha_inicio;
            }

            if (data.duracion)
                _data.duracion = data.duracion;

            const newClient = new ReunionModel(_data);
            newClient.save()
                .then((newClient: any) => {
                    if (newClient)
                        resolve(newClient.getBasic());
                    else
                        resolve();
                })
                .catch((err: any) => {
                    reject({ msg: ('REUNION_CREATE_Repository'), error: err })
                })
        });

    }

    static findOne(filter: { nombreReunion: string }) {
        return ReunionModel.findOne(filter).exec();
    }}
