import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:40
    },
    fullName:{
        type:String,
        required:true,
        min:3,
        max:50
    },
    username:{
        type:String,
        required:true,
        min:5,
        max:15
    }, 
    password:{
        type:String,
        required:true,
        min:8,    
    },
    profilepic:{
        type:String,
        default:""
    },
    friends:{
        type:Array,
        default:[]
    },
    location:{
        type:String,
        default:""
    },
    viewedProfile:{
        Number,
    },

    impressions:Number
},{timestamps:true});

const User=mongoose.model("User",UserSchema);

export default User;