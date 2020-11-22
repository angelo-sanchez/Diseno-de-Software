'use strict';
import { Router } from "express";
import { ActorOficinaController } from "../controllers/actorOficinaController";

const router: Router = Router();

const actorOficinaCtrl: ActorOficinaController = new ActorOficinaController();

router.route('')
    .get(actorOficinaCtrl.findAll);

router.route('')
    .post(actorOficinaCtrl.create);

router.route('/salir')
    .put(actorOficinaCtrl.salir);

export const ActorOficinaRouter: Router = router;