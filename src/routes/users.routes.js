import express from 'express';
import userController from '../controllers/users/index.js';

const router = express.Router();

router.get('/', userController.getUsers);

export default router;
