import express from 'express';
import userRouter from './routes/userRouter';
import authRouter from './routes/entryRouter';
import errorHandler from './middlewars/errorHandler';
import type from './type';

export const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use(errorHandler);
