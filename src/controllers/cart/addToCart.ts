import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CartItem } from '../../db/entity/CartItem';
import type { EmptyObject } from '../../utils/types';
import db from '../../db';

type ReqBody = {
  id: number;
}

type ResBody = {
  newCartItem: CartItem;
}

type ControllerType = RequestHandler<EmptyObject, ResBody, ReqBody, EmptyObject>

const addToCart: ControllerType = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bookId = req.body.id;

    const cartItem = new CartItem();
    cartItem.book = await db.book.findOneBy({ id: bookId });
    cartItem.user = await db.user.findOneBy({ id: userId });
    cartItem.count = 1;
    const response = db.cartItem.create(cartItem);
    const newCartItem = await db.cartItem.save(response);
    return res.status(StatusCodes.OK).json({ newCartItem });
  } catch (err) {
    next(err);
  }
};

export default addToCart;
