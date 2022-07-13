import * as yup from 'yup';

export const updateUserSchema = {
  body: {
    firstName: yup.string().min(3).max(30),
    lastName: yup.string().min(3).max(30),
    email: yup.string().email().required(),
    dob: yup.date(),
  },
};

export const changePasswordSchema = {
  body: {
    oldPassword: yup.string().required(),
    password: yup.string().required(),
  },
};
