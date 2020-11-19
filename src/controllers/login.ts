import { Request, Response } from "express";
import { ActorSalaRepository } from "../repositories/actorSalaRepository";
import { ActorRepository } from "../repositories/actorRepository";

export class LoginController {
    /**
     * login
     * bodyParams: {actor: {username, password}, sala: {id}}
     */
    public async login(req: Request, res: Response) {
        console.log(req.body)
        if (!req.body.actor || !req.body.sala || !req.body.actor.user || !req.body.actor.password) {
            res.status(400).json({
                error: "Error: La consulta no contiene los parámetros necesarios\n"
                    + "\tSe espera body: { actor: { user, password }, sala }"
            });

            throw new Error("Error: La consulta no contiene los parámetros necesarios\n"
                + "\tSe espera body: { actor: { user, password }, sala }");
        }
        const actor = {
            nameid: req.body.actor.user,
            password: req.body.actor.password
        };
        const sala: string = req.body.sala;

        try {
            let authenticated = await ActorRepository.exists(actor);
            if (!authenticated) {
                throw {
                    status: 403,
                    detail: "El usuario o contraseña no coinciden, reintente"
                };
            }

            let authorized: any = await ActorSalaRepository.findOne({ "usuario.id": authenticated._id, sala });
            if (!authorized || !authorized.usuario || authorized.usuario.length <= 0) {
                throw {
                    status: 404,
                    detail: `No existe el usuario ${actor.nameid} en la sala ${sala}`
                }
            }

            let ingreso = Date.now();
            ActorSalaRepository.create({
                "usuario.$[user]": {
                    id: authorized.usuario[0].id,
                    rol: authorized.usuario[0].rol,
                    entrada: ingreso
                },
                sala,
            }).then(value => {
                res.status(200).json({ logged_in: true, userId: authenticated._id });
            });
        } catch (error) {
            return res.status(error.status || 500).send(error.detail);
        }
    }
}