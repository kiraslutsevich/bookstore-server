import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Book } from 'src/db/entity/Book';
import type { EmptyObject } from '../../utils/types';
import db from '../../db';

type ControllerType = RequestHandler<EmptyObject, Book[], EmptyObject, EmptyObject>

const addToCart: ControllerType = async (req, res, next) => {
  try {
    const user = await db.user.findOne({
      relations: {
        favorites: true,
      },
      where: {
        id: req.user.id,
      },
    });

    return res.status(StatusCodes.OK).json(user.favorites);
  } catch (err) {
    next(err);
  }
};

export default addToCart;
