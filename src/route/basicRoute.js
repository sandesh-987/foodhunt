
import { Router } from "express";
import { basicController } from "../controller/basicController.js";

let basicRouter=Router();
basicRouter
.route("/")
.post(basicController)
export default basicRouter