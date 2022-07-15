import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify, hasher } from '../../utils/hashedPassword';
import type { EmptyObject } from '../../utils/types';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';

type ReqBody = {
  oldPassword: string;
  password: string;
}

type ResBody = {
  message: string;
}

type ControllerType = RequestHandler<EmptyObject, ResBody, ReqBody, EmptyObject>

const changePassword: ControllerType = async (req, res, next) => {
  try {
    const user = await db.user
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id: req.user.id })
      .getOne();

    if (!verify(req.body.oldPassword, user.password)) {
      throw createCustomError(StatusCodes.BAD_REQUEST, 'Validation Error', {
        path: 'body',
        field: 'password',
        type: 'invalid password',
        message: 'Invalid password entered',
      });
    }
    await db.user.update(req.user.id, { password: hasher(req.body.password) });

    return res.status(StatusCodes.OK).json({ message: 'password changed successfully' });
  } catch (err) {
    next(err);
  }
};
export default changePassword;
