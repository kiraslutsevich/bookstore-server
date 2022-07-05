import jwt from 'jsonwebtoken';
import config from '../config';

const verifyToken = (token) => {
  return jwt.verify(token, config.tokenSecretKey)
}

const createToken = (id) => {
  return jwt.sign(id, config.tokenSecretKey);
}

export default {
  verifyToken,
  createToken,
}
