import { Router } from "express";
import {
    createRegisterController,
    loginController,
    verifyEmail
} from "../controller/registerController.js";

let registerRouter = Router();
registerRouter
  .route("/")
  .post(createRegisterController)
//   .get( readAllController);
registerRouter.route("/verify-emails").patch(verifyEmail);
registerRouter.route("/login").post(loginController);

export default registerRouter;