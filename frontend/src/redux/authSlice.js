/** REDUX AUTH SLICE */

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isAuthenticated: false || localStorage.getItem('TOKEN') != null
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.isAuthenticated = false
        }
    }
})

export const { login, logout } = authSlice.actions;

export const signupThunk = ({first_name, last_name, email, password}) => async dispatch => {
    try { 
        const response = await axios.post(`${process.env.REACT_APP_API_SERVER}/auth/signup`, {
            first_name,
            last_name,
            email, 
            password,
        });
        console.log(response.data)
    } catch (error) {
        console.error(error);
    }
}

export const loginThunk = ({email, password}) => async dispatch => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_SERVER}/auth/login`, {
            email, 
            password,
        });
        if (response.data === false) {
            console.log('Login failed')
        } else {
            console.log(response.data)
            localStorage.setItem('TOKEN', response.data.token)
            dispatch(login())
        }
    } catch (error) {
        console.error(error);
    }
}

export const logoutNowThunk = () => dispatch => {
    localStorage.removeItem('TOKEN');
    dispatch(logout());
}

export default authSlice.reducer;