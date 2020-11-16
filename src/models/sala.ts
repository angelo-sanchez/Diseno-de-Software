'use strict'

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const SalaSchema = new Schema({

    nameSala : {
        type: String
    },

    members_number : {
        type: Number
    },

    actor: [ {
        id : {type: Schema.Types.ObjectId, ref: 'Actor'}, 
        rol: {type: Schema.Types.ObjectId, ref: 'Rol'}, 
    }],

    password: {
        type: String,
        required: false
    },

    metodologia: [{
        type: Schema.Types.ObjectId,
        ref: 'Metodologia'
    }]

})
   
   
   
SalaSchema.set('collection', 'Sala');

SalaSchema.methods.getBasic = function() {

    const instance: any = {
        id: this._id.toString()
    }

    if (this.members_number) {
        instance.nameSala = this.members_number;
    }

    if (this.actor) {
        if (this.actor.getBasic)
            instance.actor = this.actor.getBasic();
    }

    if (this.nameSala) 
        instance.nameSala = this.nameSala;
    
    if (this.metodologia)
        if (this.metodologia.getBasic){
            instance.metologia = this.metodologia.getBasic();
        }

    return instance;
}
