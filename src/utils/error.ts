export interface CustomError<P = unknown> extends Error {
  customErrorData: {
    code: number;
    message: string;
    payload: P;
  },
}

const createCustomError = <Payload>(code: number, message: string, payload: Payload) => {
  const error = new Error(message) as CustomError<Payload>;

  error.customErrorData = {
    payload,
    message,
    code,
  };
  return error;
};

export default createCustomError;
