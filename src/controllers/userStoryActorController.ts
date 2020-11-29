import { Request, Response } from "express";
import { ActorRepository } from "../repositories/actorRepository";
import { UserStoryActorRepository } from "../repositories/userStoryActorRepository";

export class UserStoryActorController {
    public async addTiempoLectura(req: Request, res: Response) {
        try {
            if (req.body && req.body.user_story && req.body.actor && req.body.tiempo) {
                throw {
                    status: 400,
                    detail: "Error: La consulta no contiene los parámetros necesarios\n"
                        + "\tSe espera body: { user_story, actor, tiempo }"
                }
            }
            const actor = await ActorRepository.findActorBy({ nameid: req.body.actor });
            let userStoryActor: any = await UserStoryActorRepository.findOne({
                user_story: req.body.user_story,
                actor: actor._id
            })
            if (userStoryActor) {
                userStoryActor.tiempoLectura += parseFloat(req.body.tiempo);
                await userStoryActor.save();
            } else {
                userStoryActor = await UserStoryActorRepository.create({
                    user_story: req.body.user_story,
                    actor: actor._id,
                    tiempoLectura: parseFloat(req.body.tiempo)
                });
            }
            return res.status(200).json(userStoryActor.getBasic())
        } catch (error) {
            return res.status(error.status || 500).json({ error: error.detail || error });
        }
    }
    public async getTiempoLectura(req: Request, res: Response) {
        try {
            const filter: any = {};
            // Generalmente cuando usamos el método GET, los parámetros no vienen en body, vienen en query
            // La diferencia es que el body está codificado en la consulta, mientras que
            // El query viene codificado en la ruta misma. Ej: https://www.google.com/search?q=MongoDB
            // aqui, todo lo que está después del '?' son los parámetros nombre=valor
            // 'q' es el nombre y 'MongoDB' el valor, si queremos poner varios parámetros los separamos por '&'
            if (req.query && req.query.user_story)
                filter.user_story = req.query.user_story;
            if (req.query && req.query.actor)
                filter.actor = req.query.actor;
            const dbResults = await UserStoryActorRepository.getTiempoLectura(filter);
            const results: any = {
                nombre: "TiempoLecturaUserStory",
                items: []
            }
            for (const item of dbResults) {
                results.items.push({
                    user_id: item.actor.nameid, // No sé si esto retorna bien
                    value: item.tiempoLectura
                });
            }
            return res.status(200).json(results);
        } catch (error) {
            return res.status(error.status || 500).json({ error: error.detail || error });
        }
    }
}