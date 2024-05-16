
import express, { json } from "express";
import connectToMongoDB from "./src/connectDB/connectToMongoDB.js";
import { port } from "./src/constant.js";
import basicRouter from "./src/route/basicRoute.js";

let expressApp = express();
expressApp.use(json());
connectToMongoDB();
expressApp.use("basics",basicRouter)
expressApp.listen(port, () => {
  console.log(`app is listening at port ${port}.`);
});

