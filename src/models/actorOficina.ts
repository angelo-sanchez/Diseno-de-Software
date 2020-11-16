'use strict'

import * as mongoose from 'mongoose';


const Schema = mongoose.Schema;

export const ActorOficinaSchema = new Schema({

    usuario : [{
        id : {type: Schema.Types.ObjectId, ref: 'Actor'}, 
        entrada:{ type: Date,
                  required: true, },
        salida: { type: Date,
                 required: false, },
    }], 

    sala: {type: Schema.Types.ObjectId, ref: 'Sala' },

})

ActorOficinaSchema.set('collection', 'Actor-Oficina');

ActorOficinaSchema.methods.getBasic = function() {
    
    const instance: any = {
        id: this._id.toString()
    }


    if (this.entrada) 
        if (this.entrada.getBasic)
            instance.entrada = this.entrada.getBasic();

    if (this.salida) 
        if (this.salida.getBasic)
            instance.sala = this.salida.getBasic();
    
    
    return instance;
}
