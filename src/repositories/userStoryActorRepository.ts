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
    public static async getTiempoLectura(filter: any) {
        return Model
            .aggregate() // Inicia un pipeline para procesar datos
            .match(filter) // Filtra para que los que cumplen con el filtro pasen a la siguiente etapa
            .group({ _id: "$actor", tiempoLectura: { $sum: "$tiempoLectura" } }) // Agrupa por actor y suma por los tiempoLectura 
            .exec()
    }
    public static async getTiempoTotalTrabajo(filter: any) {
        return Model.aggregate()
            .match(filter)
            .group({ _id: "$actor", tiempoTrabajo: { $sum: "$tiempoTrabajo.tiempo" } })
            .exec();
    }
    /**
     * Este método se puede usar tanto para crear por primera vez un registro UserStory-Actor o actualizar uno
     * @param userStory el _id de la user Story
     * @param nameid el nameid del actor en cuestion
    */
    public static async addTiempoLectura(userStory: any, nameid: any, tiempo: any) {
        let actor = (await ActorRepository.findActorBy({ nameid }))._id;
        const record = await Model.findOne({ user_story: userStory, actor }).exec();
        if (!record) { // Nunca se insertó en la base de datos
            let tiempoLectura = parseFloat(tiempo);
            const userStoryActor = new Model({
                user_story: userStory,
                actor,
                tiempoLectura
            })
            return userStoryActor.save();
        } else { // Ya existía el registro del mismo actor y userStory
            record.schema.methods.acumularTiempoLectura(tiempo);
            return record.save();
        }
    }
    public static async addTIempoTrabajo(userStory: any, nameid: any, tiempo: any) {
        // TODO Implementar este método, tanto para crear como para actualizar el tiempo de trabajo de un usuario en una userStory
    }
}