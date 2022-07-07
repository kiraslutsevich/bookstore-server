import * as yup from 'yup';

export const updateUserSchema = yup.object().shape({
  body: yup.object({
    firstName: yup.string().min(3).max(30),
    lastName: yup.string().min(3).max(30),
    email: yup.string().email().required(),
    dob: yup.date(),
  }),
});

export const changePasswordSchema = yup.object().shape({
  body: yup.object({
    password: yup.string().required(),
    newPassword: yup.string().required(),
  }),
});
