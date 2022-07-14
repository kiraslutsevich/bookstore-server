import express from 'express';
import getMe from '../controllers/auth/getMe';
import signUp from '../controllers/auth/signUp';
import signIn from '../controllers/auth/signIn';
import checkAuth from '../middlewars/checkAuth';
import createValidateMiddleware from '../middlewars/createValidateMiddleware';
import { signInSchema, signUpSchema } from '../validation/authSchemas';

const authRouter = express.Router();

authRouter.get('/me', checkAuth, getMe);
authRouter.post('/signup', createValidateMiddleware(signUpSchema), signUp);
authRouter.post('/signin', createValidateMiddleware(signInSchema), signIn);

export default authRouter;
