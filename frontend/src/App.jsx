import React, { useMemo } from 'react'
import {useSelector} from "react-redux"
import { CssBaseline,ThemeProvider,createTheme } from "@mui/material";
import { themeSettings } from './Theme';
import Home from './pages/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import  Login from './pages/Login.jsx';



const App = () => {

   
  const mode=useSelector((state)=>state.mode)
const theme=useMemo(()=>{
  return createTheme(themeSettings(mode))
},[mode])

 const isAuth=Boolean((state)=>state.token);

  return (
    <div>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/home" element={isAuth?<Home/>:<Navigate to="/"/>}/>
   
    </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
// <Route path="/profile/:id" element={isAuth?<ProfileP/>:<Navigate to="/"/>}/> 