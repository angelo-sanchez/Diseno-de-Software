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

    return instance;
}