import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../utils/error';
import { verifyToken } from '../utils/tokenUtils';

const checkAuth: Handler = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw createCustomError(StatusCodes.UNAUTHORIZED, 'token is not exists');
    }
    const { id } = verifyToken(req.headers.authorization);
    // if (id === userA.id) {
    //   return res.status(StatusCodes.OK).json({ userA });
    // }

    return next();
  } catch (err) {
    next(err);
  }
};

export default checkAuth;
