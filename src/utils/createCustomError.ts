export interface CustomError<P = unknown> extends Error {
  customErrorData: {
    code: number;
    message: string;
    payload: P | null;
  },
}

// eslint-disable-next-line max-len
const createCustomError = <Payload>(code: number, message: string, payload: Payload | null = null) => {
  const error = new Error(message) as CustomError<Payload>;

  error.customErrorData = {
    payload,
    message,
    code,
  };

  return error;
};

export default createCustomError;
