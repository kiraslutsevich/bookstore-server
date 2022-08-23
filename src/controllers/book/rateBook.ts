import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import db from '../../db/index';
import { Rating } from '../../db/entity/Rating';

type RequestBody = {
  bookId: string;
  bookRating: string;
}

type Response = {
  payload: Rating;
}

type ControllerType = RequestHandler<
Record<string, never>,
Response,
RequestBody,
Record<string, never>
>

const rateBook: ControllerType = async (req, res, next) => {
  try {
    const bookId = +req.body.bookId;
    const userId = +req.user.id;
    const bookRating = +req.body.bookRating;
    const ratingOverwriting = await db.rating.findOne({
      relations: {
        Book: true,
        User: true,
      },
      where: {
        Book: {
          id: bookId,
        },
        User: {
          id: userId,
        },
      },
    });
    const ratingToUpdate = ratingOverwriting || new Rating();
    ratingToUpdate.Book = await db.book.findOneBy({ id: bookId });
    ratingToUpdate.User = await db.user.findOneBy({ id: userId });
    ratingToUpdate.bookRating = bookRating;
    db.rating.create(ratingToUpdate);
    await db.rating.save(ratingToUpdate);
    return res
      .status(StatusCodes.CREATED)
      .json({ payload: ratingToUpdate });
  } catch (err) {
    next(err);
  }
};
export default rateBook;
