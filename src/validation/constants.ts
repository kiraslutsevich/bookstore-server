import * as yup from 'yup';
import validationHelpers from '../utils/validationHelpers';

const reliable = /^[a-z0-9]{6,}$/i;
const onlyDigits = /^[0-9]+$/;

export const requirements = {
  password: yup.string()
    .required()
    .matches(reliable)
    .min(6)
    .max(12),
  id: yup.string()
    .required(),
  name: yup.string().min(2).max(30),
  email: yup.string().email().required(),
  avatar: yup.string(),
  // dob: yup.string().test(validationHelpers.checkIsStringDate),
};
