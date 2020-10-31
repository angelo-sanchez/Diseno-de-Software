'use strict'

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const SalaOficina = new Schema({

    oficina: [{
        type: Schema.Types.ObjectId,
        ref: 'Oficina'
    }],
    
    sala : [{
        type: Schema.Types.ObjectId,
        ref: 'Sala'
    }],

})

SalaOficina.set('collection', 'Sala-Oficina');

SalaOficina.methods.getBasic = function() {
    
    const instance: any = {
        id: this._id.toString()
    }

    if (this.oficina) 
        if (this.oficina.getBasic)
            instance.oficina = this.oficina.getBasic();

    if (this.sala) 
        if (this.sala.getBasic)
            instance.sala = this.sala.getBasic();

    
    return instance;
}