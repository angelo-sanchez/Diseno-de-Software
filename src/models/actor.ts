'use strict'

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ActorSchema = new Schema({

    userName : {
        type: String
    },

    firstName : {
        type: String
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

    if (this.userName) {
        instance.userName = this.userName;
    }

    if (this.firstName) {
        instance.firstName = this.firstName;
    }

    if (this.createdAt) {
        instance.createdAt = this.createdAt;
    }
    return instance;


}

