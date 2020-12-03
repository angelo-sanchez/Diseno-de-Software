import { Document, model, MongooseFilterQuery } from "mongoose";
import { UserStoryActorSchema } from "../models/userStoryActor";
import { ActorRepository } from "./actorRepository";

let Model = model("UserStory-Actor", UserStoryActorSchema);

export class UserStoryActorRepository {
    public static async create(data: { user_story: any, actor: any, tiempoLectura?: number, tiempoTrabajo?: any[] }) {
        const tTrabajo: any[] = data.tiempoTrabajo || [];
        const { user_story, actor } = data;
        const _new = new Model({
            user_story,
            actor,
            tiempoTrabajo: tTrabajo,
            tiempoLectura: data.tiempoLectura
        });
        return _new.save();
    }
    public static async find(filter: any) {
        return Model.find(filter).exec();
    }
    public static async findOne(filter: any) {
        return Model.findOne(filter).exec();
    }
    public static async getTiempoTotalTrabajo(filter: any) {
        let dbResults: any = await Model.find(filter);
        let res: any[] = [];
        for (const item of dbResults) {
            let inic_changed = false, fin_changed = false;
            let inic: number = Date.now(), fin: number = 0;
            for (const tiempoTrabajo of item.tiempoTrabajo) {
                if (inic > Date.parse(tiempoTrabajo.fecha_inicio)) {
                    inic = Date.parse(tiempoTrabajo.fecha_inicio);
                    inic_changed = true;
                }
                if (fin < Date.parse(tiempoTrabajo.fecha_fin)) {
                    fin = Date.parse(tiempoTrabajo.fecha_fin);
                    fin_changed = true
                }
            }
            res.push({
                actor: item.actor,
                fecha_inicio: inic_changed ? new Date(inic) : null,
                fecha_fin: fin_changed ? new Date(fin) : null
            });
        }
        return res;
    }
}