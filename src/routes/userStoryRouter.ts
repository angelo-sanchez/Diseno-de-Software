import { Router } from "express";
import { UserStoryActorController } from "../controllers/userStoryActorController";

const router = Router();

const ctrller:UserStoryActorController = new UserStoryActorController();


router.route("/tiempoLectura")
    .get(ctrller.getTiempoLectura)
    .post(ctrller.addTiempoLectura);
router.route("/tiempoTrabajoTotal")
    .get(ctrller.getTiempoTotalTrabajo);
router.route("/setFecha_fin")
    .put(ctrller.setFecha_fin);
router.route("/tiempoTrabajo")
    .get(ctrller.getTiempoTrabajo)
    .post(ctrller.addTiempoTrabajo);
export const UserStoryRouter = router;