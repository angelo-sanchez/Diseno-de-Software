import { Router } from "express";
import { RolController } from "../controllers/rolController";

export const RolRouter = Router();
const rolCtrller = new RolController();

RolRouter.route('')
    .get(rolCtrller.findAll);
RolRouter.route('')
    .post(rolCtrller.create);