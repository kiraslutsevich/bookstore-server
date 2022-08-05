import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter';
import authRouter from './routes/authRouter';
import errorHandler from './middlewars/errorHandler';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type from './type';
import config from './config';

const app = express();

app.use(express.json());
app.use(cors({
  origin: [config.front],
}));
app.use(express.static('static'));
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use(errorHandler);

export default app;
