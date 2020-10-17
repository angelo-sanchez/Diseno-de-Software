'use strict';

import * as mongoose from 'mongoose';
import { TestSchema } from '../models/testModel';
const TestModel = mongoose.model('Test', TestSchema);


export class TestRepository {

    static findAll(query: any = {}) {
        return new Promise((resolve: any, reject: any) => {

            TestModel.find(query)
                .then((tests) => {
                    resolve(tests);
                })
                .catch((err) => {
                    reject({ msg: 'TEST.ERROR_LIST', error: err })
                })
        })
    }
}