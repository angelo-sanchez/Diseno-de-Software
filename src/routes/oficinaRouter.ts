'use strict';

import { Router } from 'express';
import { OficinaController } from './../controllers/oficinaController';

const router: Router = Router();

const oficinaController: OficinaController = new OficinaController();

router.route('')
    .get(oficinaController.findAll);

router.route('')
    .post(oficinaController.create);

export const OficinaRouter: Router = router;