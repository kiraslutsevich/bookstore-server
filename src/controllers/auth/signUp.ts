import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import tokenUtils from '../../utils/tokenUtils';
import createCustomError from '../../utils/error';

const userA = {
  name: 'ass',
  id: '123',
  email: 'fs@mail.ru',
  password: 'fff',
};

const signUp: Handler = async (req, res, next) => {
  try {
    const token = tokenUtils.createToken(userA.id);
    return res.status(200).json({ user: userA, token });
  } catch (err) {
    next(err);
  }
};

export default signUp;
