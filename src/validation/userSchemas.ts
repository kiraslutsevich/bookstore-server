import * as yup from 'yup';

export const deleteUserSchema = yup.object().shape({
  params: yup.object({
    id: yup.number().required(),
  }),
});

export const getUserSchema = deleteUserSchema;

export const updateUserSchema = yup.object().shape({
  params: yup.object({
    id: yup.number().required(),
  }),
  body: yup.object({
    firstName: yup.string().min(3).max(30),
    lastName: yup.string().min(3).max(30),
    email: yup.string().email().required(),
    dob: yup.date(),
  }),
});
