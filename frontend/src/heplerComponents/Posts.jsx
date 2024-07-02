

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../state/mainSlice';
import Post from './Post.jsx';

const Posts = ({userId,isProfile=false}) => {
     const dispatch=useDispatch();
     const posts=useSelector((state)=>state.posts);

     const getPosts=async()=>{
        const response=await fetch("http://localhost:3001/api/post/feed",{
            method:"GET",
            credentials:"include"
        })


        const data=await response.json();
        dispatch(setPosts({posts:data.posts}));
     }



     const userPosts=async()=>{
        const response=await fetch(`http://localhost:3001/api/${userId}/posts`,{
            method:"GET",
            credentials:"include"
        })


        const data=await response.json();

        dispatch(setPosts({posts:data.posts}));

     }

  useEffect(()=>{
    if(isProfile){
        userPosts();
    }
    else{
        getPosts();
    }
  },[])   // eslint-disable-line react-hooks/exhaustive-deps

  


  return (
    <>
     {posts && posts.length > 0 ? (
        posts.map(({ _id, userId, username, fullName, description, imageURL, profilepic, likes, comments }) => {return (
          <Post 
            key={_id} 
            postId={_id} 
            postUserId={userId} 
            username={username} 
            fullName={fullName} 
            description={description}
            imageURL={imageURL} 
            profilepic={profilepic} 
            likes={likes} 
            comments={comments}
          />
        )})
      ) : (
        <p>No posts available.</p>
      )}
    </>
  )
}

export default Posts
