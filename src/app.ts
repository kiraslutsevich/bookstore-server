import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter';
import authRouter from './routes/authRouter';
import errorHandler from './middlewars/errorHandler';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type from './type';

const app = express();

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000'],
}));

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use(errorHandler);

export default app;
