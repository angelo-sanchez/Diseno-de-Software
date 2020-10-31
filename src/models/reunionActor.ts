'use strict'

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ReunionActor = new Schema({

    reunion: [{
        type: Schema.Types.ObjectId,
        ref: 'Reunion'
    }],
    
    actor : [{
        type: Schema.Types.ObjectId,
        ref: 'Actor'
    }],

})

ReunionActor.set('collection', 'Reunion-Actor');

ReunionActor.methods.getBasic = function() {
    
    const instance: any = {
        id: this._id.toString()
    }

    if (this.reunion) 
        if (this.reunion.getBasic)
            instance.reunion = this.reunion.getBasic();

    if (this.actor) 
        if (this.actor.getBasic)
            instance.actor = this.actor.getBasic();

    return instance;
}