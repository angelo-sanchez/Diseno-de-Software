import { Router } from "express";
import { UserStoryActorController } from "../controllers/userStoryActorController";

const router = Router();

const ctrller = new UserStoryActorController();
router.route("/tiempoLectura")
    .get(ctrller.getTiempoLectura);
router.route("/tiempoLectura")
    .post(ctrller.addTiempoLectura);

export const UserStoryRouter = router;