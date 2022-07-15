import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createAccessToken } from '../../utils/tokenUtils';
import type { RecNever } from '../../utils/types';
import db from '../../db';
import createCustomError from '../../utils/createCustomError';
import { User } from '../../db/entity/User';

type ReqBody = {
  firstName: string;
  email: string;
  lastName: string;
  dob: string | Date;
  password: string;
}

type ResBody = {
  user: User;
  token: string;
}

type ControllerType = RequestHandler<RecNever, ResBody, ReqBody, RecNever>

const signUp: ControllerType = async (req, res, next) => {
  try {
    const existingUser = await db.user.findOneBy({ email: req.body.email });
    if (existingUser) {
      throw createCustomError(StatusCodes.BAD_REQUEST, 'email must be unique');
    }

    const userData = req.body;
    userData.dob = new Date(req.body.dob);

    let user = db.user.create(userData);
    user = await db.user.save(user);

    const token = createAccessToken(user.id);
    delete user.password;
    return res.status(StatusCodes.OK).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export default signUp;
