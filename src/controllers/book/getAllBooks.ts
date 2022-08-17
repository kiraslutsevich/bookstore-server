import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Between, FindManyOptions, ILike } from 'typeorm';
import { Book } from '../../db/entity/Book';
import type { EmptyObject } from '../../utils/types';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';

type ReqParams = {
  id: string;

}

type ReqQuery = {
  column?: string;
  order?: 'ASC' | 'DESC';
  perPage?: number;
  page?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  genresId?: number[];
}

type ResBody = Book[];

type ControllerType = RequestHandler<
ReqParams,
ResBody,
EmptyObject,
ReqQuery
>

const getAllBooks: ControllerType = async (req, res, next) => {
  console.log(req.query.genresId)
  try {
    const order = {
      [req.query.column]: req.query.order,
    };
    const take = req.query.perPage || 12;
    const page = +req.query.page || 1;
    const skip = take ? (page - 1) * take : null;
    const price = Between(req.query.minPrice || 0, req.query.maxPrice || 10000);
    let where: FindManyOptions<Book>['where'];

    if (req.query.search) {
      const searchQuery = ILike(`%${req.query.search}%`);
      where = [
        { name: searchQuery, price },
        { author: searchQuery, price },
        // { desription: searchQuery, price },
      ];
    } else if (req.query.genresId) {
      const arr = req.query.genresId.map((genre) => {
        return { id: genre };
      });
      where = {
        genres: arr,
        price,
      };
    } else {
      where = { price };
    }

    const [books, totalCount] = await db.book.findAndCount({
      relations: {
        genres: true,
      },
      where,
      order,
      skip,
      take,
    });

    if (!books) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'books not found');
    }
    return res.status(StatusCodes.OK).json(books);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default getAllBooks;
