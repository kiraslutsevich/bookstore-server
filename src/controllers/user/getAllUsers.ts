// import { RequestHandler } from 'express';
// import * as typeorm from 'typeorm';
import { StatusCodes } from 'http-status-codes';
import { Between, ILike, LessThan, MoreThan } from 'typeorm';
import db from '../../db';
// import { User as UserEntity } from '../../db/entity/User';


// type ReqParams = {
//   id: string;
// }

// type ResBody = {
//   message: string;
// }

// // eslint-disable-next-line max-len
// type ControllerType = RequestHandler<ReqParams, ResBody, Record<string, never>, Record<string, never>>

const getAllUser = async (req, res, next) => {
  try {
    // const orderBy = (req.query.column || 'id') as keyof typeorm.DeepPartial<UserEntity>;
    // const order = (req.query.order || 'ASC');
    const select = ({ [req.query.select]: true } ||
      { firstName: true, lastName: true, email: true, id: true });

    const order = {
      [req.query.column]: req.query.order,
    };
    const skip = req.query.skip || 0;
    const take = req.query.take || 5;

    let dob;
    if (req.query.minDob) {
      dob = MoreThan(req.query.minDob);
    }
    if (req.query.maxDob) {
      dob = LessThan(req.query.maxDob);
    }
    if (req.query.minDob && req.query.maxDob) {
      dob = Between(req.query.minDob, req.query.maxDob);
    }

    const users = await db.user.find({
      select,
      where: {
        [req.query.where]: ILike(`%${req.query.search}%`),
        dob,
      },
      order,
      skip,
      take,
    });

    return res.status(StatusCodes.OK).json({ users });
  } catch (err) {
    next(err);
  }
};

export default getAllUser;
