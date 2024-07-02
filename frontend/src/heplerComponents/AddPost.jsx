
import { useTheme } from '@emotion/react';
import { Avatar, Box, Button, Divider, IconButton, InputBase, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import { AttachFileOutlined, DeleteOutlined, GifBoxOutlined, ImageOutlined, MicOutlined, MoreHorizOutlined } from '@mui/icons-material';
import { setPosts } from '../state/mainSlice';


const AddPost = ({profilepic}) => {


    const dispatch=useDispatch();
    const [isImage,setisImage]=useState(true);
    const[image,setimage]=useState(null);
    const[post,setPost]=useState("");
    const theme=useTheme();
    const user=useSelector((state)=>state.user);
 const mediumMain=theme.palette.blue;
const medium=theme.palette.blue;
const isNotMobileScreens=useMediaQuery("(min-width:1000px)");


  
const handlePost=async()=>{
    const formdata=new FormData();
   
   formdata.append("userId",user._id);
   formdata.append("description",post);
   if(image){
   formdata.append("image",image);
   }
  const response=await fetch("http://localhost:3001/api/post/new",{
    method:"POST",
    credentials:"include",
    body:formdata
  })

  const data=await response.json();

  dispatch(setPosts({posts:data.posts}));
  setimage(null)
  setPost("");
};







  return (
  <>
  <Box>
  <Box display="flex" justifyContent="space-between" alignItems="center" gap="1.5rem" marginTop="2rem" >
 <Avatar alt="profile" src={profilepic}></Avatar>
 <InputBase placeholder="what's on your mind" onChange={(e)=>setPost(e.target.value)}
        value={post} sx={{width:"100%",backgroundColor:theme.palette.background.main,borderRadius:"2rem",padding:"1rem 2rem"}}/>
  </Box>

  {isImage && (
    <Box borderRadius="5px" mt="1rem">
    <Dropzone
                     acceptedFiles="image/jpeg,image/png"
                     multiple={false}
                     onDrop={(acceptedFiles) => setimage(acceptedFiles[0])}
                   >
                     {({ getRootProps, getInputProps }) => (
                       <Box display="flex" justifyContent="space-between" alignItems="center">
                       <Box
                         {...getRootProps()}
                         border={`2px dashed white`}
                         p="1rem"
                         borderRadius="15px"
                         width="100%"
                         sx={{ "&:hover": { cursor: "pointer" } }}
                       >
                         <input {...getInputProps()}/>
                         {!image ? (
                           <Typography>Add Image Here</Typography>
                         ) : (
                           <Box display="flex" justifyContent="space-between" alignItems="center">
                             <Typography color={theme.palette.white.main}>{image.name}</Typography>
                           </Box>
                         )}
                       </Box>
                       {image&& (
                         <IconButton onClick={()=>setimage(null)} sx={{width:"15%"}}>
                           <DeleteOutlined/>
                         </IconButton>
                       )}
                       </Box>
                     )}
                   </Dropzone>
                   </Box>
)}
  
                   <Divider sx={{margin:"1.25rem 0"}}/>

<Box display="flex" justifyContent="space-between" alignItems="center">
  
  <Box display="flex" justifyContent="space-between" alignItems="center" gap="0.25rem" onClick={()=>{setisImage(!isImage)}}>
    <ImageOutlined sx={{color:mediumMain}}>
    <Typography color={mediumMain}>Image</Typography>
    </ImageOutlined>
  </Box>

{isNotMobileScreens?(
  <>
  <Box display="flex" justifyContent="space-between" alignItems="center" gap="0.25rem">
    <GifBoxOutlined sx={{color:mediumMain}}/>
    <Typography color={mediumMain}>Clip</Typography>
  </Box>

  <Box display="flex" justifyContent="space-between" alignItems="center" gap="0.25rem">
    <AttachFileOutlined sx={{color:mediumMain}}/>
    <Typography color={mediumMain}>Attachment</Typography>
  </Box>

  <Box display="flex" justifyContent="space-between" alignItems="center" gap="0.25rem">
    <MicOutlined sx={{color:mediumMain}}/>
    <Typography color={mediumMain}>Audio</Typography>
  </Box>

  </>
):<>
 <Box display="flex" justifyContent="space-between" alignItems="center" gap="0.25rem">
  <MoreHorizOutlined sx={{color:mediumMain}}/>
 </Box>
</>}
 
<Button onClick={handlePost} sx={{color:'black', backgroundColor:theme.palette.blue.main,borderRadius:"3rem"}}>
  POST
</Button>


</Box>
</Box>
  </>
  )
}

export default AddPost
