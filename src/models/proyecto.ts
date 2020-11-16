'use strict'

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ProyectoSchema = new Schema({

    nameProject: {
        type: String,
        required: true
    },

    descriptionProject: {
        type: String,
    },
    
    sala : {
        type: Schema.Types.ObjectId,
        ref: 'Sala'
    },
    
    equipo: [ {
        id : {type: Schema.Types.ObjectId, ref: 'Actor'}, 
        rol: {type: Schema.Types.ObjectId, ref: 'Rol'}, 
    }],

    stateProject: {
        type: String,
        required: true
    },

    fecha_limite_fin : {
        type: Date
    },

    fecha_inicio_desarrollo: {
        type: Date
    },

    fecha_finalizacion_desarrollo: {
        type: Date
    }

})

ProyectoSchema.set('collection', 'Proyecto');

ProyectoSchema.methods.getBasic = function() {
    
    const instance: any = {
        id: this._id.toString()
    }

    if (this.nameProject) 
        instance.nameProject = this.nameProject;

    if (this.descriptionProject) 
        instance.descriptionProject = this.descriptionProject;

    if (this.sala)
        if (this.sala.getBasic)
            instance.sala = this.sala.getBasic();

    if (this.stateProject){
        instance.stateProject = this.stateProject;
    }

    if (this.fecha_limite_fin){
        instance.fecha_limite_fin = this.fecha_limite_fin;
    }

    if (this.fecha_inicio_desarrollo)
        instance.fecha_inicio_desarrollo = this.fecha_inicio_desarrollo;
    
    if (this.fecha_finalizacion_desarrollo)
        instance.fecha_finalizacion_desarrollo = this.fecha_finalizacion_desarrollo;
    
    return instance;
}