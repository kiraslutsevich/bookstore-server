import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../../utils/createCustomError';
import { CartItem } from '../../db/entity/CartItem';
import type { EmptyObject } from '../../utils/types';
import db from '../../db';

type ReqBody = {
  id: number;
  newCount: number;
}

type ResBody = {
  newCartItem: CartItem;
}

type ControllerType = RequestHandler<EmptyObject, ResBody, ReqBody, EmptyObject>

const changeAmount: ControllerType = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bookId = req.body.id;

    const cartItem = await db.cartItem.findOne({
      relations: {
        book: true,
      },
      where: {
        book: {
          id: bookId,
        },
        user: {
          id: userId,
        },
      },
    });
    if (!cartItem) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'book not found');
    }
    const count = req.body.newCount;
    await db.cartItem.update(cartItem.id, { count });
    const newCartItem = await db.cartItem.findOne(
      {
        relations: {
          book: true,
        },
        where: {
          id: cartItem.id,
        },
      },
    );
    return res.status(StatusCodes.OK).json({ newCartItem });
  } catch (err) {
    next(err);
  }
};

export default changeAmount;
