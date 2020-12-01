'use strict';

import { Router } from 'express';
import { ReunionActorController } from './../controllers/reunionActorController';

const router: Router = Router();

const reunionController:  ReunionActorController = new ReunionActorController();

router.route('')
    .get(reunionController.findAll);

router.route('')
    .post(reunionController.create);

router.route('/setValue')
    .put(reunionController.setValue);

router.route('/getActoresReunion')
    .get(reunionController.getActoresReunion);

export const ReunionActorRoutes: Router = router;