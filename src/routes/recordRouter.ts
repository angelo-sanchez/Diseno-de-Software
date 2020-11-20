import { Router } from "express";
import { recordController } from "../controllers/record";

const router = Router();
const recordCtrl = new recordController();

router.route("").post(recordCtrl.record);

export const recordRouter = router;