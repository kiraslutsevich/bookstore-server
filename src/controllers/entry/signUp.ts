import { Handler, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import { createAccessToken } from '../../utils/tokenUtils';
import db from '../../db';
import createCustomError from '../../utils/error';

type ReqBody = {
  firstName: string,
  email: string,
  lastName: string,
  dob: string,
  password: string,
}

type ExtendedRequest = Request<unknown, unknown, ReqBody>

const signUp: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const existingUser = await db.user.findOneBy({ email: req.body.email });
    if (existingUser) {
      throw createCustomError(StatusCodes.BAD_REQUEST, 'email must be unique');
    }

    let user = db.user.create(req.body);
    user = await db.user.save(user);
    const userId = user.id;

    const token = createAccessToken(userId);

    return res.status(StatusCodes.OK).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export default signUp;
