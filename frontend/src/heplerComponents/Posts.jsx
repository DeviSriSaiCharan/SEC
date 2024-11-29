

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../state/mainSlice';
import Post from './Post.jsx';
import axios from 'axios';

const Posts = ({userId,isProfile=false}) => {
     const dispatch=useDispatch();
     const posts=useSelector((state)=>state.posts);
      const [users, setUsers] = useState([]);

     const getPosts=async()=>{
        
        const ps = await axios.get("http://localhost:3000/posts");
        
        dispatch(setPosts({posts:ps.data}));

        // getUsers(); 
        
     }

     useEffect(()=>{
       axios.get('http://localhost:3000/users')
       .then((res)=>{
        setUsers(res.data);
        console.log(users)
        console.log(res.data, "yes");
       })
     },[])
    //  const getUsers = async () => {
    //   const us = await axios.get("http://localhost:3000/users");
    //   setUsers(us.data)
    //   console.log(us.data)
    //   // if (us.data.length > 0) {
    //   //   setUsers(us.data[0]); 
    //   // }
    // };


    //  const userPosts=async()=>{
    //     const response=await fetch(`http://localhost:3001/api/${userId}/posts`,{
    //         method:"GET",
    //         credentials:"include"
    //     })


    //     const data=await response.json();

    //     dispatch(setPosts({posts:data.posts}));

    //  }

  useEffect(()=>{
    if(isProfile){
        // userPosts();
    }
    else{
      getPosts();
      // getUsers();
    }
    
  },[])   // eslint-disable-line react-hooks/exhaustive-deps

  


  return (
    <>
    {users.map((i)=>(
      <div>{i.username}</div>
    ))}
     {posts && users  ? (
        posts.map(({id, userId, username, fullName, description, imageURL, profilepic, likes, comments }) => {return (
          <Post 
            key={id} 
            postId={id} 
            postUserId={userId} 
            username={users[userId].username || "username...."} 
            fullName={"Hello"} 
            description={description}
            imageURL={imageURL} 
            profilepic={profilepic} 
            likes={likes} 
            comments={0}
          /> 
        )})
      ) : (
        <p>No posts available.</p>
      )}
    </>
  )
}

export default Posts
