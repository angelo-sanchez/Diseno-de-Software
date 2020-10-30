'use strict'

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TareaActor = new Schema({

    tarea: [{
        type: Schema.Types.ObjectId,
        ref: 'Tarea'
    }],
    
    actor : [{
        type: Schema.Types.ObjectId,
        ref: 'Actor'
    }],

})

TareaActor.set('collection', 'Tarea-Actor');

TareaActor.methods.getBasic = function() {
    
    const instance: any = {
        id: this._id.toString()
    }

    if (this.tarea) 
        if (this.tarea.getBasic)
            instance.tarea = this.tarea.getBasic();

    if (this.actor) 
        if (this.actor.getBasic)
            instance.actor = this.actor.getBasic();
    
    return instance;
}