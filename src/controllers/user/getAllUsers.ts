import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '../../db';

const getAllUser: Handler = async (req, res, next) => {
  try {
    const users = await db.user.find({
      select: {
        firstName: true,
        lastName: true,
        dob: true,
        email: true,
      },
    });
    return res.sendStatus(StatusCodes.OK).json(users);
  } catch (err) {
    next(err);
  }
};

export default getAllUser;
