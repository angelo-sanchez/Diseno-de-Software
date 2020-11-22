'use strict'

import * as mongoose from 'mongoose';


const Schema = mongoose.Schema;

export const ActorOficinaSchema = new Schema({

    usuario : {
        type: String,
        required: true
    },
      
    entrada:{ type: Date,
                  required: true, },
    
    salida: { type: Date,
                 required: false, },

    oficina: {
        type: String,
        required: true
    },
})

ActorOficinaSchema.set('collection', 'Actor-Oficina');

ActorOficinaSchema.methods.getBasic = function() {
    
    const instance: any = {
        id: this._id.toString()
    }

    if(this.usuario)
        if(this.usuario.getBasic)
            instance.usuario = this.usuario.getBasic();
    

    if (this.entrada) 
        if (this.entrada.getBasic)
            instance.entrada = this.entrada.getBasic();

    if (this.salida) 
        if (this.salida.getBasic)
            instance.oficina = this.salida.getBasic();
    
    if(this.oficina)
        if(this.oficina.getBasic)
            instance.oficina = this.oficina.getBasic();
    
    return instance;
}
