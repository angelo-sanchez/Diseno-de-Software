import { Router } from "express";
import { LogoutController } from "../controllers/logoutController";

export const LogoutRouter = Router();
const ctrller = new LogoutController();
LogoutRouter.route("").post(ctrller.logout);