'use strict';

import { ProyectoRepository } from './../repositories/proyectoRepository';


export class ActorSalaService {
    static findAll(query: any): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            ProyectoRepository.findAll(query)
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

            ProyectoRepository.create(data)
                .then((data: any) => {
                    resolve({ status: 201, payload: data });
                })
                .catch((err: any) => {
                    reject(err);
                });

        })
    }
}