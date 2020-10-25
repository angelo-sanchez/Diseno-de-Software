'use strict';

import { SalaRepository } from './../repositories/salaRepository';

export class SalaService {

    static findAll(query: any): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            SalaRepository.findAll(query)
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

            SalaRepository.create(data)
                .then((data: any) => {
                    resolve({ status: 201, payload: data });
                })
                .catch((err: any) => {
                    reject(err);
                });

        })
    }

}