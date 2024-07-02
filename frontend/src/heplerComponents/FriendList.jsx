import { useTheme } from '@emotion/react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFriends } from '../state/mainSlice';
import { Box, Card, Typography } from '@mui/material';
import FriendAdder from './FriendAdder';

const FriendList = ({userId}) => {

   const dispatch=useDispatch();
   const theme=useTheme();
 const friends=useSelector((state)=>state.user.friends)
 //console.log(friends);
 const friendsArray = Array.isArray(friends) ? friends : [];
   const getFriends=async()=>{

     const response=await fetch(`http://localhost:3001/api/user/${userId}/friends`,{
        method:"GET",
        credentials:"include"
     })

     const data=await response.json();
     dispatch(setFriends({friends:data}));

   };


   useEffect(()=>{
   getFriends();    
   },[])


  return (
    
<Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="column" marginTop="2rem">
    <Typography
    color={theme.palette.blue.main}
    variant="h5"
    fontWeight="500"
    sx={{ mb: "1.5rem" }}
  >
    Friend List
  </Typography>
  <Box display="flex" flexDirection="column" gap="1.5rem">
    {friendsArray.length>0?<>{friendsArray.map((friend) => (
      <FriendAdder
        key={friend._id}
        friendId={friend._id}
        username={friend.username}
        profilepic={friend.profilepic}
        fullName={friend.fullName}
      />
    ))}</>:<div sx={{color:theme.palette.blue.main}}>LONELY AF-- GET SOME FRIENDS</div>}
  </Box>
 
   </Box>
  
  )
}

export default FriendList
