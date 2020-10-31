'use strict';

import { OficinaRepository } from './../repositories/oficinaRepository';


export class OficinaService {
    static findAll(query: any): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            OficinaRepository.findAll(query)
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

            OficinaRepository.create(data)
                .then((data: any) => {
                    resolve({ status: 201, payload: data });
                })
                .catch((err: any) => {
                    reject(err);
                });

        })
    }
}