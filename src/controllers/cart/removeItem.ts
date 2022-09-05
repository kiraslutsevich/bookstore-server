import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CartItem } from '../../db/entity/CartItem';
import type { EmptyObject } from '../../utils/types';
import db from '../../db';

type ReqParams = {
  id: string;
};

type ResBody = {
  cartItems: CartItem[];
};

type ControllerType = RequestHandler<ReqParams, ResBody, EmptyObject, EmptyObject>

const changeAmount: ControllerType = async (req, res, next) => {
  try {
    await db.cartItem.delete(+req.params.id);
    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    next(err);
  }
};

export default changeAmount;
