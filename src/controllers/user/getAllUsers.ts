import { Handler } from 'express';
// import createCustomError from '../../utils/error';

const getAllUser: Handler = async (req, res, next) => {
  try {
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

export default getAllUser;
