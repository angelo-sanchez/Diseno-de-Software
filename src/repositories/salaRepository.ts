
'use strict'

import { createHash } from 'crypto';
import mongoose from 'mongoose';
import { SalaSchema } from './../models/sala';

const SalaModel = mongoose.model('Sala', SalaSchema);

export class SalaRepository {

    static async getActorRol(sala: string, actor_id: string) {
        let _sala: any = await SalaModel.findById(sala).exec();
        if (!sala) throw { status: 404, detail: "No existe la sala" }

        let actor: { id: any, rol: any } = _sala.actores.find((value: any) => {
            return value.id.toString() == actor_id;
        })
        if (actor) return actor.rol;
        return null;
    }
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

    static async addActorToSala(data: { salaid: string, userid: string, rolid: string, password?: string }) {
        let filter: any = { _id: data.salaid };
        if (data.password) {
            filter.password = createHash("SHA512").update(data.password).digest().toString();
        }

        let sala: any = await SalaModel.findOne(filter).exec();
        let existe = sala.actores.find((value: any) => {
            return value.id.toString() == data.userid
        });
        if (existe)
            throw {
                status: 409,
                detail: "Este usuario ya tiene un rol asignado en la sala"
            }
        sala.actores.push({
            id: data.userid,
            rol: data.rolid
        });

        return await sala.save();
    }
}