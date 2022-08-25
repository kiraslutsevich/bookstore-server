import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { Book } from 'src/db/entity/Book';
import db from '../../db/index';
import { Rating } from '../../db/entity/Rating';

type RequestBody = {
  bookId: string;
  rating: string;
}

type Response = Book;

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
    const bookRating = +req.body.rating;

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
    const book = await db.book.findOneBy({ id: bookId });
    ratingToUpdate.Book = book;
    ratingToUpdate.User = await db.user.findOneBy({ id: userId });
    ratingToUpdate.bookRating = bookRating;
    db.rating.create(ratingToUpdate);
    await db.rating.save(ratingToUpdate);

    const ratings = await db.rating.find({
      relations: {
        Book: true,
      },
      where: {
        Book: {
          id: bookId,
        },
      },
    });

    let mean: number;
    const length = ratings.length;
    if (!length) {
      mean = 0;
    } else {
      mean = Math.ceil(ratings.reduce(((acc, obj) => acc + obj.bookRating), 0) / length);
    }
    await db.book.update(bookId, { meanRating: mean });
    const updatedBook = await db.book.findOneBy({ id: bookId });
    return res
      .status(StatusCodes.CREATED)
      .json(updatedBook);
  } catch (err) {
    next(err);
  }
};
export default rateBook;
