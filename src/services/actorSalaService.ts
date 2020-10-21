'use strict';

import { ActorSalaRepository } from './../repositories/actorSalaRepository';


export class ActorSalaService {
    static findAll(query: any): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            ActorSalaRepository.findAll(query)
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

            ActorSalaRepository.create(data)
                .then((data: any) => {
                    resolve({ status: 201, payload: data });
                })
                .catch((err: any) => {
                    reject(err);
                });

        })
    }
}