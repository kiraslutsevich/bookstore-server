import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { FindManyOptions, ILike } from 'typeorm';
import type { EmptyObject } from '../../utils/types';
import db from '../../db';
import { User } from '../../db/entity/User';

type ReqParams = {
  id: string;
}

type ReqQuery = {
  column?: string;
  order?: 'ASC' | 'DESC';
  perPage?: number;
  page?: number;
  minDob?: string;
  maxDob?: string;
  search?: string;
}

type ResBody = {
  users: User[];
  totalCount: number;
}

// eslint-disable-next-line max-len
type ControllerType = RequestHandler<ReqParams, ResBody, EmptyObject, ReqQuery>

const getAllUser: ControllerType = async (req, res, next) => {
  try {
    const order = {
      [req.query.column]: req.query.order,
    };
    const take = req.query.perPage || null;
    const page = +req.query.page || 1;
    const skip = take ? (page - 1) * take : null;

    let where: FindManyOptions<User>['where'];

    if (req.query.search) {
      const searchQuery = ILike(`%${req.query.search}%`);
      where = [
        { firstName: searchQuery },
        { lastName: searchQuery },
        { email: searchQuery },
      ];
    }

    const [users, totalCount] = await db.user.findAndCount({
      where,
      order,
      skip,
      take,
    });

    return res.status(StatusCodes.OK).json({ users, totalCount });
  } catch (err) {
    next(err);
  }
};

export default getAllUser;
