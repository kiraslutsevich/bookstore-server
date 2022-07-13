import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';

type ReqParams = {
  id: string;
}

type ResBody = {
  message: string;
}

// eslint-disable-next-line max-len
type ControllerType = RequestHandler<ReqParams, ResBody, Record<string, never>, Record<string, never>>

const deleteUser: ControllerType = async (req, res, next) => {
  try {
    const deleteResult = await db.user.delete(req.params.id);
    if (!deleteResult.affected) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'deletion did not happen');
    }
    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    next(err);
  }
};
export default deleteUser;
