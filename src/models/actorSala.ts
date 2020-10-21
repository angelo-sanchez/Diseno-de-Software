'use strict'

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ActorSalaSchema = new Schema({
    name : {
        type: String
    },
    capacidad : {
        type: Number
    },
    
})
ActorSalaSchema.set('collection', 'Actor-Sala');

ActorSalaSchema.methods.getBasic = function() {
    
    const instance: any = {
        id: this._id.toString()
    }

    if (this.name)
        instance.name = this.name;
    if (this.capacidad) 
        instance.capacidad = this.capacidad;

    return instance;
}