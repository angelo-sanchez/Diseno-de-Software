'use strict'

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ActorSalaSchema = new Schema({

    usuario : [{
        type: Schema.Types.ObjectId,
        ref: 'Actor'
    }],
    
    sala : [{
        type: Schema.Types.ObjectId,
        ref: 'Sala'
    }],

    rol : [ {
        type: Schema.Types.ObjectId,
        ref: 'Rol'
    }]

})
ActorSalaSchema.set('collection', 'Actor-Sala');

ActorSalaSchema.methods.getBasic = function() {
    
    const instance: any = {
        id: this._id.toString()
    }


    if (this.usuario) 
        if (this.usuario.getBasic)
            instance.usuario = this.usuario.getBasic();

    if (this.sala) 
        if (this.sala.getBasic)
            instance.sala = this.sala.getBasic();
    
    if (this.rol) 
        if (this.rol.getBasic)
            instance.rol = this.rol.getBasic();
    
    return instance;
}