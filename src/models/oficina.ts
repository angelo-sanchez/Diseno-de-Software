'use strict'

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const OficinaSchema = new Schema({

    nombreOficina: {
        type: String
    }

})

OficinaSchema.set('collection', 'Oficina');

OficinaSchema.methods.getBasic = function() {
    
    const instance: any = {
        id: this._id.toString()
    }

    if (this.nombreOficina) 
        instance.nombreOficina = this.nombreOficina;

    
    return instance;
}