'use strict'

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const RolSchema = new Schema({

    nombre: {
        type: String
    },
    
    metodologia: [{
        type: Schema.Types.ObjectId,
        ref: 'Metodologia'
    }],

    numero_jerarquico: {
        type: Number
    }

})

RolSchema.set('collection', 'Rol');

RolSchema.methods.getBasic = function() {
    
    const instance: any = {
        id: this._id.toString()
    }

    if (this.nombre) 
        instance.nombre = this.nombre;

    if (this.metodologia) 
        if (this.metodologia.getBasic)
            instance.metodologia = this.metodologia.getBasic();

    if (this.numero_jerarquico)
        instance.numero_jerarquico = this.numero_jerarquico;

    return instance;
}