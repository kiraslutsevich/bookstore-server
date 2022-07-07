import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

const changePassword: Handler = async (req, res, next) => {
  try {
    return res.status(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};
export default changePassword;
