import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../schema/model.js";
import { secretKey } from "../constant.js";
export const createAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email: email });
  } catch (error) {
    return console.log(error);
  }
  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exists" });
  }
  let admin;
  const hashPassword = bcrypt.hashSync(password, 10);
  try {
    admin = new Admin({ email, password: hashPassword });
    admin = await admin.save();
  } catch (error) {
    return console.log(error);
  }
  if (!admin) {
    return res.status(500).json({ message: "Unable to store admin" });
  }
  return res.status(201).json({ admin });
};

export const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email: email });
  } catch (error) {
    return console.log(error);
  }
  if (!existingAdmin) {
    return res.status(400).json({
      message: "Admin not found",
    });
  }
  const isValidPassword = bcrypt.compareSync(password, existingAdmin.password);
  if (!isValidPassword) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  const token = jwt.sign({ id: existingAdmin._id }, secretKey, {
    expiresIn: "5d",
  });
  return res
    .status(200)
    .json({ message: "Authentication Complete", token, id: existingAdmin._id });
};

export const getAdmins = async (req, res, next) => {
  try {
    let result = await Admin.find();
    res.status(200).json({
      success: true,
      message: "user read successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
