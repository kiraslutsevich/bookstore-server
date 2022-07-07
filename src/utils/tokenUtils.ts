import jwt from 'jsonwebtoken';
import config from '../config';

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.tokenSecretKey);
};

export const createToken = (id: string) => {
  return jwt.sign(id, config.tokenSecretKey);
};
