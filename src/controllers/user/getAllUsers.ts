import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Between, ILike } from 'typeorm';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';
import { User } from '../../db/entity/User';

type ReqParams = {
  id: string;
}

type ReqQuery = {
  column: string;
  order?: { [key: string]: string };
  take?: number;
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
type ControllerType = RequestHandler<ReqParams, ResBody, Record<string, never>, ReqQuery>

const getAllUser: ControllerType = async (req, res, next) => {
  try {
    const select = ({ firstName: true, lastName: true, email: true, id: true, dob: true });
    const order = {
      [req.query.column]: req.query.order,
    };
    const take = req.query.take || 20;
    const offset = (Number(req.query.page) - 1) * take || 0;
    const skip = offset || 0;
    // eslint-disable-next-line max-len
    const dob = Between(req.query.minDob || new Date(0), req.query.maxDob || new Date());

    let where;
    if (req.query.search) {
      where = [
        { firstName: ILike(`%${req.query.search}%`), dob },
        { lastName: ILike(`%${req.query.search}%`), dob },
        { email: ILike(`%${req.query.search}%`), dob },
      ];
    } else {
      where = {
        dob,
      };
    }

    const [users, totalCount] = await db.user.findAndCount({
      select,
      where,
      order,
      skip,
      take,
    });

    if (!totalCount) {
      createCustomError(StatusCodes.NOT_FOUND, 'users not found');
    }
    return res.status(StatusCodes.OK).json({ users, totalCount });
  } catch (err) {
    next(err);
  }
};

export default getAllUser;
