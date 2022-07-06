// import * as yup from 'yup';

const createValidateMiddleware = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err) {
      res.send('fuuu');
    }
  };
};

export default createValidateMiddleware;
