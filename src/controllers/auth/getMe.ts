import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';

const getMe: Handler = async (req, res, next) => {
  try {
    const user = await db.user.findOne({
      where: {
        id: req.user.id,
      },
    });
    if (!user) {
      throw createCustomError(StatusCodes.NOT_FOUND, `user ${req.user.id}not found`);
    }
    return res.status(StatusCodes.OK).json(user);
  } catch (err) {
    next(err);
  }
};

export default getMe;
