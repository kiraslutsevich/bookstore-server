import { Handler } from 'express';
// import createCustomError from '../../utils/error';

const getUser: Handler = async (req, res, next) => {
  try {
    // const userId = req.params.id;
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

export default getUser;
