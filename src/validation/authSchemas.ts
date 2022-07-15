import * as yup from 'yup';
import validationHelpers from '../utils/validationHelpers';

export const signInSchema = {
  body: {
    email: yup.string().email(),
    password: yup.string().min(6).max(20),
  },
};

export const signUpSchema = {
  body: {
    firstName: yup.string().min(3).max(30),
    lastName: yup.string().min(3).max(30),
    email: yup.string().email(),
    password: yup.string().min(6).max(20),
    dob: yup.string().test(validationHelpers.checkIsStringDate),
  },
};
