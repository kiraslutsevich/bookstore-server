import * as yup from 'yup';
import validationHelpers from '../utils/validationHelpers';

const withoutSpecialChars = /^[^-() /]*$/;
const containsLetters = /^.*[a-zA-Z]+.*$/;
const minimum6Chars = /^.{6,}$/;
const withoutSpaces = /^[\S]$/;
const onlyDigits = /^[0-9]+$/;

export const requirements = {
  password: yup.string().required()
    .matches(withoutSpecialChars)
    .matches(containsLetters)
    .matches(minimum6Chars)
    .matches(withoutSpaces),
  id: yup.string()
    .required()
    .matches(onlyDigits, 'Must be only digits'),
  name: yup.string().min(2).max(30),
  email: yup.string().email().required(),
  dob: yup.string().test(validationHelpers.checkIsStringDate),
};
