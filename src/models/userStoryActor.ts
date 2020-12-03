import { Schema, Types } from "mongoose";

export const UserStoryActorSchema = new Schema({
    user_story: {
        type: Types.ObjectId,
        index: true,
        required: true,
        ref: "Tarea"
    },
    actor: {
        type: String,
        required: true,
    },
   
    tiempoLectura: {
        type: Number,
        required: false
    },
    tiempoTrabajo: {
        type: [{
            fecha_inicio: {
                type: Date,
                required: false,
            },
            fecha_fin: {
                type: Date,
                required: false,
            },
        }],
        default: []
    }
})
UserStoryActorSchema.set("collection", "UserStory-Actor")
UserStoryActorSchema.methods.acumularTiempoLectura = function (tiempo: any) {
    this.tiempoLectura = parseFloat(this.tiempoLectura) + parseFloat(tiempo);
}

UserStoryActorSchema.methods.getBasic = function () {
    return {
        actor: this.actor.getBasic(),
        id: this._id,
        tiempoLectura: this.tiempoLectura,
        tiempoTrabajo: this.tiempoTrabajo,
        userStory: this.user_story.getBasic()
    }
}