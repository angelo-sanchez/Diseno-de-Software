'use strict';

import { Router } from 'express';
import { SalaController } from './../controllers/salaController';

const router: Router = Router();

const salaCtrl: SalaController = new SalaController();

router.route('')
    .get(salaCtrl.findAll);

router.route('')
    .post(salaCtrl.create);

router.route('/addActor')
    .put(salaCtrl.addActor);

export const SalaRouter: Router = router;