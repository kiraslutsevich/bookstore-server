import { Router } from "express";
import express from 'express';

const userRouter: Router = express.Router();

userRouter.post('/');
userRouter.get('/');
userRouter.get('/:id');
userRouter.delete('/:id');
userRouter.patch('/:id');

export default userRouter;