import jwt from 'jsonwebtoken';
import config from '../config';

export type TokenPayload = { id: number }

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.tokenSecretKey) as TokenPayload;
};

export const createToken = (id: number) => {
  return jwt.sign({ id }, config.tokenSecretKey);
};
