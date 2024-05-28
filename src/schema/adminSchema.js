import mongoose, { Schema } from "mongoose";

const adminSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
   
    addedFoodItems: [
      {
        type: mongoose.Types.ObjectId,
        ref:"food"
      },
    ],
  },
  { timeStamp: true }
);
export default adminSchema;