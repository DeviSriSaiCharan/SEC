
import React, { useState } from 'react'
import {Box, Button, Card, Divider, IconButton, Input, Typography} from "@mui/material"
import FriendAdder from './FriendAdder'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from '@mui/icons-material';
import { setComment, setPost } from '../state/mainSlice';
import {useDebounce} from '../hooks/useDebounce';


const Post = ({postId,postUserId,username,fullName,description,imageURL,profilepic,likes,comments}) => {


  const [isComment,setisComment]=useState(false);

  const dispatch=useDispatch();

const loggedUser=useSelector((state)=>state.user);
  const loggedinUser=loggedUser._id;

  const isLiked=Boolean(likes[loggedinUser]);
  const theme=useTheme();
  const no_of_likes=Object.keys(likes).length;



//  const sendcomment=()=>{
//   console.log(comment);
//    dispatch(setComment({comment:comment}))
//  }




const patchLike=async()=>{

  const response=await fetch(`http://localhost:3001/api/post/${postId}/like`,{
    method:"PATCH",
    credentials:"include",
  })

  const data=await response.json();
 console.log(data.post);
dispatch(setPost({post:data.post}));

}



  return (
   <Box margin="2rem 0">
 <Card sx={{padding:"2rem",border:"1px solid white",borderRadius:"1rem"}}>
<FriendAdder friendId={postUserId} username={username} fullName={fullName} profilepic={profilepic}></FriendAdder>



<Typography color={theme.palette.blue.main} sx={{mt:"1rem"}}>
  {description}
</Typography>


 {imageURL&&(
  <img src={imageURL} alt="Post" width="100%" height="auto" style={{borderRadius:"0.75rem",marginTop:"0.75rem"}}/>
 )}

<Box display="flex" justifyContent="space-between" alignItems="center" mt="0.25rem">
        <Box display="flex" justifyContent="space-between" alignItems="center" gap="1rem">
          <Box display="flex" justifyContent="space-between" alignItems="center" gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: theme.palette.blue.main }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{no_of_likes}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center" gap="0.3rem">
            <IconButton onClick={() =>{ 
              setisComment(!isComment)
              }}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </Box>
        </Box>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </Box>
     
   


{isComment&&(
   <Box mt="0.5rem">
   {comments.map((comment, i) => (
     <Box key={`${username}-${i}`}>
       <Divider />
       <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
         {comment}
       </Typography>
     </Box>
   ))}
   <Divider />
 </Box>
  )
}


</Card>
</Box>
)}



export default Post

//<Box display="flex" justifyContent="space-between" alignItems="center">
//<Input type="text" placeholder='enter anon comment' value={comment} onChange={(e)=>{setcomment(e.target.value)}} width="full">
 // </Input>
 // <Button onClick={sendcomment}>Submit</Button>
//</Box>


// const [comment,setcomment]=useState("hello");
// const debounce=useDebounce(comment,500)