import { Request, Response } from "express";
import { ActorRepository } from "../repositories/actorRepository";

export class recordController {
    public async record(req: Request, res: Response) {
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
            firstName: req.body.actor.firstname,
            surname: req.body.actor.surname,
            email: req.body.actor.email,
            nameid: req.body.actor.nameid,
            password: req.body.actor.password,
        };

        try {
            let emailreg: any = await ActorRepository.email_reg(actor);
            if (emailreg) {
                throw {
                    status: 403,
                    detail: "El email ya se encuentra registrado"
                }
            }
            let nameidreg: any = await ActorRepository.id_reg(actor);
            if (nameidreg) {
                throw {
                    status: 403,
                    detail: "El nombre de usuario ya se encuentra registrado"
                }
            }
            if (!emailreg && !nameidreg) {
                ActorRepository.create(actor)
                    .then(value => {
                        res.status(200).json({ recorded: true, nameid: actor.nameid });
                    });
            }
        } catch (error) {
            return res.status(error.status || 500).json({ detail: error.detail || error });
        }
    }
}