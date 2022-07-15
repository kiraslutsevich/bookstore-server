const checkIsStringDate = (dob: string) => new Date(dob).toString() !== 'Invalid Date';

export default {
  checkIsStringDate,
};
