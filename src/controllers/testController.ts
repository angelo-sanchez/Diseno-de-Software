import { Request, Response } from 'express';

import { TestService } from './../services/testService';

export class TestController {


    /**
     * Test database server
     * @param req 
     * @param res 
     */
    public testServer(req: Request, res: Response) {

        TestService.test()
            .then((data: any) => {
                return res.status(200).json({ msg: data });
            })
            .catch((err: any) => {
                return res.status(500).json({ msg: 'COMMON.INTERNAL_SERVER_ERROR' });
            });
    }


    /**
     * Test database connection
     * @param req 
     * @param res 
     */
    public testDatabase(req: Request, res: Response) {
        console.log(2);
        TestService.testDatabase()
            .then((data: any) => {
                return res.status(200).json(data);
            })
            .catch((err: any) => {
                return res.status(500).json({ msg: 'COMMON.INTERNAL_SERVER_ERROR' });
            })
    }

}