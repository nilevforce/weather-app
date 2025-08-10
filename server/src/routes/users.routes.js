import express from 'express';
import userController from '../controllers/users/index.js';
import schemas from '../schemas/index.js';
import middlewares from '../middlewares/index.js';

const router = express.Router();

router.get(
  '/',
  middlewares.checkRole(['ADMIN']),
  userController.getUsers,
);

router.get(
  '/:id',
  middlewares.validateRequest(schemas.userParamsSchema, 'params'),
  userController.getUserById,
);

export default router;
