import jwt from 'jsonwebtoken';
import config from '../config';

export type TokenPayload = { id: number }

export const createAccessToken = (id: number) => {
  const payload = { id };
  return jwt.sign(
    payload,
    config.tokenSecretKey,
    { expiresIn: config.accessExpires },
  );
};

export const verifyToken = (token: string) => {
  const payload = jwt.verify(token, config.tokenSecretKey);
  return payload as TokenPayload;
};
