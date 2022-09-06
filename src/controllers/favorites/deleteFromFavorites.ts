import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Book } from 'src/db/entity/Book';
import type { EmptyObject } from '../../utils/types';
import db from '../../db';

type ReqParams = {
  id: string;
};

type ControllerType = RequestHandler<ReqParams, Book[], EmptyObject, EmptyObject>

const deleteFromFavorites: ControllerType = async (req, res, next) => {
  try {
    const user = await db.user.findOne({
      relations: {
        favorites: true,
      },
      where: {
        id: req.user.id,
      },
    });

    user.favorites = user.favorites.filter((book) => book.id !== +req.params.id);
    await db.user.save(user);

    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    next(err);
  }
};

export default deleteFromFavorites;
