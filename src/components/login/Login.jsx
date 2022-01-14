import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Dashboard from "../Dashboard";
import axios from 'axios';
import cors from 'cors';
import './login.css';
import { fabClasses } from '@mui/material';




const Login = () => {
    const [userName, setUserName] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
      });


    useEffect(() => {
        checkLoginStatusOnLoad()
    }, [])

    function checkLoginStatusOnLoad() {      
        const isToken = window.localStorage.getItem("token");  
        if(isToken){
            setIsLoggedIn(true);
        }
        else{
            setIsLoggedIn(false);
        }
    }
    

      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setPass(event.target.value);
      };

      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });

      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      function handleUserChange(e){
        const user = e.target.value;
        setUserName(user);
      }

      async function handleFormSubmit(e){
        e.preventDefault();
        await axios({
            method: 'post',
            url: 'http://localhost:4000/auth/login',
            data: {
              userName: userName, // This is the body part
              password: pass
            }
          }).then(response => {
              setUserName('');
              setValues({
                password: '',
                showPassword: false,
              });
              const token = response.data.token
              window.localStorage.setItem("token", token);
              setIsLoggedIn(true)
        });
      }

      // Clears everything from the local Storage  

      function setLoginToFalse(e){      
        localStorage.clear();
        setIsLoggedIn(false);
      }

    return (
        <div>
            {isLoggedIn ? <Dashboard loggedIn={setLoginToFalse}/> : (
            <div className='login-screen'>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                        m: 1,
                        width: '380px',
                        height: '320px',
                        justifyContent: 'center',
                        alignItems: 'center'
                        },
                    }}
                >
                <Paper>
                    <div className='input-container'>
                        <form>
                        <div>
                        <Typography 
                            variant="h6" 
                            component="h2"
                            sx={{
                                textAlign: 'center',
                                marginTop: '20px'
                            }}
                        >
                            Login
                        </Typography>
                            <TextField
                                id="standard-basic"
                                label="Username"
                                variant="standard"
                                fullWidth
                                className='input-control'
                                onChange={handleUserChange}
                            />
                            <FormControl sx={{ width: '100%' }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    fullWidth
                                    className='input-control'
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <Button 
                                variant="contained" 
                                sx={{
                                    backgroundColor: '#9c27b0',
                                    boxShadow: 1
                                }}
                                className='input-control login-button'
                                onClick={handleFormSubmit}
                                type="submit"
                            >
                                Login
                            </Button>
                        </div>
                        </form>  
                    </div>
                </Paper>
                </Box> 
            </div>
            )}
        </div>
    )
}

export default Login
