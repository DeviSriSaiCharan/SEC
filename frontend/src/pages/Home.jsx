


import { Box, Divider, Grid, useMediaQuery } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import SideBar from '../heplerComponents/SideBar';
import AddPost from '../heplerComponents/AddPost';
import FriendAdder from '../heplerComponents/FriendAdder';
import Posts from '../heplerComponents/Posts';
import FriendList from '../heplerComponents/FriendList';

const Home = () => {

  const isNotMobileScreen=useMediaQuery("(min-width:1000px)");

  const user=useSelector((state)=>state.user);
  const profilepic=useSelector((state)=>state.user.profilepic)


//  
 /**  return (
   
  )
    */

  return(
    <Box>
      <Grid container spacing={4}>
     <Grid item xs={isNotMobileScreen?3:2}>
      <SideBar/>
     </Grid>
     <Grid item xs={isNotMobileScreen?6:9}>
 <Box display="flex" alignItems="space-between" flexDirection="column" justifyContent="center">
  <AddPost profilepic={user.profilepic}></AddPost>
  <Posts userId={user._id} isProfile={false}></Posts>
 </Box>
     </Grid>
 {isNotMobileScreen?(<Grid item xs={3}>
    <FriendList userId={user._id}></FriendList>
   </Grid>):<></>}
     
       </Grid>
       </Box>
  )
}

export default Home

//<UserPost user={user} content={content} timestamp={timestamp} />
