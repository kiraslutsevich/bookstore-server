import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '../../db';

const updateUser: Handler = async (req, res, next) => {
  try {
    const newData = req.body;
    const updatedData = db.user.update(req.user.id, newData);
    return res.status(StatusCodes.OK).json(updatedData);
  } catch (err) {
    next(err);
  }
};

export default updateUser;
