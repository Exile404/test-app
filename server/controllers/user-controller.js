import User from "../models/user-model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};
