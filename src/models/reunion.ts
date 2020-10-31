'use strict'

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ReunionSchema = new Schema({

    actorCreator : [{
        type: Schema.Types.ObjectId,
        ref: 'Actor'
    }],
    
    sala : [{
        type: Schema.Types.ObjectId,
        ref: 'Sala'
    }],

    proyecto : [ {
        type: Schema.Types.ObjectId,
        ref: 'Proyecto'
    }],

    fecha_inicio: {
        type: Date
    },

    fecha_fin: {
        type: Date
    }


})
ReunionSchema.set('collection', 'Reunion');

ReunionSchema.methods.getBasic = function() {
    
    const instance: any = {
        id: this._id.toString()
    }

    if (this.actorCreator) 
        if (this.actorCreator.getBasic)
            instance.actorCreator = this.actorCreator.getBasic();

    if (this.sala) 
        if (this.sala.getBasic)
            instance.sala = this.sala.getBasic();
    
    if (this.proyecto) 
        if (this.proyecto.getBasic)
            instance.proyecto = this.proyecto.getBasic();
    
    if (this.fecha_inicio)
        instance.fecha_inicio = this.fecha_inicio;
    
    if (this.fecha_fin)
        instance.fecha_fin = this.fecha_fin;

    return instance;
}