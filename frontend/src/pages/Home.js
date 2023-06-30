/** HOME PAGE  */

import * as React from 'react';
import axios from 'axios';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { logoutNowThunk } from "../redux/authSlice";
import { Container, Box, AppBar, Toolbar, Typography, Button, useScrollTrigger, Slide, CssBaseline } from '@mui/material';
import SearchBar from "../components/SearchBar";

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

export default function HomePage(props) {
    useEffect(() => {
        const token = localStorage.getItem("TOKEN");
        const getData = async () => {
            const response = await axios(
                `${process.env.REACT_APP_API_SERVER}/data`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
        };
        getData();
    }, []);

    const dispatch = useDispatch();
    
    return(
        <React.Fragment>
            <CssBaseline />
                <HideOnScroll {...props}>
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar color="inherit" sx={{ borderBottom: "none" }}>
                            <Toolbar>
                                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                    SimpleWeather
                                </Typography>
                                <Button color="inherit" onClick={() => dispatch(logoutNowThunk())}>Logout</Button>
                            </Toolbar>
                        </AppBar>
                    </Box>            
                </HideOnScroll>  
            <Container>
                <SearchBar />
            </Container>
        </React.Fragment>
    )
}