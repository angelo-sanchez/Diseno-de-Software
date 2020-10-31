'use strict';

import { MetologiaRepository } from './../repositories/metodologiaRepository';


export class MetodologiaService {
    static findAll(query: any): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            MetologiaRepository.findAll(query)
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

            MetologiaRepository.create(data)
                .then((data: any) => {
                    resolve({ status: 201, payload: data });
                })
                .catch((err: any) => {
                    reject(err);
                });

        })
    }
}