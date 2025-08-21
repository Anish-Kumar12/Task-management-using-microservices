import { saveUser } from "../controller/user.controller.js";

import express from 'express';
const router = express.Router();

router.post('/save', saveUser);

export default router;