import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Genre } from '../../db/entity/Genre';
import type { EmptyObject } from '../../utils/types';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';

type ReqParams = {
  id: string;
}

type ResBody = Genre[];

type ControllerType = RequestHandler<
ReqParams,
ResBody,
EmptyObject,
EmptyObject
>

const getAllGenres: ControllerType = async (req, res, next) => {
  try {
    const genres = await db.genre.find();
    if (!genres) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'books not found');
    }
    return res.status(StatusCodes.OK).json(genres);
  } catch (err) {
    next(err);
  }
};

export default getAllGenres;
