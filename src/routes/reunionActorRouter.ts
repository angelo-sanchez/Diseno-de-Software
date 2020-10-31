'use strict';

import { Router } from 'express';
import { ReunionActorController } from './../controllers/reunionActorController';

const router: Router = Router();

const reunionController:  ReunionActorController = new ReunionActorController();

router.route('')
    .get(reunionController.findAll);

router.route('')
    .post(reunionController.create);

export const ReunionRoutes: Router = router;