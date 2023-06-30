/** AUTH (SIGN UP & LOG IN) FORM - PURE COMPONENT */

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupThunk } from "../redux/authSlice";
import { loginThunk } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import '@fontsource/roboto/500.css';

export default function AuthForm(props) {
    
    // Handle inputted credentials
    const isAuthenticated = useSelector((store) => store.authStore.isAuthenticated);
    
    const [credential, setCredential] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: ""
    });

    const [error, setError] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: ""        
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        isAuthenticated && navigate('/secret');
    }, [isAuthenticated, navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredential((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    // Validate inputs
    const validateInput = (event) => {
        const { name, value } = event.target;
        setError((prevValue) => {
            const stateObj = { ...prevValue, [name]: ""};

            switch (name) {
                case 'first_name': 
                    if (!value) {
                        stateObj[name] = "Please enter a first name.";
                    }
                    break;

                case 'last_name': 
                    if (!value) {
                        stateObj[name] = "Please enter a last name.";
                    }
                    break;
                
                case 'email': 
                    if (!value) {
                        stateObj[name] = "Please enter an email address.";
                    }
                    break;
                    
                case 'password':
                    if (!value) {
                      stateObj[name] = "Please enter a password.";
                    } else if (credential.confirm_password && value !== credential.confirm_password) {
                      stateObj["confirm_password"] = "Passwords do not match.";
                    } else {
                      stateObj["confirm_password"] = credential.confirm_password ? "" : error.confirm_password;
                    }
                    break;
                
                case 'confirm_password':
                    if (!value) {
                        stateObj[name] = "Please re-enter your password.";
                    } else if (credential.password && value !== credential.password) {
                        stateObj[name] = "Passwords do not match.";
                    }                    
                    break;
                
                default:
                    break;
            }
            return stateObj;
        })
    }

    return(
        <Container>
            <Box 
                display='flex'
                flexDirection= 'column'
                justifyContent='center'
                alignItems='center'
                textAlign='center'
                minHeight='100vh'
            >
                {props.login === "Sign Up" 
                    ? <Typography variant='h4' >Sign up for SimpleWeather</Typography> 
                    : <Typography variant='h4'>Sign into SimpleWeather</Typography>
                }
                <br />
                {props.login === "Sign Up" 
                    ? <>
                        <TextField
                            sx={{width: '300px', backgroundColor: 'white'}}
                            margin='dense'
                            type="text" 
                            placeholder="First Name"
                            name="first_name"
                            value={credential.first_name}
                            onChange={handleChange}                
                            onBlur={validateInput}>
                        </TextField>
                        {error.first_name && 
                            <Typography sx={{ fontStyle: 'italic', color: 'red'}}>
                                {error.first_name}
                            </Typography>
                        }
                    </>
                    : null
                }
                {props.login === "Sign Up"                 
                    ? <>
                        <TextField
                            sx={{width: '300px', backgroundColor: 'white'}}
                            margin='dense'
                            type="text" 
                            placeholder="Last Name"
                            name="last_name"
                            value={credential.last_name}
                            onChange={handleChange}
                            onBlur={validateInput}
                            >                
                        </TextField>
                        {error.last_name && 
                            <Typography sx={{ fontStyle: 'italic', color: 'red'}}>
                                {error.last_name}
                            </Typography>
                        }
                    </>
                    : null
                }
                <TextField 
                    sx={{width: '300px', backgroundColor: 'white'}}
                    margin='dense'
                    type="text" 
                    placeholder="Email"
                    name="email"
                    value={credential.email}
                    onChange={handleChange}
                    onBlur={validateInput}>
                </TextField>
                {error.email && 
                    <Typography sx={{ fontStyle: 'italic', color: 'red'}}>
                        {error.email}
                    </Typography>
                }
                <TextField
                    sx={{width: '300px', backgroundColor: 'white'}}
                    margin='dense'                
                    type="password" 
                    placeholder="Password"
                    name="password"
                    value={credential.password}
                    onChange={handleChange}
                    onBlur={validateInput}>
                </TextField>
                {error.password && 
                    <Typography sx={{ fontStyle: 'italic', color: 'red'}}>
                        {error.password}
                    </Typography>
                }
                {props.login === "Sign Up"   
                    ? <> 
                        <TextField
                            sx={{width: '300px', backgroundColor: 'white'}}
                            margin='dense'                
                            type="password" 
                            placeholder="Re-enter Password"
                            name="confirm_password"
                            value={credential.confirm_password}
                            onChange={handleChange}
                            onBlur={validateInput}>
                        </TextField> 
                        {error.confirm_password && 
                            <Typography sx={{ fontStyle: 'italic', color: 'red'}}>
                                {error.confirm_password}
                            </Typography>
                        }
                    </>
                    : null
                } 
                <br />
                {props.login === 'Log In' 
                    ? <Typography>New user? Click <Link to='/signup'>here</Link> to sign up!</Typography>
                    : <Typography>Already have an account? Click <Link to='/'>here</Link>!</Typography>
                }
                <br />
                <Button variant='contained' color='primary' size='large'
                    onClick={() => dispatch(
                        props.login === "Sign Up"
                            ? signupThunk(credential)
                            : loginThunk(credential)
                    ).then(() => 
                        navigate(props.login === "Sign Up" ? "/" : "/home" )
                    )}
                > 
                    {props.login}
                </Button>
            </Box>
        </Container>
    )
}