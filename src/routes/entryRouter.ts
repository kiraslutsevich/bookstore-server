import express from 'express';
import signUp from '../controllers/entry/signUp';
import signIn from '../controllers/entry/signIn';
import createValidateMiddleware from '../middlewars/createValidateMiddleware';
import { signInSchema, signUpSchema } from '../validation/authSchemas';

const authRouter = express.Router();

authRouter.post('/signup', createValidateMiddleware(signUpSchema), signUp);
authRouter.post('/signin', createValidateMiddleware(signInSchema), signIn);

export default authRouter;
