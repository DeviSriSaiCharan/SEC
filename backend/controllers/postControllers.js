import cloudinary from "../imagesHandlers/cloudinaryHandle.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";


export const newPost=async(req,res)=>{
    try{
 
    const{userId,description}=req.body;

    
    if (!req.file || !req.file.path) {
        // Handle case where no file was uploaded
        return res.status(400).json({ error: 'No file uploaded' });
    }


    const result= await cloudinary.uploader.upload(req.file.path,{resource_type:"image",
        transformation:[
            {width: 1000, crop: "scale"},
            {quality: "auto"},
            {fetch_format: "auto"}
            ]
    })
  const imageURL=result.secure_url;

const user=await User.findById(userId);

  const newPost=new Post({
    userId,
    username:user.username,
    fullName:user.fullName,
    imageURL,
    profilepic:user.profilepic,
    description:description
  })

  await newPost.save();
   
  const posts=await Post.find();
  res.status(200).json({
    posts:posts
    });

    }catch(err){
        console.log(err);
        res.status(500).json({
            err:"internal server error"
        })
    }
}


export const userPosts=async(req,res)=>{
    try{
    
        const userId=req.params.id;

        const posts=await Post.find({
            userId
        });

        res.status(200).json({
            posts:posts
        })
    
    }catch(err){
        console.log(err);
        res.status(500).json({
            err:"internal server error"
        })
    }
}


export const getFeed=async(req,res)=>{
    try{
  const allPosts=await Post.find();
  res.status(200).json({
    posts:allPosts
  })



    }catch(err){
        console.log(err);
        res.status(500).json({
            err:"internal server error"
        })
    }
}


export const postLike=async(req,res)=>{
    try{
   
    const id=req.params.id;
    const userId=req.user._id;
    const post=await Post.findById(id);
    const isLiked=post.likes.get(userId);
   
    if(isLiked){
        post.likes.delete(userId);
    }
    else{
        post.likes.set(userId,true);
    }

  const updatedpost=await Post.findByIdAndUpdate(
    id,
    {
        likes:post.likes
    },
    {new:true}//returns the updated object
  );


    res.status(200).json({
        post:updatedpost
    });

    }catch(err){
        console.log(err);
        res.status(500).json({
            err:"internal server"
        })
    }
}