import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { createToken } from '../../utils/tokenUtils';
import db from '../../db';
import createCustomError from '../../utils/error';

const signUp: Handler = async (req, res, next) => {
  try {
    const existingUser = await db.user.findOneBy({ email: req.body.email });
    if (existingUser) {
      throw createCustomError(StatusCodes.BAD_REQUEST, 'email must be unique');
    }

    let [user] = db.user.create(
      req.body,
    );

    user = await db.user.save(user);

    const token = createToken(user.id);
    return res.status(StatusCodes.OK).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export default signUp;
