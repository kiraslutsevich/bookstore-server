import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify, hasher } from '../../utils/hashedPassword';
import createCustomError from '../../utils/error';
import db from '../../db';

const changePassword: Handler = async (req, res, next) => {
  try {
    if (!verify(req.body.password, req.user.password)) {
      throw createCustomError(StatusCodes.BAD_REQUEST, 'invalid password');
    }
    await db.user.update(req.user.id, { password: hasher(req.body.newPassword) });
    return res.status(StatusCodes.OK).json({ message: 'password changed successfully' });
  } catch (err) {
    next(err);
  }
};
export default changePassword;
