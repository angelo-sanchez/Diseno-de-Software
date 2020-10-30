'use strict'

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const MetodologiaSchema = new Schema({

    nameMetodologia : [{
        type: String,
        required: true
    }],
    

})

MetodologiaSchema.set('collection', 'Metodologia');

MetodologiaSchema.methods.getBasic = function() {
    
    const instance: any = {
        id: this._id.toString()
    }

    if (this.nameMetodologia) 
        instance.nameMetodologia = this.nameMetodologia;

    return instance;
}