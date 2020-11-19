'use strict'

import * as mongoose from 'mongoose';
import { ActorSchema } from './../models/actor';
import { createHash } from "crypto";
import { resolve } from 'path';

const ActorModel = mongoose.model('Actor', ActorSchema);

export class ActorRepository {
    static findAll(query: any) {
        return new Promise((resolve: any, reject: any) => {
            ActorModel.find(query)
                .then((data: any) => {
                    if (data) {
                        resolve(data)
                    } else
                        resolve();
                })
                .catch((err: any) => {
                    console.error(err);
                })
        })
    }

    static create(data: any) {

        return new Promise((resolve: any, reject: any) => {
            const _data: any = {};

            if (data.firstName)
                _data.firstName = data.firstName;
            if (data.surname)
                _data.surname = data.surname;
            if (data.email)
                _data.email = data.email;
            if(data.nameid)
                _data.nameid = data.nameid;
            if (data.password)
                _data.password = createHash("sha512").update(data.password).digest().toString();

            const newClient = new ActorModel(_data);
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

    static async id_reg(user: {nameid: string}){
        let nameid = user;
        return ActorModel.findOne(nameid).exec();
    }

    static async email_reg(user: {email: string}){
        let email = user;
        return ActorModel.findOne(email).exec();
    }

    static async exists(user: { nameid: string, password: string }) {
        let { nameid, password } = user;
        // Importante guardar las contraseñas cifradas en la DB.
        // password = createHash("sha512").update(password).digest().toString();
        // creo que se guardan cifradas, no se como retornarlas descifradas.
        return ActorModel.findOne({ nameid, password }).exec();
    }
}

// diseno2020.heroku.com/api/