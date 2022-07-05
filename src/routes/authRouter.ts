import { Router } from "express";
import express from 'express';
import { createValidatorMiddleware } from '../middlewars/createValidatorMiddleware';

const userRouter: Router = express.Router();

userRouter.post('/', createValidatorMiddleware);
userRouter.get('/', createValidatorMiddleware);

export default userRouter;