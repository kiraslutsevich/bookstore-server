import { requirements } from './constants';

export const signInSchema = {
  body: {
    email: requirements.email,
    password: requirements.password,
  },
};

export const signUpSchema = {
  body: {
    email: requirements.email,
    password: requirements.password,
  },
};
