import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createToken } from '../../utils/tokenUtils';

const userA = {
  name: 'ass',
  id: '123',
  email: 'fs@mail.ru',
  password: 'fff',
};

const signUp: Handler = async (req, res, next) => {
  try {
    const token = createToken(userA.id);
    return res.status(StatusCodes.OK).json({ user: userA, token });
  } catch (err) {
    next(err);
  }
};

export default signUp;
