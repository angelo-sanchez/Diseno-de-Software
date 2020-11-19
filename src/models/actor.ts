'use strict'

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ActorSchema = new Schema({

    firstName : {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },
    nameid: {
        type: String,
        required: true
    },

    createdAt : {
        type: Date,
        default: Date.now
    }
})
ActorSchema.set('collection', 'Actor');

ActorSchema.methods.getBasic = function() {
 
    const instance: any = {
        id: this._id.toString()
    }

    if (this.firstName) {
        instance.firstName = this.firstName;
    }

    if (this.surname) {
        instance.surname = this.surname;
    }

    if (this.email) {
        instance.email = this.email;
    }

    if (this.nameid) {
        instance.nameid = this.nameid;
    }

    if (this.createdAt) {
        instance.createdAt = this.createdAt;
    }
    return instance;


}

