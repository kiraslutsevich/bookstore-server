import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import createCustomError from '../utils/createCustomError';

type Value = {
  [key: string]: yup.StringSchema | yup.DateSchema | yup.NumberSchema;
};

type Schema = {
  body?: Value;
  params?: Value;
  query?: Value;
};

type ValidationData = {
  [key: string]: string;
}

const createValidateMiddleware = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tempSchema = {};
      Object.entries(schema).forEach(([key, val]) => {
        (tempSchema[key] = yup.object(val).noUnknown(true));
      });

      const yupSchema = yup.object().shape(tempSchema);
      await yupSchema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      }, { abortEarly: false, strict: true, stripUnknown: false });
      return next();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      if (err instanceof yup.ValidationError) {
        const payload: ValidationData[] = err.inner.map((elem) => {
          return {
            path: elem.path.split('.')[0],
            field: elem.path.split('.')[1],
            errorType: 'ValidationError',
            message: elem.errors[0].split('.')[1],
          };
        });
        next(createCustomError(StatusCodes.BAD_REQUEST, 'Validation Error', payload));
        return;
      }
      next(err);
    }
  };
};
export default createValidateMiddleware;
