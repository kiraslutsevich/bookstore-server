import { requirements } from './constants';

export const signInSchema = {
  body: {
    email: requirements.email,
    password: requirements.password,
  },
};

export const signUpSchema = {
  body: {
    // firstName: requirements.name,
    // lastName: requirements.name,
    email: requirements.email,
    password: requirements.password,
    // dob: requirements.dob,
  },
};
