import React, { useMemo, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Avatar, Box,IconButton,useTheme,Typography, Icon} from "@mui/material"
import { useNavigate } from "react-router-dom";
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { setFriends } from '../state/mainSlice';

const FriendAdder = ({friendId,username,fullName,profilepic}) => {

  const {_id}=useSelector((state)=>state.user);
  const friends=useSelector((state)=>state.user.friends);
 const theme=useTheme();
 
const dispatch=useDispatch();
// const navigate=useNavigate();




//
const [isFriend,setisFriend] =useState((Boolean)(friends?.find((friend) => friend._id === friendId)))


const patchFriend=async()=>{
   
  const response=await fetch(`http://localhost:3001/api/user/${_id}/${friendId}`,{
    method:"PATCH",
    credentials:"include"
  });

  const data=await response.json();

dispatch(setFriends({friends:data}))
}

/// give navigate to IconButton onClick={()=>{navigate("")}}




  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" justifyContent="space-between" alignItems="center" gap="1rem">
        <IconButton >
        <Avatar src={profilepic} alt="pp" sx={{width:"40px", height:"40px"}}></Avatar>
        </IconButton>



 <Box display="flex" justifyContent="center" flexDirection="column">
        <Typography
            color={theme.palette.blue.main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: theme.palette.blue.main,
                cursor: "pointer",
              },
            }}
          >
            {username}
          </Typography>
          <Typography color={theme.palette.blue.main} fontSize="0.75rem">
            {fullName}
          </Typography>
      </Box>

      </Box>

      <Box  display="flex" justifyContent="space-between" alignItems="center">
        <IconButton
         onClick={()=>{
          setisFriend(!isFriend)
          patchFriend()}}
        >
         {friendId===_id?<></>:
         <>
         {isFriend ?<>
          <PersonRemoveOutlined sx={{color:theme.palette.blue.main}}></PersonRemoveOutlined>
          </>:<>
          <PersonAddOutlined sx={{color:theme.palette.blue.main}}></PersonAddOutlined>
          </>}
         </>}
         
        
        </IconButton>
      </Box>
    </Box>
  )
}

export default FriendAdder

/**
 * Next day notes
 * //isFreind should have above condition thinking of useState to change icon of add friend when we add or remove them
// mostly 
 * mostly done with this move to post and posts components be sure to set this components size acc to page
 * check if it satisfys our mobile screen sizes two
 * 
 * 
 */