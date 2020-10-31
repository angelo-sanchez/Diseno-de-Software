'use strict';

import { TareaActorRepository } from './../repositories/tareaActorRepository';


export class TareaActorService {
    static findAll(query: any): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            TareaActorRepository.findAll(query)
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

            TareaActorRepository.create(data)
                .then((data: any) => {
                    resolve({ status: 201, payload: data });
                })
                .catch((err: any) => {
                    reject(err);
                });

        })
    }
}