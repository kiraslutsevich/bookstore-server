import express from 'express';
import cors from 'cors';
import path from 'path';
import userRouter from './routes/userRouter';
import authRouter from './routes/authRouter';
import booksRouter from './routes/booksRouter';
import cartRouter from './routes/cartRouter';
import errorHandler from './middlewars/errorHandler';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type from './type';
import config from './config';
import genresRouter from './routes/genresRouter';

const app = express();

app.use(express.json({ limit: '50mb' }));

app.use(cors({
  origin: [config.front],
}));

app.use('/static', express.static(path.resolve(__dirname, '../public')));
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/books', booksRouter);
app.use('/genres', genresRouter);
app.use('/cart', cartRouter);
app.use(errorHandler);

export default app;
