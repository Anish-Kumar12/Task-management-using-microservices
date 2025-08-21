import { saveUser , getAllUser} from "../controller/user.controller.js";

import express from 'express';
const router = express.Router();

router.post('/save', saveUser);
router.get('/getAll', getAllUser);

export default router;