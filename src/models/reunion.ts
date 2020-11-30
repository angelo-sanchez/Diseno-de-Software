'use strict'

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ReunionSchema = new Schema({

    nombreReunion: {
        type: String,
        required: true
    },

    actorCreator : {
        type: String,
        required: true
    },

    dialogo: {
        type: String,
        required: false
    },


    fecha_inicio: {
        type: Date,
        required: true
    },

    duracion: {
        type: Number,
       required: true
    }


})
ReunionSchema.set('collection', 'Reunión');

ReunionSchema.methods.getBasic = function() {
    
    const instance: any = {
        id: this._id.toString()
    }

    if (this.nombreReunion)
        instance.nombreReunion = this.nombreReunion.getBasic();

    if (this.actorCreator)
        instance.actorCreator = this.actorCreator.getBasic();

    if(this.dialogo)
        instance.dialogo = this.dialogo.getBasic();
    
    if (this.fecha_inicio)
        instance.fecha_inicio = this.fecha_inicio.getBasic();
    
    if (this.duracion)
        instance.duracion = this.duracion.getBasic();

    return instance;
}