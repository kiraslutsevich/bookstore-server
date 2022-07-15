import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';
import { User } from '../../db/entity/User';

type ReqParams = {
  id: string;
}

type ResBody = User;

type ControllerType = RequestHandler<
ReqParams,
ResBody,
Record<string, never>,
Record<string, never>
>

const getUser: ControllerType = async (req, res, next) => {
  try {
    const user = await db.user.findOne({
      where: {
        id: +req.params.id,
      },
    });
    if (!user) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'user not found');
    }
    return res.status(StatusCodes.OK).json(user);
  } catch (err) {
    next(err);
  }
};

export default getUser;
