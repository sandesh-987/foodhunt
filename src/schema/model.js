
import { model } from "mongoose";
import registerSchema from "./registerSchema.js";
import adminschema from "./adminSchema.js"






export let Register=model("Register",registerSchema)
export let admin=model("admin",adminschema)