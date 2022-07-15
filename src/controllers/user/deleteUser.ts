import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { EmptyObject } from '../../utils/types';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';

type ReqParams = {
  id: string;
}

type ResBody = {
  message: string;
}

// eslint-disable-next-line max-len
type ControllerType = RequestHandler<ReqParams, ResBody, EmptyObject, EmptyObject>

const deleteUser: ControllerType = async (req, res, next) => {
  try {
    const deleteResult = await db.user.delete(req.params.id);
    if (!deleteResult.affected) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'user not found');
    }
    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    next(err);
  }
};
export default deleteUser;
