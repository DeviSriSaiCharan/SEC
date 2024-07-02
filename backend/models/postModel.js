import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },  
    username:{
        type:String,
        required:true,
    },
    fullName:{
        type:String,
          required:true,
    },
    likes:{
        type:Map,
        of:Boolean,
        default:{}  // map looks like { "userId":true }
    },
    comments:{
        type:Array,
        default:[]
    },
    description:{
        type:String,
        default:""
    },
    imageURL:{
        type:String,
        default:""
    },
    profilepic:{
        type:String,
        default:""
    }
},{timestamps:true})


const Post=mongoose.model("Post",postSchema);

export default Post;