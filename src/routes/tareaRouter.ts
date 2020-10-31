

'use strict';
import { TareaController } from './../controllers/tareaController';
import { Router } from 'express';


const router: Router = Router();

const tareaController:  TareaController = new TareaController();

router.route('')
    .get(tareaController.findAll);

router.route('')
    .post(tareaController.create);

export const TareaRoutes: Router = router;