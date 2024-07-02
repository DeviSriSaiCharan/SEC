import jwt from "jsonwebtoken";

const generateToken=(userId,res)=>{

      
      const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"15d"
      });

   
      res.token=token;
      
      res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000, //in count of millie seconds 
        httpOnly:true,// prevents XSS attacks cross-site scripting attacks 
        sameSite:"strict",//prevents CSRF attacks cross-site request forgery attacks
      });
  
}

export default generateToken;