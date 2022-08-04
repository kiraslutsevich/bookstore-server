import { requirements } from './constants';

export const updateUserSchema = {
  params: {
    id: requirements.id,
  },
  body: {
    firstName: requirements.name,
    lastName: requirements.name,
    email: requirements.email,
  },
};

export const changePasswordSchema = {
  body: {
    oldPassword: requirements.password,
    password: requirements.password,
  },
};

export const paramsSchema = {
  params: {
    id: requirements.id,
  },
};
