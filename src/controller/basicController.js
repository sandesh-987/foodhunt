
import { Basic } from "../schema/model.js"

export const basicController=async(req,res,next)=>{
 try {
    let data=req.body
    let result=await Basic.create(data)
    res.json({
        success:true,
        message:"create successfully.",
        result:result
    })
 } catch (error) {
    res.json({
        success:false,
        message:error.message
    })
 }
}