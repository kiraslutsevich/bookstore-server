import express from 'express';
import userRouter from './routes/userRouter';
import authRouter from './routes/authRouter';
import errorHandler from './middlewars/errorHandler';
import type from './type';

const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use(errorHandler);

export default app;
