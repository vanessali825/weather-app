/** SECRET PAGE  */

import axios from 'axios';
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { logoutNowThunk } from "../redux/authSlice";
import { Box, Typography, Button } from '@mui/material';

export default function Secret() {
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
    return (
        <Box>
            <Typography variant='h4'> Welcome to the secret page! </Typography>
            <Typography variant='subtitle1'> You're successfully logged in. </Typography> <br />
            <Button variant='contained' onClick={() => dispatch(logoutNowThunk())}>Logout</Button>
        </Box>
    )
}