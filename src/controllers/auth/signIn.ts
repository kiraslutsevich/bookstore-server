import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createAccessToken } from '../../utils/tokenUtils';
import type { RecNever } from '../../utils/types';
import db from '../../db';
import createCustomError from '../../utils/createCustomError';
import { verify } from '../../utils/hashedPassword';

type ReqBody = {
  email: string,
  password: string,
}
type ResBody = {
  user: object;
  token: string;
}
type ControllerType = RequestHandler<RecNever, ResBody, ReqBody, RecNever>

const signIn: ControllerType = async (req, res, next) => {
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
      throw createCustomError(StatusCodes.BAD_REQUEST, 'Validation Error', {
        path: 'body',
        field: 'password',
        type: 'invalid password',
        message: 'Invalid password entered',
      });
    }
    const token = createAccessToken(user.id);

    delete user.password;
    return res.status(StatusCodes.OK).json({ token, user });
  } catch (err) {
    next(err);
  }
};

export default signIn;
