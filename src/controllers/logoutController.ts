import { Request, Response } from "express";
import { ActorSalaRepository } from "../repositories/actorSalaRepository";

export class LogoutController {
    public async logout(req: Request, res: Response) {
        try {
            // No confunfir userid con nameid, userid hace referencia al atributo _id que MongoDB crea automáticamente
            if (!(req.body && req.body.userid && req.body.salaid)) {
                throw {
                    status: 400,
                    detail: "Error: La consulta no contiene los parámetros necesarios\n"
                        + "\tSe espera body: { username, sala }"
                }
            }
            const { userid, salaid } = req.body;
            const actorSala = await ActorSalaRepository.findOne({ usuario: userid, sala: salaid });
            if (!actorSala) throw { // No econtró el actor, entonces responde con el error
                status: 404,
                detail: `Error: El usuario ${userid} no existe en la sala ${salaid}`
            }
            // Ahora que lo encontró seteo el valor de la salida (NO sé si se accede con $, creo que si)
            actorSala.set("usuario.$.salida", Date.now());
            actorSala.save();

            return res.status(200).json({logged_out:true});
        } catch (error) {
            return res.status(error.status || 500).json({ error: error.detail || error });
        }
    }
}