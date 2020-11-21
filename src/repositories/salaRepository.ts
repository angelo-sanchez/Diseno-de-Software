
'use strict'

import { createHash } from 'crypto';
import mongoose from 'mongoose';
import { SalaSchema } from './../models/sala';

const SalaModel = mongoose.model('Sala', SalaSchema);

export class SalaRepository {

    static findAll(query: any) {
        return SalaModel.find(query).exec();
    }

    static create(data: any) {
        const _data: any = {};

        _data.metodologia = data.metodologia;
        _data.name = data.nameSala;
        _data.actores = [];
        if (data.actores) {
            for (const { id, rol } of data.actores) {
                if (id && rol) {
                    _data.actores.push({ id, rol });
                }
            }
        }
        if (data.password) { // La contraseña de una sala es opcional.
            _data.password = createHash("SHA512").update(data.password).digest().toString();
        }

        return new SalaModel(_data).save();
    }

    static addActorToSala(data: { salaid: string, userid: string, rolid: string, password?: string }) {
        let filter: any = { sala: data.salaid };
        if (data.password) {
            filter.password = createHash("SHA512").update(data.password).digest().toString();
        }
        let update = {
            $push: { // Insertar en un arreglo
                actores: { // El arreglo que se va a modificar, seguido del objeto que se va a insertar
                    id: data.userid,
                    rol: data.rolid
                }
            }
        };
        return SalaModel.updateOne(filter, update).exec();
    }
}