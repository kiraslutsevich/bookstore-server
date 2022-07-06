import * as yup from 'yup';

export const deleteUserSchema = yup.object().shape({
  params: yup.object({
    id: yup.number().required(),
  })
});

export const getUserSchema = deleteUserSchema;

export const updateUserSchema = yup.object().shape({
  params: yup.object({
    id: yup.number().required(),
  }),
  body: yup.object({
    fullName: yup.string().min(3).max(30),
    email: yup.string().email(),
    password: yup.string().min(6).max(20),
    dob: yup.date(),
  })
})
