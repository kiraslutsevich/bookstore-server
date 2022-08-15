import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter';
import authRouter from './routes/authRouter';
import booksRouter from './routes/booksRouter';
import errorHandler from './middlewars/errorHandler';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type from './type';
import config from './config';

const app = express();

app.use(express.json({ limit: '50mb' }));

app.use(cors({
  origin: [config.front],
}));

app.use('/static', express.static(`${__dirname}/public`));
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/books', booksRouter);
app.use(errorHandler);

export default app;
