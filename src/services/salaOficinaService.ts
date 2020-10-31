'use strict';

import { SalaOficinaRepository } from './../repositories/salaOficinaRepository';


export class SalaOficinaService {
    static findAll(query: any): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            SalaOficinaRepository.findAll(query)
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

            SalaOficinaRepository.create(data)
                .then((data: any) => {
                    resolve({ status: 201, payload: data });
                })
                .catch((err: any) => {
                    reject(err);
                });

        })
    }
}