import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { createAccessToken } from '../../utils/tokenUtils';
import db from '../../db';
import createCustomError from '../../utils/createCustomError';

type ReqBody = {
  firstName: string;
  email: string;
  lastName: string;
  dob: string;
  password: string;
}

type ResBody = {
  user: object;
  token: string;
}

type ControllerType = RequestHandler<Record<string, never>, ResBody, ReqBody, Record<string, never>>

const signUp: ControllerType = async (req, res, next) => {
  try {
    const existingUser = await db.user.findOneBy({ email: req.body.email });
    if (existingUser) {
      throw createCustomError(StatusCodes.BAD_REQUEST, 'email must be unique');
    }

    let user = db.user.create(req.body);
    user = await db.user.save(user);
    const userId = user.id;

    const token = createAccessToken(userId);
    delete user.password;
    return res.status(StatusCodes.OK).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export default signUp;
