import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../../utils/error';

const deleteUser: Handler = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'not found this id');
    }
    // const userId = req.params.id;
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
export default deleteUser;
