import { Handler } from "express";

const signUp: Handler = async (req, res, next) => {
  try {
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
}

export default signUp;