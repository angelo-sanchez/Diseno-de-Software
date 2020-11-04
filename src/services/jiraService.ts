'use strict';

import JiraApi from 'jira-client';
import JiraClient from "jira-connector";
import { config } from './../utils/config';


// let jira = new JiraApi({
//     protocol: config.JIRA.PROTOCOL,
//     host: config.JIRA.HOST,
//     username: config.JIRA.USERNAME,
//     password: config.JIRA.PASSWORD,
//     apiVersion: config.JIRA.APIVERSION,
//     strictSSL: true
// });


let jiraConnector = new JiraClient({
    host: config.JIRA.HOST,
    basic_auth: {
        username: 'farodriguez@alumnos.exa.unicen.edu.ar',
        password: 'r7fKDTOOyYyoqtd9Mwga6CB2'
    },
    strictSSL: false
})

export class JiraService {


    public static findIssue(issueNumber: any){
        
        return new Promise((resolve:any, reject:any) => {
            jiraConnector.issue.getIssue()
                .then((data: any) => {
                    resolve(data);
                })
                .catch((err: any) => {
                    reject(err);
                });
        })

    }

    public static getBoard(board: any) {

        return new Promise((resolve: any, reject:any) =>{
            jiraConnector.board.getBoard({ boardId: board })
            .then((data: any) => {
                resolve(data);
            })
            .catch((err:any) => {
                reject(err);
            })
        })
    }


    public static getAllDashboards(){

        return new Promise((resolve: any, reject: any) => {
            jiraConnector.dashboard.getAllDashboards()
                .then((data: any) => {
                    resolve(data);
                })
                .catch((err:any) => {
                    reject(err);
                })
        })
    }

    public static getAllBoards() {
        
        return new Promise((resolve: any, reject: any) => {
            jiraConnector.board.getAllBoards()
            .then((data: any) => {
                resolve(data);
            })
            .catch((err:any) => {
                reject(err);
            })
        })
       
    }


    public static addIssue(issue: any) {
        
        return new Promise((resolve: any, reject: any) => {
            
            // jira.addNewIssue(issue)
            //     .then((data:any) => {
            //         resolve(data)
            //     })
            //     .catch((err:any) => {
            //         reject(err);
            //     })
        })
    }

    public static deleteIssue(issue: any) {

        return new Promise((resolve: any, reject: any) => {
            // jira.deleteIssue(issue)
            //     .then((data:any) => {
            //         resolve(data);
            //     })
            //     .catch((err:any) => {
            //         reject(err);
            //     })
        })
    }

    public static getIssuesForBoard(board: any) {

        return new Promise((resolve: any, reject: any) => {
            jiraConnector.board.getIssuesForBoard({ boardId: board })
                .then((data:any) => {
                    resolve(data);
                })
                .catch((err:any) => {
                    reject(err);
                })
        })
    }

    public static updateIssue(issueId: any, issueUpdate: any) {
        
        return new Promise((resolve: any, reject: any) => {
            // jira.updateIssue(issueId, issueUpdate)
            //     .then((data: any) => {
            //         resolve(data)
            //     })
            //     .catch((err: any) => {
            //         reject(err);
            //     })
        })
    }

    public static getUser(username: string) {
        
        return new Promise((resolve: any, reject: any) => {
            jiraConnector.user.getUser({ username: username })
                .then((data: any) => {
                    resolve(data);
                })
                .catch((err: any) => {
                    reject(err);
                })
        })
    }

    public static getAllUsers() {
        
        return new Promise((resolve: any, reject: any) => {
            jiraConnector.user.all({})
                .then((data: any) => {
                    resolve(data);
                })
                .catch((err: any) => {
                    reject(err);
                })
        })
    }

    public static searchAssignable(accountId: any) {

        return new Promise((resolve: any, reject: any) => {
            jiraConnector.user.search({accountId: accountId})
                .then((data: any) => {
                    resolve(data);
                })
        })
    }
}

