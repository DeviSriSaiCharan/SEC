import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { useZODuser } from "../zodCheckerHooks/useZODuser.js";
import generateToken from "../cookiesANDtokens/generateToken.js";
import cloudinary from "../imagesHandlers/cloudinaryHandle.js";
import path from "path";

export const signup=async(req,res)=>{
  try{
    
    const response=useZODuser(req.body);
    if(!response){
      return res.status(400).json({
        err:"please check entered inputs"
      })
    }

     const{fullName,email,username,password}=req.body;
    
     const user=await User.findOne({
      username
     })
     if(user){
      return res.status(400).json({error:"Username already exists"});
    }

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);


    if (!req.file || !req.file.path) {
      // Handle case where no file was uploaded
      return res.status(400).json({ error: 'No file uploaded' });
  }

  const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "image",
    transformation:{quality:70} });

  // Access the URL of the uploaded image from the Cloudinary response
  const imageUrl = result.secure_url;



    const newUser=new User({
      fullName,
      username,
      email,
      password:hashedPassword,
      profilepic:imageUrl
    })

    if(newUser){
      generateToken(newUser._id,res);
    }
    const token=res.token.split(".")[0];

    await newUser.save();


    res.status(200).json({
      _id:newUser._id,
      username:newUser.username,
      profilepic:newUser.profilepic,
      token:token
    })

   }catch(err){
    console.log("error",err);
    res.status(500).json({
        error:"internal server error"
    })
  }
}





//login controller


export const login=async (req,res)=>{

  try{
  const {username,password}=req.body;
   const user=await User.findOne({username});
   const isPassword=await bcrypt.compare(password,user?.password || "");

  if(!user||!isPassword){
        return res.status(400).json({
          error:"invalid username/password"
        })
  }

  generateToken(user._id,res);
  const token=res.token.split(".")[0];
  res.status(200).json({
    _id:user._id,
    username:user.username,
    profilepic:user.profilepic,
    token:token
  })


    }catch(err){
               console.log(err);
               console.log("error in signin controller");
             res.status(500).json({
              err:"internal server error"
             })
                   }

}


export const logout=(req,res)=>{
  try{
    
    res.cookie("jwt","",{
      maxAge:0
    })

    res.status(200).json({
      msg:"logout succesfull"
    });

  }catch(err){
    console.log(err);
    console.log("error in logout");
    res.status(500).json({
      error:"internal server error"
    })
  }
}