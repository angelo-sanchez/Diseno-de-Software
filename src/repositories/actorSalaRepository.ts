'use strict'

import * as mongoose from 'mongoose';
import { ActorSalaSchema } from './../models/actorSala';

const ActorSalaModel = mongoose.model('Actor-Sala', ActorSalaSchema);

export class ActorSalaRepository {
    
    static findAll(query: any) {
        return ActorSalaModel.find(query).exec();
    }

    static create(data: any) {

        return new Promise((resolve: any, reject: any) => {
            const newClient = new ActorSalaModel(data);
            newClient.save()
                .then((newClient: any) => {
                    if (newClient)
                        resolve(newClient.getBasic());
                    else
                        resolve();
                })
                .catch((err: any) => {
                    reject({ msg: ('ACTOR.ERROR_CREATE'), error: err })
                })
        });

    }

    static findOne(filter: { usuario: string; sala: string; }) {
        return ActorSalaModel.findOne(filter).exec();
    }

}
