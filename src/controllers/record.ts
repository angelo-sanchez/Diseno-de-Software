import { Request, Response } from "express";
import { ActorRepository } from "c:/Users/Guido/Diseno-de-Software/src/repositories/actorRepository";

export class recordController {
    public async record(req: Request, res: Response){
        console.log(req.body)
        if (!req.body.actor || !req.body.actor.firstname || !req.body.actor.surname || !req.body.actor.email || !req.body.actor.nameid || !req.body.actor.password) {
            res.status(400).json({
                error: "Error: La consulta no contiene los parámetros necesarios\n"
                    + "\tSe espera body: { actor: { firstname, surname, email, password } }"
            });

            throw new Error("Error: La consulta no contiene los parámetros necesarios\n"
                + "\tSe espera body: { actor: {  firstname, surname, email, password } }");

        }

        const actor = {
            firstname: req.body.actor.firstname,
            surname: req.body.actor.surmane,
            email: req.body.actor.email,
            nameid: req.body.actor.nameid,
            password: req.body.actor.password,
        };
        try {
            let emailreg: any = await ActorRepository.email_reg(actor);
            if (emailreg){
                throw {
                    status: 403,
                    detail: "el email ya se encuentra registrado"
                }
            }
            let nameidreg: any = await ActorRepository.id_reg(actor);
            if (nameidreg){
                throw {
                    status: 403,
                    detail: "el nombre de usuario ya se encuentra registrado"
                }
            }
            if  (!emailreg && !nameidreg){
                ActorRepository.create({
                    firstname: actor.firstname,
                    surname: actor.surname,
                    password: actor.password,
                    email: actor.email,
                    nameid: actor.nameid,
                }).then(value => {
                    res.status(200).json({ logged_in: true, userId: actor.nameid });
                });
             }
            } catch (error) {
                return res.status(error.status || 500).send(error.detail);
        }
    }
}