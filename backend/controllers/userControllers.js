//   /:id
// /:id/friends

import User from "../models/userModel.js";

// /:id/:friendId



export const getUser=async(req,res)=>{
    try{

   const{id}=req.params;
    
   if(id==req.user._id){
  return  res.status(200).json({
    data:req.user
   })
   }
   else{
    return res.status(404).json({
        err:"unknown error found"
    })
   }
    }catch(err){
        console.log(err);
        res.status(404).json({
            err:"internal server error"
        })
    }
}



export const getUserFriends=async(req,res)=>{
  
  try{
    const{id}=req.params;

   const user=await User.findById(id).select("-password");

   const friends=await Promise.all(
    user.friends.map((id)=>User.findById(id))
   );

   const formattedFriends=friends.map(({_id,fullName,username,profilepic})=>{
    return {_id,fullName,username,profilepic};
   })

   res.status(200).json(formattedFriends)
}catch(err){
    console.log(err);
    return res.status(404).json({
        err:"internal server error"
    })
}

}


export const addRemovefriend=async(req,res)=>{
    try{
      
        const{id,friendId}=req.params;

        const user=await User.findById(id).select("-password");
        const friend=await User.findById(friendId).select("-password");
        if(user.friends.includes(friendId)){
            user.friends=user.friends.filter((id)=>id !== friendId);
            friend.friends=friend.friends.filter((id)=>id !== id);
        }else{
            user.friends.push(friendId);
            friend.friends.push(id);
            console.log(friend);
        }
    await user.save();
    await friend.save();

    const friends=await Promise.all(
        user.friends.map((id)=>User.findById(id))
       );
    
       const formattedFriends=friends.map(({_id,fullName,username,profilepic})=>{
        return {_id,fullName,username,profilepic};
       })
    
       res.status(200).json(formattedFriends)


    }catch(err){
        console.log(err);
        res.status.json({
            err:"internal server error"
        })
    }
}