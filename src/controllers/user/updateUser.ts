import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { EmptyObject } from '../../utils/types';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';
import { User } from '../../db/entity/User';

type ReqBody = {
  firstName?: string;
  email?: string;
  lastName?: string;
  dob?: string;
}

type ResBody = {
  message: string;
  user: User;
}

type ReqParams = {
  id: string;
}

type ControllerType = RequestHandler<ReqParams, ResBody, ReqBody, EmptyObject>

const updateUser: ControllerType = async (req, res, next) => {
  try {
    const updateResult = await db.user.update(req.user.id, req.body);
    if (!updateResult.affected) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'user not found');
    }
    const user = await db.user.findOne({
      where: { id: +req.user.id },
    });

    return res.status(StatusCodes.OK).json({ message: 'successfully modified', user });
  } catch (err) {
    next(err);
  }
};

export default updateUser;
