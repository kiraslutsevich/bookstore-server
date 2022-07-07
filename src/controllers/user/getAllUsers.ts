import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

const getAllUser: Handler = async (req, res, next) => {
  try {
    return res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default getAllUser;
