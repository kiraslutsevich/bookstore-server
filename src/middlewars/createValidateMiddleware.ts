import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../utils/error';

import { NextFunction, Request, Response } from 'express';

const createValidateMiddleware = (schema: yup.AnyObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      if () {
        throw createCustomError(StatusCodes.NOT_FOUND, 'not found this id',);
      }
      return next();
    } catch (err) {
      next(err);
    }
  };
};

export default createValidateMiddleware;
