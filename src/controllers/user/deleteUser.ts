import { Handler } from "express";

const deleteUser: Handler = async (req, res, next) => {
  try {

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
}