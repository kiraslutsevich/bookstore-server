import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../utils/error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: CustomError, req?: Request, res?: Response, next?: NextFunction) => {
  if (err.customErrorData) {
    return res.status(err.customErrorData.code).json({ message: err.customErrorData.message });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'server error' });
};

export default errorHandler;
