import { Router } from "express";
import express from 'express';
import signUp from '../controllers/auth/signUp';
import signIn from '../controllers/auth/signIn';

const authRouter: Router = express.Router();

authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);

export default authRouter;