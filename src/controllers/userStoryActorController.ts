import { Request, Response } from "express";
import { UserStoryActorRepository } from "../repositories/userStoryActorRepository";

export class UserStoryActorController {
    constructor() { }
    public async addTiempoLectura(req: Request, res: Response) {
        try {
            if (!(req.body && req.body.user_story && req.body.actor && req.body.tiempo)) {
                throw {
                    status: 400,
                    detail: "Error: La consulta no contiene los parámetros necesarios\n"
                        + "\tSe espera body: { user_story, actor, tiempo }"
                }
            }
            let userStoryActor: any = await UserStoryActorRepository.findOne({
                user_story: req.body.user_story,
                actor: req.body.actor
            })
            if (userStoryActor) {
                userStoryActor.tiempoLectura += parseFloat(req.body.tiempo);
                userStoryActor = await userStoryActor.save();
            } else {
                userStoryActor = await UserStoryActorRepository.create({
                    user_story: req.body.user_story,
                    actor: req.body.actor,
                    tiempoLectura: parseFloat(req.body.tiempo)
                });
            }
            return res.status(200).json(userStoryActor);
        } catch (error) {
            return res.status(error.status || 500).json({ error: error.detail || error });
        }
    }
    public async addTiempoTrabajo(req: Request, res: Response) {
        try {
            if (!(req.body && req.body.user_story && req.body.actor && req.body.tiempo)) {
                throw {
                    status: 400,
                    detail: "Error: La consulta no contiene los parámetros necesarios\n"
                        + "\tSe espera body: { user_story, actor, tiempo, fecha (opcional) }"
                }
            }
            let userStoryActor: any = await UserStoryActorRepository.findOne({
                user_story: req.body.user_story,
                actor: req.body.actor
            });
            let tiempoTrabajo = {
                tiempo: parseFloat(req.body.tiempo),
                fecha: req.body.fecha || Date.now()
            }
            if (userStoryActor) {
                userStoryActor.tiempoTrabajo.push(tiempoTrabajo);
                userStoryActor = await userStoryActor.save();
            } else {
                userStoryActor = await UserStoryActorRepository.create({
                    user_story: req.body.user_story,
                    actor: req.body.actor,
                    tiempoTrabajo: [tiempoTrabajo]
                });
            }
            return res.status(200).json(userStoryActor)
        } catch (error) {
            return res.status(error.status || 500).json({ error: error.detail || error });
        }
    }
    private static parseFilter(req: Request) {
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
        return filter;
    }
    public async getTiempoLectura(req: Request, res: Response) {
        try {
            const filter: any = UserStoryActorController.parseFilter(req);
            const dbResults: any[] = await UserStoryActorRepository.find(filter);
            const results: any = {
                nombre: "TiempoLecturaUserStory",
                items: []
            }
            console.log({ dbResults });
            for (const item of dbResults) {
                results.items.push({
                    user_id: item.actor, // No sé si esto retorna bien
                    value: item.tiempoLectura
                });
            }
            return res.status(200).json(results);
        } catch (error) {
            return res.status(error.status || 500).json({ error: error.detail || error });
        }
    }
    public async getTiempoTrabajo(req: Request, res: Response) {
        try {
            const filter: any = UserStoryActorController.parseFilter(req);
            const dbResults: any = await UserStoryActorRepository.find(filter);
            const results: any = {
                nombre: "TiempoTrabajoUserStory",
                items: []
            }
            for (const item of dbResults) {
                results.items.push({
                    user_id: item.actor, // No sé si esto retorna bien
                    values: (item.tiempoTrabajo.length > 0 ? item.tiempoTrabajo : [{tiempo: 0}]).map((value: any) => value.tiempo)
                });
            }
            return res.status(200).json(results);
        } catch (error) {
            return res.status(error.status || 500).json({ error: error.detail || error });
        }
    }
    public async getTiempoTotalTrabajo(req: Request, res: Response) {
        try {
            const filter = UserStoryActorController.parseFilter(req);
            const dbResults = await UserStoryActorRepository.getTiempoTotalTrabajo(filter);
            const results: any = {
                nombre: "TiempoTrabajoUserStory",
                items: []
            }
            for (const item of dbResults) {
                results.items.push({
                    user_id: item.actor,
                    value: item.tiempoTrabajo
                })
            }
            return res.status(200).json(results);
        } catch (error) {
            return res.status(error.status || 500).json({ error: error.detail || error });
        }
    }
}