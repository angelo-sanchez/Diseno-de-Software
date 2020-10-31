

'use strict';
import { TareaActorController } from './../controllers/tareaActorController';
import { Router } from 'express';


const router: Router = Router();

const tareaActorController:  TareaActorController = new TareaActorController();

router.route('')
    .get(tareaActorController.findAll);

router.route('')
    .post(tareaActorController.create);

export const TareaActorRoutes: Router = router;