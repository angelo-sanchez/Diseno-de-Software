'use strict';

import { Router } from 'express';
import { ProyectoController } from './../controllers/proyectoController';

const router: Router = Router();

const proyectoController: ProyectoController = new ProyectoController();

router.route('')
    .get(proyectoController.findAll);

router.route('')
    .post(proyectoController.create);

export const ProyectoRoutes: Router = router;