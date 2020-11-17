import { Router } from "express";
import { LoginController } from "../controllers/login";

const router = Router();
const loginCtrl = new LoginController();

router.route("").post(loginCtrl.login);

export const LoginRouter = router;