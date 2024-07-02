import React, { useState } from 'react';
import { Button, TextField, Typography, useMediaQuery } from '@mui/material';
import { Formik } from 'formik';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Dropzone from 'react-dropzone';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { setLogin } from '../state/mainSlice';

const registerSchema = yup.object().shape({
  fullName: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
  username: yup.string().required("Required"),
  profilepic: yup.mixed().required("Required"),
});

const loginSchema = yup.object().shape({
  username: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

const initialValuesRegister = {
  fullName: "",
  email: "",
  password: "",
  profilepic: null,
  username: "",
};

const initialValuesLogin = {
  username: "",
  password: "",
};



const Form = () => {
  const [pageType, setPageType] = useState("login");
  const theme = useTheme();

  const isNotMobileScreen = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let key in values) {
        formData.append(key, values[key]);
    }


    try {
      const response = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        body: formData,
        credentials:"include"
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to register: ${errorMessage}`);
      }

      const savedUser = await response.json();
      onSubmitProps.resetForm();
      if (savedUser) {
        dispatch(setLogin({
          user:savedUser,
          token:savedUser.token
        }))
       navigate("/home")
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

   
const handlespecialSubmit=async()=>{
  try {

   const body={ "username":"onthemoon",
    "password":"123456789"
  }

    const loggedUserResponse = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(body),
       credentials:"include"
    });
 
    const loggedIn = await loggedUserResponse.json();
    if(loggedIn.error){
      throw new Error(loggedIn.error)
    }
    console.log(loggedIn);
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn,
          token:loggedIn.token,
        })
      );
      navigate("/home");
    }
  
  } catch (error) {
    console.error('Error logging in:', error);
  }

}





  const login = async (values, onSubmitProps) => {
    try {
      const loggedUserResponse = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        credentials:"include"
      });

      const loggedIn = await loggedUserResponse.json();
      onSubmitProps.resetForm();
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn,
          token:loggedIn.token,
          })
        );
        navigate("/home");
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNotMobileScreen ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name='email'
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Full Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullName}
                  name='fullName'
                  error={Boolean(touched.fullName) && Boolean(errors.fullName)}
                  helperText={touched.fullName && errors.fullName}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${theme.palette.blue.main}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles="image/jpeg,image/png"
                    multiple={false}
                    onDrop={(acceptedFiles) => setFieldValue("profilepic", acceptedFiles[0])}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${theme.palette.blue.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()}/>
                        {!values.profilepic ? (
                          <Typography>Add Picture Here</Typography>
                        ) : (
                          <Box  display="flex" justifyContent="space-between" alignItems="center">
                            <Typography>{values.profilepic.name}</Typography>
                          </Box>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label="Username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
              name='username'
              error={Boolean(touched.username) && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Password"
              type='password'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name='password'
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 2" }}
            />


            <Button variant='contained' onClick={handlespecialSubmit}  sx={{backgroundColor:"white"}}>DO NOT CLICK</Button>


          </Box>
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                border:"2px solid white",
                color: theme.palette.blue.main,
                "&:hover": { color: theme.palette.primary.main },
              }}
            >
              {isLogin ? "Login" : "Register"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: theme.palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: theme.palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
