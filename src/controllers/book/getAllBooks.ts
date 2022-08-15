import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Book } from '../../db/entity/Book';
import type { EmptyObject } from '../../utils/types';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';

type ReqParams = {
  id: string;
}

type ResBody = Book[];

type ControllerType = RequestHandler<
ReqParams,
ResBody,
EmptyObject,
EmptyObject
>

const getAllBooks: ControllerType = async (req, res, next) => {
  try {
    const books = await db.book.find();
    if (!books) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'books not found');
    }
    return res.status(StatusCodes.OK).json(books);
  } catch (err) {
    console.log(err)
    next(err);
  }
};

export default getAllBooks;
