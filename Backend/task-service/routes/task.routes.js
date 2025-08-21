import {createTask , getallTasks} from '../controller/task.controller.js';

import express from 'express';
const router = express.Router();

router.post('/create', createTask);
router.get('/getall', getallTasks);

export default router;