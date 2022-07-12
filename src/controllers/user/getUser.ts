import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '../../db';

const getUser: Handler = async (req, res, next) => {
  try {
    const user = await db.user.findOne({
      where: {
        id: req.user.id,
      },
    });
    return res.status(StatusCodes.OK).json(user);
  } catch (err) {
    next(err);
  }
};

export default getUser;
