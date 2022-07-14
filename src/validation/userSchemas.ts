import * as yup from 'yup';

export const updateUserSchema = {
  params: {
    id: yup.string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits'),
  },
  body: {
    firstName: yup.string().min(3).max(30),
    lastName: yup.string().min(3).max(30),
    email: yup.string().email().required(),
    dob: yup.string(),
  },
};

export const changePasswordSchema = {
  body: {
    oldPassword: yup.string().required(),
    password: yup.string().required(),
  },
};

export const paramsSchema = {
  params: {
    id: yup.string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits'),
  },
};
