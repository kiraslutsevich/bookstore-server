import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createToken } from '../../utils/tokenUtils';
import { hash } from '../../utils/hashedPassword';
import { userRepository } from '../../db';
import createCustomError from '../../utils/error';
import { User } from '../../db/entity/User';

const signUp: Handler = async (req, res, next) => {
  try {
    const existingUser = await userRepository.findOneBy({ email: req.body.email });
    if (existingUser) {
      return 400;
    }
    userRepository.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      dob: req.body.dob,
      email: req.body.email,
    });

    // const token = createToken(user.id);
    // hash(req.body.password);
    // return res.status(StatusCodes.OK).json({ user });
  } catch (err) {
    next(err);
  }
};

export default signUp;
