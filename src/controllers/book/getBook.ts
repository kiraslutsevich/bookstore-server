import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { EmptyObject } from '../../utils/types';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';
import { Book } from '../../db/entity/Book';

type ReqParams = {
  id: string;
}

type ResBody = {
  book: Book;
  userRating: number;
};

type ControllerType = RequestHandler<
ReqParams,
ResBody,
EmptyObject,
EmptyObject
>

const getUser: ControllerType = async (req, res, next) => {
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
    const userRating = book.rating.find((el) => el.User.id === req.user.id).bookRating;
    return res.status(StatusCodes.OK).json({ book, userRating });
  } catch (err) {
    next(err);
  }
};

export default getUser;
