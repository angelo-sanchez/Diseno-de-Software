
'use strict';

import { Router } from 'express';
import { SalaOficinaController } from './../controllers/salaOficinaController';

const router: Router = Router();

const salaOficinaController:  SalaOficinaController = new SalaOficinaController();

router.route('')
    .get(salaOficinaController.findAll);

router.route('')
    .post(salaOficinaController.create);

export const SalaOficinaRoutes: Router = router;