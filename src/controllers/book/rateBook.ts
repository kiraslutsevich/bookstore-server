import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { Book } from 'src/db/entity/Book';
import db from '../../db/index';
import { Rating } from '../../db/entity/Rating';
import { runInNewContext } from 'vm';

type RequestBody = {
  bookId: string;
  rating: string;
}

type Response = {
  updatedBook: Book;
  userRating: number;
};

type ControllerType = RequestHandler<
Record<string, never>,
Response,
RequestBody,
Record<string, never>
>

const rateBook: ControllerType = async (req, res, next) => {
  try {
    const bookId = +req.body.bookId;
    const currentUserId = +req.user.id;
    const bookRating = +req.body.rating;

    const ratingOverwriting = await db.rating.findOne({
      relations: {
        book: true,
      },
      where: {
        book: {
          id: bookId,
        },
        userId: currentUserId,
      },
    });
    const ratingToUpdate = ratingOverwriting || new Rating();
    const book = await db.book.findOneBy({ id: bookId });
    ratingToUpdate.book = book;
    ratingToUpdate.user = await db.user.findOneBy({ id: currentUserId });
    ratingToUpdate.bookRating = bookRating;
    db.rating.create(ratingToUpdate);
    await db.rating.save(ratingToUpdate);

    const ratings = await db.rating.find({
      relations: {
        book: true,
      },
      where: {
        book: {
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
    const updatedBook = await db.book.findOne({
      relations: {
        rating: true,
      },
      where: {
        id: bookId,
      },
    });

    const userRating = updatedBook.rating.find((el) => el.userId === currentUserId).bookRating;

    return res
      .status(StatusCodes.CREATED)
      .json({ updatedBook, userRating });
  } catch (err) {
    next(err);
  }
};
export default rateBook;
