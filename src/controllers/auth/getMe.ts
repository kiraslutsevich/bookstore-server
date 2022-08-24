import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

const getMe: Handler = async (req, res, next) => {
  try {
    return res.status(StatusCodes.OK).json(req.user);
  } catch (err) {
    next(err);
  }
};

export default getMe;
