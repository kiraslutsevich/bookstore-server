import { Handler } from "express";

const deleteUser: Handler = async (req, res, next) => {
  try {
    const userId = req.params.id;
    return res.sendStatus(204);
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
};

export default deleteUser;