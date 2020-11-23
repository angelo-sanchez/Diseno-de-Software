'use strict'

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const SalaSchema = new Schema({
    name: {
        type: String
    },
    actores: [{
        id: { type: Schema.Types.ObjectId, ref: 'Actor' },
        rol: { type: Schema.Types.ObjectId, ref: 'Rol' },
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

SalaSchema.methods.membersNumber = function () {
    this.actores.length;
}

SalaSchema.methods.getBasic = function () {

    let instance: {
        actores: any[],
        id: string,
        name: string,
        metodologia: string,
        members_number: number
    };

    instance.id = this._id.toString();
    for (const i in this.actores) {
        instance.actores.push({
            id: this.actores[i].id.getBasic(),
            rol: this.actores[i].rol.getBasic()
        })
    }
    instance.name = this.name;
    instance.metodologia = null;
    if (this.metologia && this.metodologia.getBasic)
        instance.metodologia = this.metodologia.getBasic();
    instance.members_number = this.membersNumber();
    return instance;
}
