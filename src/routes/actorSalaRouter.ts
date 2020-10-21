'use strict';

import { Router } from 'express';
import { ActorSalaController } from './../controllers/actorSalaController';

const router: Router = Router();

const actorSalaCtrl: ActorSalaController = new ActorSalaController();

router.route('')
    .get(actorSalaCtrl.findAll);

router.route('')
    .post(actorSalaCtrl.create);

export const ActorSalaRouter: Router = router;