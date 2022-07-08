import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createToken } from '../../utils/tokenUtils';
// import hash, verify from '../../utils/hashedPassword';

const signIn: Handler = async (req, res, next) => {
  try {
    // if(req.email === email){
    // getHashedPassword();
    //   if(хеш пароль, пароль === пароль?){
    //     createToken
    //   } else throw
    // } else throw
    // const token = createToken(userA.id);
    // return res.status(StatusCodes.OK).json(token);
    // .json({ user: userA, token });
  } catch (err) {
    next(err);
  }
};

export default signIn;
