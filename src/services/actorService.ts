'use strict';

import { ActorRepository } from './../repositories/actorRepository';

export class ActorService {

    static findAll(query: any): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            ActorRepository.findAll(query)
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

            ActorRepository.create(data)
                .then((data: any) => {
                    resolve({ status: 201, payload: data });
                })
                .catch((err: any) => {
                    reject(err);
                });

        })
    }

}