'use strict';
import { TestRepository } from '../repositories/testRepository';

export class TestService {

    constructor() {

    }


    static test(): Promise<any> {
        return new Promise(function (resolve: any, reject: any) {
            resolve('Server working OK');
        })
    }


    static testDatabase(): Promise<any> {
        return new Promise(function (resolve: any, reject: any) {
            TestRepository.findAll()
                .then((data: any) => {
                    resolve(data);
                })
                .catch((err: any) => {
                    reject(err);
                });
        })
    }

}