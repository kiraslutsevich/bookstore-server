import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { EmptyObject } from '../../utils/types';
import db from '../../db';

type ReqParams = {
  id: string;
};

type ControllerType = RequestHandler<ReqParams, EmptyObject, EmptyObject, EmptyObject>

const changeAmount: ControllerType = async (req, res, next) => {
  try {
    db.cartItem.delete(req.params.id);
    return res.status(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default changeAmount;
