'use strict';

import { ReunionRepository } from './../repositories/reunionRepository';


export class ActorSalaService {
    static findAll(query: any): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            ReunionRepository.findAll(query)
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

            ReunionRepository.create(data)
                .then((data: any) => {
                    resolve({ status: 201, payload: data });
                })
                .catch((err: any) => {
                    reject(err);
                });

        })
    }
}