'use strict';

import { Router } from 'express';
import { ReunionController } from './../controllers/reunionController';

const router: Router = Router();

const reunionCtrl: ReunionController = new ReunionController();

router.route('')
    .get(reunionCtrl.findAll);

router.route('')
    .post(reunionCtrl.create);

export const ReunionRoutes: Router = router;