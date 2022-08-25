import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../utils/createCustomError';
import { verifyToken } from '../utils/tokenUtils';
import db from '../db/index';

const checkAuth: Handler = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw createCustomError(StatusCodes.UNAUTHORIZED, 'token is not exists');
    }
    if (!req.headers.authorization.startsWith('Bearer')) {
      throw createCustomError(StatusCodes.UNAUTHORIZED, 'request auth header does not include "Bearer"');
    }
    const { id } = verifyToken(req.headers.authorization.split(' ')[1]);
    const user = await db.user.findOne({
      relations: {
        rating: {
          Book: true,
        },
      },
      where: {
        id,
      },
    });
    if (!user) {
      throw createCustomError(StatusCodes.FORBIDDEN, 'invalid authorization');
    }
    req.user = user;
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      const customErr = createCustomError(StatusCodes.UNAUTHORIZED, 'Expired token');
      next(customErr);
      return;
    }
    if (err.name === 'JsonWebTokenError') {
      const customErr = createCustomError(StatusCodes.UNAUTHORIZED, 'Ivalid token');
      next(customErr);
      return;
    }
    next(err);
  }
};

export default checkAuth;
