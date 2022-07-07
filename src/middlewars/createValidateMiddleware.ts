import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import createCustomError from '../utils/error';

const createValidateMiddleware = (schema: yup.AnyObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err) {
      const customErr = createCustomError(StatusCodes.BAD_REQUEST, 'Validation Error', err.errors);
      next(customErr);
    }
  };
};

export default createValidateMiddleware;
