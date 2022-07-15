import express from 'express';
import controllers from '../controllers/auth';
import checkAuth from '../middlewars/checkAuth';
import createValidateMiddleware from '../middlewars/createValidateMiddleware';
import { signInSchema, signUpSchema } from '../validation/authSchemas';

const authRouter = express.Router();

authRouter.get('/me', checkAuth, controllers.getMe);
authRouter.post('/signup', createValidateMiddleware(signUpSchema), controllers.signUp);
authRouter.post('/signin', createValidateMiddleware(signInSchema), controllers.signIn);

export default authRouter;
