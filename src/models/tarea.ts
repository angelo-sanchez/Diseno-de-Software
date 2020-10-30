'use strict'

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TareaSchema = new Schema({

    description: {
        type: String
    },
    
    actorCreador: [{
        type: Schema.Types.ObjectId,
        ref: 'Actor'
    }],

    proyecto: [{
        type: Schema.Types.ObjectId,
        ref: 'Proyecto'
    }],

    estado: {
        type: String
    },

    story_point_stimate:  {
        type: Number
    }

})

TareaSchema.set('collection', 'Tarea');

TareaSchema.methods.getBasic = function() {
    
    const instance: any = {
        id: this._id.toString()
    }

    if (this.description) 
        instance.description = this.description;

    if (this.actor) 
        if (this.sala.getBasic)
            instance.actor = this.actor.getBasic();

    if (this.proyecto)
        if (this.proyecto.getBasic)
            instance.proyecto = this.proyecto.getBasic();

    if (this.estado)
        instance.estado = this.estado;

    if (this.story_point_stimate)
        instance.story_point_stimate = this.story_point_stimate;
    
    return instance;
}