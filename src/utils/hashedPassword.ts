import * as crypto from 'crypto';
import config from '../config';

export const hasher = (password: string) => {
  return crypto
    .createHmac(
      config.hashAlgorithm,
      config.salt,
    )
    .update(password)
    .digest('hex');
};

export const verify = (password: string, hashedPassword: string): boolean => {
  return hasher(password) === hashedPassword;
};
