import { Schema } from "mongoose";

const basicSchema=Schema({
  name:{
    type:String,
  },
  age:{
    type:Number
  }
})
export default basicSchema