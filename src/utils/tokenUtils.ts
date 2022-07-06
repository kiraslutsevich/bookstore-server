import jwt from 'jsonwebtoken';
import config from '../config';

const verifyToken = (token: string) => {
  return jwt.verify(token, config.tokenSecretKey);
};

const createToken = (id: string) => {
  return jwt.sign(id, config.tokenSecretKey);
};

export default {
  verifyToken,
  createToken,
};
