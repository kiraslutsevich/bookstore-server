import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createAccessToken } from '../../utils/tokenUtils';
import db from '../../db';
import createCustomError from '../../utils/createCustomError';
import { verify } from '../../utils/hashedPassword';

const signIn: Handler = async (req, res, next) => {
  try {
    const user = await db.user
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: req.body.email })
      .getOne();

    if (!user) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'user not found');
    }
    if (!verify(req.body.password, user.password)) {
      throw createCustomError(StatusCodes.BAD_REQUEST, 'invalid password');
    }
    const token = createAccessToken(user.id);

    delete user.password;
    return res.status(StatusCodes.OK).json({ token, user });
  } catch (err) {
    next(err);
  }
};

export default signIn;
