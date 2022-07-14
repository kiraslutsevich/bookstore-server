import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify, hasher } from '../../utils/hashedPassword';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';

type ReqBody = {
  oldPassword: string;
  password: string;
}

type ResBody = {
  message: string;
}

type ControllerType = RequestHandler<Record<string, never>, ResBody, ReqBody, Record<string, never>>

const changePassword: ControllerType = async (req, res, next) => {
  try {
    const user = await db.user
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id: req.user.id })
      .getOne();

    if (!verify(req.body.oldPassword, user.password)) {
      throw createCustomError(StatusCodes.BAD_REQUEST, 'invalid password');
    }
    const updateResult = await db.user.update(req.user.id, { password: hasher(req.body.password) });
    if (!updateResult.affected) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'user not found');
    }
    return res.status(StatusCodes.OK).json({ message: 'password changed successfully' });
  } catch (err) {
    next(err);
  }
};
export default changePassword;
