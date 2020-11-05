'use strict';

import { JiraService } from './../services/jiraService';
import { Request, Response } from 'express';
import { rejects } from 'assert';

export class JiraController {


    public findIssue(req: Request, res: Response){

        const issueId = req.params.issueId;

        JiraService.findIssue(issueId)
            .then((data: any) => {
                return res.status(200).json(data);
            })
            .catch((err: any) => {
                console.error(err);
            })

    }

    public getIssue(req: Request, res: Response) {
        const issueId : any = req.params.issueId;

        JiraService.getIssue(issueId)
            .then((data: any) => {
                return res.status(200).json(data);
            })
            .catch((err: any) => {
                return res.status(500).json(err);
            })
    }

    public getBoard(req: Request, res:Response) {
        
        const boardId : any = req.params.boardId;

        JiraService.getBoard(boardId)
            .then((data: any) => {
                return res.status(200).json(data)
            })
            .catch((err: any) => {
                console.error(err);
            })
    }


    public getIssuesForBoard(req: Request, res:Response) {
      
        const boardId: any = req.params.boardId;

        JiraService.getIssuesForBoard(boardId)
            .then((data: any) => {
                return res.status(200).json(data);
            })
            .catch((err: any) => {
                console.error(err);
                return res.status(500);
            })
    }

    public getAllDashboards(req: Request, res: Response) {

        JiraService.getAllDashboards()
            .then((data: any) => {
                return res.status(200).json(data);
            })
            .catch((err: any) => {
                console.error(err);
                return res.status(500);
            })
    }

    public getAllBoards(req: Request, res: Response) {
        
        JiraService.getAllBoards()
            .then((data: any) => {
                return res.status(200).json(data);
            })
            .catch((err: any) => {
                console.error(err);
                return res.status(500);

            })
    }

    // public updateIssue(req: Request, res:Response) {

    //     const issueId : any = req.params.issueId;
    //     const newIssue : any = req.body.newIssue;

    //     JiraService.updateIssue(issueId, newIssue)
    //         .then((data: any) => {
    //             return res.status(200).json(data);
    //         })
    //         .catch((err: any) => {
    //             console.error(err);
    //         })
    // }

    // public deleteIssue(req: Request, res:Response) {
    //     const idIssue = req.body.idIssue;

    //     JiraService.deleteIssue(idIssue)
    //         .then((data: any) => {
    //             return res.status(200).json(data);
    //         })
    //         .catch((err: any) => {
    //             console.error(err);
    //         })
    // }

    // public addIssue(req: Request, res:Response) {
        
    //     const issue = req.body.issue;

    //     JiraService.addIssue(issue)
    //         .then((data: any) => {
    //             return res.status(200).json(data);
    //         })
    //         .catch((err: any) => {
    //             console.error(err);
    //         })
    // }

    public getIssuesForUser(req: Request, res:Response) {
        const username: any = req.query.username;
        JiraService.getUsersIssues(username, true)
            .then((data: any) => {
                return res.status(200).json(data);
            })
            .catch((err: any) => {
                return res.status(500).json(err);
            })
    }
    public getUser(req: Request, res: Response){

        const username : any = req.query.username;

        JiraService.getUser(username)
            .then((data: any) => {
                return res.status(200).json(data);
            })
            .catch((err: any) => {
                console.error(err);
                return res.status(500).json(err);
            })
    }

    public getAllUsers(req: Request, res:Response) {
        
        JiraService.getAllUsers()
            .then((data: any) => {
                return res.status(200).json(data);
            })
            .catch((err: any) => {
                console.error(err);
                return res.status(500).json(err);
            })
    }

    public searchAssignable(req: Request, res:Response) {
        
        const accountId: any = req.params.accountId;

        JiraService.searchAssignable(accountId)
            .then((data: any) => {
                return res.status(200).json(data);
            })
            .catch((err: any) => {
                console.error(err);
                return res.status(500).json(err);
            })
    }
}
