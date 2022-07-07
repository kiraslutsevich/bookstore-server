import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../utils/error';
import { verifyToken } from '../utils/tokenUtils';

const userA = {
  name: 'ass',
  id: '21',
  email: 'fs@mail.ru',
  password: 'fff',
};

const checkAuth: Handler = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw createCustomError(StatusCodes.UNAUTHORIZED, 'token is not exists', { a: 'a' });
    }
    const id = verifyToken(req.headers.authorization.split(' ')[1]);
    if (id === userA.id) {
      return res.status(StatusCodes.OK).json({ userA });
    }

    return next();
  } catch (err) {
    next(err);
  }
};

export default checkAuth;
