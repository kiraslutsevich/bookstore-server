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
  userRating?: number;
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
        rating: true,
      },
      where: {
        id: +req.params.id,
      },
    });
    if (!book) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'book not found');
    }
    if (req.query.userId) {
      let userRating;
      const currentUserRating = book.rating.find((el) => el.userId === +req.query.userId);
      if (!currentUserRating) {
        userRating = 0;
      } else {
        userRating = currentUserRating.bookRating;
      }
      return res.status(StatusCodes.OK).json({ book, userRating });
    }
    return res.status(StatusCodes.OK).json({ book });
  } catch (err) {
    next(err);
  }
};

export default getBook;
