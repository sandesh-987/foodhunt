import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { clientUrl, secretKey } from "../constant.js";
import { Register } from "../schema/model.js";
import { sendEmail } from "../utils/sendMail.js";
export const createRegisterController = async (req, res, next) => {
  try {
    let data = req.body;
    let hashPassword = await bcrypt.hash(data.password, 10);
    data = {
      ...data,
      password: hashPassword,
      isVerifyEmail: false,
    };
    let result = await Register.create(data);
    //token generate
    let infoObj = {
      id: result._id,
    };
    let expiryInfo = {
      expiresIn: "5d",
    };
    let token = await jwt.sign(infoObj, secretKey, expiryInfo);

    await sendEmail({
      from: "'nepalnepal'<sandeshphuyal10@gmail.com>",
      to: [data.email],
      subject: "Account Create.",
      html: `<h1>Your account has been created successfully.</h1>
<a href="${clientUrl}/verify-email?token=${token}">
"${clientUrl}/verify-email?token=${token}"
</a>
`,
    });
    res.status(201).json({
      success: true,
      message: "user create successfully.",
      token: token,
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const verifyEmail = async (req, res, next) => {
  try {
    let tokenString = req.headers.authorization;
    let token = tokenString.split(" ")[1];
    //verify token
    let infoObj = await jwt.verify(token, secretKey);
    let userId = infoObj.id;
    let result = await Register.findByIdAndUpdate(
      userId,
      { isVerifyEmail: true },
      { new: true }
    );
    res.status(200).json({
      success: true,
      massage: "User verify  successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const loginController = async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let user = await Register.findOne({ email: email });
    if (user) {
      if (user.isVerifyEmail) {
        let isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          let infoObj = {
            id: user._id,
          };
          let expiryInfo = {
            expiresIn: "5d",
          };
          let token = await jwt.sign(infoObj, secretKey, expiryInfo);
          res.status(201).json({
            success: true,
            message: "user login successfully.",
            result: user,
            token: token,
          });
        } else {
          let error = new Error("credential does not match");
          throw error;
        }
      } else {
        let error = new Error("credential does not match");
        throw error;
      }
    } else {
      let error = new Error("credential does not found.");
      throw error;
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
