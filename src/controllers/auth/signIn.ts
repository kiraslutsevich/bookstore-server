import { Handler } from "express";
import { request } from "http";

const userA = {
  name: "ass",
  id: "123",
  email: "fs@mail.ru",
  password: "fff"
}

const signIn: Handler = async (req, res, next) => {
  try {
    // (req.body.email === userA.email)
    // (req.body.password === userA.password)
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
};

export default signIn;