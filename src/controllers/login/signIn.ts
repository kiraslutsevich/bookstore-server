import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
// import tokenUtils from '../../utils/tokenUtils';

// const userA = {
//   name: 'ass',
//   id: '123',
//   email: 'fs@mail.ru',
//   password: 'fff',
// };

const signIn: Handler = async (req, res, next) => {
  try {
    // if(req.email === email){
    //   if(хеш пароль, пароль === пароль?){
    //     createToken
    //   } else throw
    // } else throw
    // const token = tokenUtils.createToken(userA.id);
    return res.status(StatusCodes.OK);
    // .json({ user: userA, token });
  } catch (err) {
    next(err);
  }
};

export default signIn;
