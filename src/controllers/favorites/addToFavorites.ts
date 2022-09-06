import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Book } from '../../db/entity/Book';
import createCustomError from '../../utils/createCustomError';
import type { EmptyObject } from '../../utils/types';
import db from '../../db';

type ReqParams = {
  id: string;
};

type ControllerType = RequestHandler<ReqParams, Book, EmptyObject, EmptyObject>

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

    const isFavorite = user.favorites.find((book) => book.id === +req.params.id);
    if (isFavorite) {
      throw createCustomError(StatusCodes.BAD_REQUEST, 'the book is already in favorites');
    }

    const book = await db.book.findOne({
      where: {
        id: +req.params.id,
      },
    });
    if (!book) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'the book is not found');
    }

    user.favorites.push(book);
    await db.user.save(user);

    return res.status(StatusCodes.OK).json(book);
  } catch (err) {
    next(err);
  }
};

export default addToCart;
