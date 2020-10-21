'use strict';

import { Router } from 'express';
import { ActorController } from './../controllers/actorController';

const router: Router = Router();

const actorCtrl: ActorController = new ActorController();

router.route('')
    .get(actorCtrl.findAll);

router.route('')
    .post(actorCtrl.create);

export const ActorRouter: Router = router;