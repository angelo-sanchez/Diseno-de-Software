'use strict'

import * as mongoose from 'mongoose';
import { ReunionSchema } from './../models/reunion';

const ReunionModel: any = mongoose.model('Reunión', ReunionSchema);

export class ReunionRepository {
    static findAll(query: any) {

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

    static async create(data: { nombreReunion: any; actorCreator: any; fecha_inicio: any; duracion: any; dialogo?: any; }) {
        const _data: any = {
            nombreReunion: data.nombreReunion,
            actorCreator: data.actorCreator,
            fecha_inicio: data.fecha_inicio,
            duracion: data.duracion
        }
        if (data.dialogo)
            _data.dialogo = data.dialogo;
        const newClient = new ReunionModel(_data);
        return newClient.save();
    }

    static findOne(filter: { nombreReunion: string }) {
        return ReunionModel.findOne(filter).exec();
    }
}
