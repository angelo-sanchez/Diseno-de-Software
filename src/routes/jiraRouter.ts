'use strict';

import { Router } from 'express';
import { JiraController } from './../controllers/jiraController';

const router: Router = Router();

const jiraCtrl: JiraController = new JiraController();

router.route('/issues')
    .get(jiraCtrl.findIssue);
   // .post(jiraCtrl.addIssue);

// router.route('/issues/:id')
//     .put(jiraCtrl.updateIssue)
//     .delete(jiraCtrl.deleteIssue);

router.route('/boards')
    .get(jiraCtrl.getAllBoards);

    
router.route('/boards/:boardId/issues')
.get(jiraCtrl.getIssuesForBoard);

router.route('/issue/:issueId')
    .get(jiraCtrl.getIssue);

router.route('/user/issues')
    .get(jiraCtrl.getIssuesForUser);

router.route('/boards/:boardId')
    .get(jiraCtrl.getBoard);

router.route('/dashboards')
    .get(jiraCtrl.getAllDashboards);

router.route('/users/')
    .get(jiraCtrl.getAllUsers);

router.route('/users/:accountId/searchAssignable')
    .get(jiraCtrl.searchAssignable);

export const JiraRouter: Router = router;