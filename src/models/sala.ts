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
        firstName: String,
        surname: String,
        email: String
    }],

    password: {
        type: String,
        required: true
    }

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
        instance.actor = this.actor;
    }

    return instance;
}
