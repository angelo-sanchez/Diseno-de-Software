'use strict';

import { Router } from 'express';
import { MetodologiaController } from './../controllers/metodologiaController';

const router: Router = Router();

const metodologiaCtrl: MetodologiaController = new MetodologiaController();

router.route('')
    .get(metodologiaCtrl.findAll);

router.route('')
    .post(metodologiaCtrl.create);

export const MetodologiaRouter: Router = router;