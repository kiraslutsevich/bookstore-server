import { Handler } from "express";
import tokenUtils from "../../utils/tokenUtils";

const userA = {
  name: "ass",
  id: "123",
  email: "fs@mail.ru",
  password: "fff"
}

const signUp: Handler = async (req, res, next) => {
  try {
    const token = tokenUtils.createToken(userA.id);
    return res.status(200).json({ user: userA, token: token });
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
}

export default signUp;

