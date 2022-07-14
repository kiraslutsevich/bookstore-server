import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createAccessToken } from '../../utils/tokenUtils';
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

type ControllerType = RequestHandler<Record<string, never>, ResBody, ReqBody, Record<string, never>>

const signUp: ControllerType = async (req, res, next) => {
  try {
    const existingUser = await db.user.findOneBy({ email: req.body.email });
    if (existingUser) {
      throw createCustomError(StatusCodes.BAD_REQUEST, 'email must be unique');
    }
    const dob = new Date(req.body.dob);

    const userData = req.body;
    userData.dob = dob;

    let user = db.user.create(userData);
    user = await db.user.save(user);
    const userId = user.id;

    const token = createAccessToken(userId);
    delete user.password;
    return res.status(StatusCodes.OK).json({ user, token });
  } catch (err) {
    if (err.driverError.routine === 'DateTimeParseError') {
      next(createCustomError(StatusCodes.BAD_REQUEST, 'wrong format of date', { payload: err.message }));
    }
    next(err);
  }
};

export default signUp;
