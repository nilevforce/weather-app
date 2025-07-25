import express from 'express';
import schemas from '../schemas/index.js';
import middlewares from '../middlewares/index.js';
import authController from '../controllers/auth/index.js';

const router = express.Router();

router.post(
  '/signup',
  middlewares.validateRequest(schemas.signupSchema, 'body'),
  authController.signup,
);

router.post(
  '/signin',
  middlewares.validateRequest(schemas.signinSchema, 'body'),
  authController.signin,
);

router.post('/signout', authController.signout);
router.post('/refresh', authController.refresh);

export default router;
