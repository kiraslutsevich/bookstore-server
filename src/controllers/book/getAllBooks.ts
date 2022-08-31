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
  perPage: number;
  page: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  genresOn?: string;
}

type ResBody = Book[];

type ControllerType = RequestHandler<
ReqParams,
ResBody,
EmptyObject,
ReqQuery
>

const getAllBooks: ControllerType = async (req, res, next) => {
  try {
    const order = {
      [req.query.column]: req.query.order,
    };
    const take = req.query.perPage;
    const page = +req.query.page;
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
    } else if (req.query.genresOn) {
      const genresArr = req.query.genresOn.split(',');
      const arr = genresArr.map((genre) => {
        return { id: Number(genre) };
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
        rating: true,
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
    next(err);
  }
};

export default getAllBooks;
