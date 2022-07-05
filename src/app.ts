import express, { Express } from 'express';
import crypto from 'node:crypto'
import userRouter from './routes/userRouter';
import authRouter from './routes/authRouter';

const app: Express = express();

app.use(express.json())
app.use('/user', userRouter);
app.use('/auth', authRouter);
console.log(crypto.randomBytes(64).toString('hex'))
export default app;
