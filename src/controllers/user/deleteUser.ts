import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '../../db';

const deleteUser: Handler = async (req, res, next) => {
  try {
    await db.user.delete(req.user.id);
    return res.sendStatus(StatusCodes.OK).json({ message: `user ${req.user.id} deleted` });
  } catch (err) {
    next(err);
  }
};
export default deleteUser;
