'use strict';

import { Router } from 'express';
import { ActorController } from './../controllers/actorController';

const router: Router = Router();

const actorCtrl: ActorController = new ActorController();

router.route('') //api/actor
    .get(actorCtrl.findAll);

router.route('')
    .post(actorCtrl.create);

export const ActorRouter: Router = router;

// HTTP → 4 METHODS ↔ API Rest CRUD
// GET : Read → Obtener datos → Array de objetos
// POST : Create → Insertar datos → Objeto (El que insertó)
// PUT : Update  → Actualiza un dato → Objeto (Como quedó actualizado)
// DELETE : Delete → Borra un dato → boolean

// HTTP → Códigos de estado
// 404 → Not Found → El recurso no existe (o no se encuentra en donde estamos buscando)
// 200 → Success → Todo OK!

// 403 → Forbidden → No tenes permisos para ver o acceder al recurso
// 401 → Not Authorized

// 5xx → Error en el servidor