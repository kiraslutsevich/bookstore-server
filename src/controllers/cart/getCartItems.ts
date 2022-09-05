import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CartItem } from 'src/db/entity/CartItem';
import type { EmptyObject } from '../../utils/types';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';

type ResBody = {
  cartItems: CartItem[];
};

type ControllerType = RequestHandler<
EmptyObject,
ResBody,
EmptyObject,
EmptyObject
>

const getCartItems: ControllerType = async (req, res, next) => {
  try {
    const cartItems = await db.cartItem.find({
      relations: {
        book: true,
      },
      where: {
        user: {
          id: req.user.id,
        },
      },
    });

    if (!cartItems) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'cart empty');
    }

    return res.status(StatusCodes.OK).json({ cartItems });
  } catch (err) {
    next(err);
  }
};

export default getCartItems;
