'use strict';

import { ActorOficinaRepository } from '../repositories/actorOficinaRepository'; // como agregar al repositorio


export class ActorOficinaService {
    static findAll(query: any): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            ActorOficinaRepository.findAll(query)
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

            ActorOficinaRepository.create(data)
                .then((data: any) => {
                    resolve({ status: 201, payload: data });
                })
                .catch((err: any) => {
                    reject(err);
                });

        })
    }
}