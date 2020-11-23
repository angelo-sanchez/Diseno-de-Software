'use strict'

import * as mongoose from 'mongoose';


const Schema = mongoose.Schema;

export const ActorSalaSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Actor'
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref: 'Rol'
    },
    entrada: {
        type: Date,
        required: true,
    },
    salida: {
        type: Date,
        required: false,
    },
    sala: {
        type: Schema.Types.ObjectId,
        ref: 'Sala'
    },
})

ActorSalaSchema.set('collection', 'Actor-Sala');

ActorSalaSchema.methods.getBasic = function () {

    const instance: any = {
        id: this._id.toString()
    }

    if (this.usuario && this.usuario.getBasic)
        instance.usuario = this.usuario.getBasic();
    if (this.rol && this.rol.getBasic)
        instance.rol = this.rol.getBasic();
    if (this.entrada)
        instance.entrada = this.entrada.toString();
    if (this.salida)
        instance.salida = this.salida.toString();
    if (this.sala && this.sala.getBasic)
        instance.sala = this.sala.getBasic();

    return instance;
}