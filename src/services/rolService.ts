'use strict';

import { RolRepository } from './../repositories/rolRepository';


export class RolService {
    static findAll(query: any): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            RolRepository.findAll(query)
                .then((data: any) => {
                    resolve({ status: 200, payload: data });
                })
                .catch((err: any) => {
                    reject(err);
                });
        })
    }

    static create(data: any): Promise<any> {
        return new Promise((resolve: any, reject: any) => {

            RolRepository.create(data)
                .then((data: any) => {
                    resolve({ status: 201, payload: data });
                })
                .catch((err: any) => {
                    reject(err);
                });

        })
    }
}