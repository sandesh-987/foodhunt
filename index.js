
import express, { json } from "express";
import connectToMongoDB from "./src/connectDB/connectToMongoDB.js";
import { port } from "./src/constant.js";
import registerRouter from "./src/route/register.js";

let expressApp = express();
expressApp.use(json());
connectToMongoDB();


expressApp.use("/registers",registerRouter)

expressApp.listen(port, () => {
  console.log(`app is listening at port ${port}.`);
}); 

