import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import createCustomError from '../utils/createCustomError';

type Value = {
  [key: string]: yup.StringSchema | yup.DateSchema;
};

type Schema = {
  body?: Value
  params?: Value
  query?: Value
};

const createValidateMiddleware = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tempSchema = {};
      Object.entries(schema).forEach(([key, val]) => {
        (tempSchema[key] = yup.object(val));
      });
      const yupSchema = yup.object().shape(tempSchema);
      await yupSchema.validate({
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
