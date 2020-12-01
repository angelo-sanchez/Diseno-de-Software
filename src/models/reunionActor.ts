'use strict'

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ReunionActor = new Schema({

    reunion: {
        type: String,
        required: true
    },
    
    actor : {
        type: String,
        required: true
    },

    ingreso: {
        type: Date,
        required: true
    },

    value: {
        type: Number,
        required: false
    }

})

ReunionActor.set('collection', 'Reunion-Actor');

ReunionActor.methods.getBasic = function() {
    
    const instance: any = {
        id: this._id.toString()
    }

    if (this.reunion) 
        instance.reunion = this.reunion.getBasic();

    if (this.actor) 
         instance.actor = this.actor.getBasic();

    if(this.ingreso)
        instance.ingreso = this.ingreso.getBasic();

    if(this.value)
        instance.value = this.value.getBasic();

    return instance;
}