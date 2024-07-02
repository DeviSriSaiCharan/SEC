import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


export const verifyToken=async(req,res,next)=>{
    try{
     
        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({
                error:"no authorization found"
            })
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(400).json({
                err:"error validating authorization"
            })
        }

        const user=await User.findOne({_id:decoded.userId}).select("-password");

        if(!user){
            return res.status(404).json({
                error:"user not found"
            })
        }
  
        req.user=user
        next();
        
    }catch(err){
        console.log(err);
        res.status(500).json({
           err:"internal server error"
        })
    }
}