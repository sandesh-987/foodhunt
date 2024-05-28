

import { Schema } from "mongoose";

let registerSchema = Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
  
     password : {
        type: String,
      },
      location:{
        type:String,
      },
      isVerifyEmail: {
        type: String,
      },
  },
  { timeStamp: true }
);
export default registerSchema