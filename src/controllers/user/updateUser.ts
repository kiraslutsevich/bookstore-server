import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../../utils/error';

const updateUser: Handler = async (req, res, next) => {
  try {
    // if (!req.params.id || req.body ==) {
    //   throw createCustomError(StatusCodes.BAD_REQUEST, 'don`t send data');
    // }
    // const userId = req.params.id;
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

export default updateUser;
