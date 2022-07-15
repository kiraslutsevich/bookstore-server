import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';

type ReqBody = {
  firstName?: string;
  email?: string;
  lastName?: string;
  dob?: string;
}

type ResBody = {
  message: string
}

type ReqParams = {
  id: string;
}

type ControllerType = RequestHandler<ReqParams, ResBody, ReqBody, Record<string, never>>

const updateUser: ControllerType = async (req, res, next) => {
  try {
    const updateResult = await db.user.update(req.user.id, req.body);
    if (!updateResult.affected) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'user not found');
    }
    return res.status(StatusCodes.OK).json({ message: 'successfully modified' });
  } catch (err) {
    next(err);
  }
};

export default updateUser;
