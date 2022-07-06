import * as yup from 'yup';

export const signInSchema = yup.object().shape({
  body: yup.object({
    email: yup.string().email(),
    password: yup.string().min(6).max(20),
  }),
});

export const signUpSchema = yup.object().shape({
  body: yup.object({
    fullName: yup.string().min(3).max(30),
    email: yup.string().email(),
    password: yup.string().min(6).max(20),
    dob: yup.date(),
  }),
});
