import { Router } from 'express';
import { TestController } from '../controllers/testController';

const router: Router = Router();
const testCtrl: TestController = new TestController();

router.route('/server')
    .get(testCtrl.testServer);

router.route('/database')
    .get(testCtrl.testDatabase);


export const TestRouter: Router = router;