import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.customErrorData) {
    return res.status(err.customErrorData.code).json(err.customErrorData);
  }

  console.error(err);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'server error' });
};

export default errorHandler;
