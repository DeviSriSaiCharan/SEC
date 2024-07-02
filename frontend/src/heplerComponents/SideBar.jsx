import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { setLogout, setMode } from '../state/mainSlice';
import { 
  Avatar, 
  Box, 
  IconButton, 
  List, 
  ListItem, 
  useMediaQuery, 
  Drawer, 
  Typography 
} from '@mui/material';
import { 
  Search, 
  Message, 
  DarkMode, 
  LightMode, 
  Notifications, 
  Help, 
  Menu, 
  Close, 
  MenuBook, 
  LogoutOutlined
} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Navigate, useNavigate } from 'react-router-dom';

const SideBar = () => {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const isNotMobileScreens = useMediaQuery("(min-width:1000px)");
  const dispatch = useDispatch();
  const theme = useTheme();
 const user=useSelector((state)=>state.user);
 const navigate=useNavigate();

  const handleModeSwitch = () => {
    dispatch(setMode());
  };


  const logoutfunct = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/logout", {
        method: "GET",
        credentials: "include"
      });
  
      // Check if the response is JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if(data){
          dispatch(setLogout());
          navigate("/");
        }
      }
    
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
    }
  };
  






  return (
    <Box sx={{ marginTop:"2rem",paddingLeft:2 }}>
      {isNotMobileScreens ? (
        <List display="flex" flexdirection="column" alignitems="center">
          <ListItem>
            <IconButton onClick={handleModeSwitch}>   
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ color: theme.palette.blue.main, fontSize: "33px" }} />
              ) : (
                <LightMode sx={{ color: theme.palette.blue.main, fontSize: "33px" }} />
              )}
            </IconButton>
          </ListItem>
          <ListItem>
            <IconButton>
              <Search sx={{ color: theme.palette.blue.main, fontSize: "33px" }} />
            </IconButton>
          </ListItem>
          <ListItem>
            <IconButton>
              <Message sx={{ color: theme.palette.blue.main, fontSize: "33px" }} />
            </IconButton>
          </ListItem>
          <ListItem>
            <IconButton>
              <Notifications sx={{ color: theme.palette.blue.main, fontSize: "33px" }} />
            </IconButton>
          </ListItem>
          <ListItem>
            <IconButton>
              <Help sx={{ color: theme.palette.blue.main, fontSize: "33px" }} />
            </IconButton>
          </ListItem>
          <ListItem>
            <IconButton onClick={logoutfunct}>
             <LogoutOutlined sx={{ color: theme.palette.blue.main, fontSize: "33px" }} />
            </IconButton>
          </ListItem>
          <ListItem>
            <IconButton >
              <Avatar alt="Profile Picture" src={user.profilepic} sx={{ width: 40, height: 40 }} />
            </IconButton>
          </ListItem>
        </List>
      ) : (
        <>
          <IconButton onClick={() => setisMenuOpen(!isMenuOpen)}>
            <MenuIcon sx={{ color: theme.palette.blue.main, fontSize: "33px" }} />
          </IconButton>
          <Drawer
            anchor="left"
            open={isMenuOpen}
            onClose={() => setisMenuOpen(!isMenuOpen)}
            sx={{
              '& .MuiDrawer-paper': {
                backgroundColor: theme.palette.background.white,
              },
            }}
          >
            <Box sx={{ width: 180 }}>
              <List>
                <ListItem>
                  <IconButton onClick={()=>{setisMenuOpen(!isMenuOpen)}}>
                    <Close sx={{ color: theme.palette.blue.main, fontSize: "33px" }}/>
                  </IconButton>
                </ListItem>
                <ListItem>
                  <IconButton onClick={handleModeSwitch}>   
                    {theme.palette.mode === "dark" ? (
                      <DarkMode sx={{ color: theme.palette.blue.main, fontSize: "33px" }} />
                    ) : (
                      <LightMode sx={{ color: theme.palette.blue.main, fontSize: "33px" }} />
                    )}
                  </IconButton>
                </ListItem>
                <ListItem>
                  <IconButton>
                    <Search sx={{ color: theme.palette.blue.main, fontSize: "33px" }} />
                  </IconButton>
                </ListItem>
                <ListItem>
                  <IconButton>
                    <Message sx={{ color: theme.palette.blue.main, fontSize: "33px" }} />
                  </IconButton>
                </ListItem>
                <ListItem>
                  <IconButton>
                    <Notifications sx={{ color: theme.palette.blue.main, fontSize: "33px" }} />
                  </IconButton>
                </ListItem>
                <ListItem>
                  <IconButton>
                    <Help sx={{ color: theme.palette.blue.main, fontSize: "33px" }} />
                  </IconButton>
                </ListItem>
                <ListItem>
            <IconButton onClick={logoutfunct}>
             <LogoutOutlined sx={{ color: theme.palette.blue.main, fontSize: "33px" }} />
            </IconButton>
          </ListItem>
          <ListItem>
            <IconButton >
              <Avatar alt="Profile Picture" src={user.profilepic} sx={{ width: 40, height: 40 }} />
            </IconButton>
          </ListItem>
              </List>
            </Box>
          </Drawer>
        </>
      )}
    </Box>
  );
};

export default SideBar;
