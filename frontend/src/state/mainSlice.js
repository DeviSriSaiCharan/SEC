import {createSlice} from "@reduxjs/toolkit";


const initialState={
    mode:"dark",
    user:{},
    token:null,
    posts:[]
}

const authSlice=createSlice({
    name:"authSlice",
    initialState:initialState,
    reducers:{
      setMode:(state)=>{
        state.mode=state.mode==="light"?"dark":"light";
      },
      setLogin:(state,action)=>{
          state.user=action.payload.user;
          state.token=action.payload.token;
      },
      setLogout:(state)=>{
        state.user={};
        state.token=null;
      },
      setFriends:(state,action)=>{
        if(state.user){
            state.user.friends=action.payload.friends
        }
        else{
            console.log("error in setting friends")
        }
      },
      setPosts:(state,action)=>{
        state.posts=action.payload.posts
      },
      setPost:(state,action)=>{
        const updatedPosts=state.posts.map((post)=>{
            if(post._id===action.payload.post._id) return action.payload.post
            return post
        })
        state.posts=updatedPosts
      },
      setComment:(state,action)=>{
        state.user.comments.push(action.payload.comment);
      }
    }
})

export default authSlice.reducer;
export const {setMode,setLogin,setLogout,setFriends,setPost,setPosts,setComment}=authSlice.actions;


