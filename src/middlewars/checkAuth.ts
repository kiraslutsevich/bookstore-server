import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../utils/error';
import { verifyToken } from '../utils/tokenUtils';
import db from '../db/index';

const checkAuth: Handler = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw createCustomError(StatusCodes.UNAUTHORIZED, 'token is not exists');
    }
    if (!req.headers.authorization.startsWith('Bearer')) {
      throw createCustomError(StatusCodes.UNAUTHORIZED, 'request does not include "Bearer"');
    }
    const { id } = verifyToken(req.headers.authorization.split(' ')[1]);
    const user = await db.user.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw createCustomError(StatusCodes.UNAUTHORIZED, 'invalid authorization');
    }
    req.user = user;
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      const customErr = createCustomError(StatusCodes.UNAUTHORIZED, 'TokenExpiredError', { expiredAt: err.expiredAt });
      next(customErr);
    }
    if (err.name === 'JsonWebTokenError') {
      const customErr = createCustomError(StatusCodes.UNAUTHORIZED, 'JsonWebTokenError', { message: err.message });
      next(customErr);
    }
    next(err);
  }
};

export default checkAuth;
