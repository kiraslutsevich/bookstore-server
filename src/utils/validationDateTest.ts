const validateDateTest = (dob: string) => new Date(dob).toString() !== 'Invalid Date';

export default validateDateTest;
