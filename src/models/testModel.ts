'use strict';

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TestSchema = new Schema({
    key: {
        type: String
    },
    value: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});