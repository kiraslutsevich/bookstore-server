import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createToken } from '../../utils/tokenUtils';
import db from '../../db';
import createCustomError from '../../utils/error';
import { verify } from '../../utils/hashedPassword';

const signIn: Handler = async (req, res, next) => {
  try {
    const user = await db.user.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'user not found');
    }
    if (!verify(req.body.password, user.password)) {
      throw createCustomError(StatusCodes.BAD_REQUEST, 'invalid password');
    }
    const token = createToken(user.id);
    return res.status(StatusCodes.OK).json(token);
  } catch (err) {
    next(err);
  }
};

export default signIn;
