import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { EmptyObject } from '../../utils/types';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';
import { Book } from '../../db/entity/Book';

type ReqParams = {
  id: string;
}

type ReqQuery = {
  userId?: number;
}

type ResBody = {
  book: Book;
  bookRating?: number;
};

type ControllerType = RequestHandler<
ReqParams,
ResBody,
EmptyObject,
ReqQuery
>

const getBook: ControllerType = async (req, res, next) => {
  try {
    const book = await db.book.findOne({
      relations: {
        rating: {
          User: true,
        },
      },
      where: {
        id: +req.params.id,
      },
    });
    if (!book) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'book not found');
    }
    if (req.query.userId) {
      let bookRating;
      const userRating = book.rating.find((el) => el.User.id === +req.query.userId);
      if (!userRating) {
        bookRating = 0;
      } else {
        bookRating = userRating.bookRating;
      }
      return res.status(StatusCodes.OK).json({ book, bookRating });
    }
    return res.status(StatusCodes.OK).json({ book });
  } catch (err) {
    next(err);
  }
};

export default getBook;
