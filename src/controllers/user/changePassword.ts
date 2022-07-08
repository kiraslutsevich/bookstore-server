import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
// import getHashedPassword from 'src/utils/hashedPassword';

const changePassword: Handler = async (req, res, next) => {
  try {
    // getHashedPassword();
    return res.status(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};
export default changePassword;
