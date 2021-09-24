import { createSlice } from '@reduxjs/toolkit'


import api from '../configuration/api'
import jwt_decode from "jwt-decode";



//slice
const slice = createSlice({
    name: 'user',
    initialState: {
        user: localStorage.getItem('user')
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            const token = state.user.userData.token;
            let decoded = jwt_decode(token);
            console.log("decoded", decoded)
            state.user.username = decoded.sub;
            state.user.userId = decoded.userId;
            state.user.role = decoded.role;
            state.user.token = token;
            console.log(state.user)
            localStorage.setItem('user', JSON.stringify(state.user))


        },
        logoutSuccess: (state, action) => {
            state.user = null;
            localStorage.removeItem('token')
        },
        signUpSuccess: (state, action) => {
            console.log("Yay")

        }
    }
})

export default slice.reducer

//Actions
const { loginSuccess, logoutSuccess, signUpSuccess } = slice.actions

export const login = ({ username, password }) => async dispatch => {
        const res = await api.post('authenticate', { username, password })
        console.log(res)
        if(res.status == 200){
            const userData = res.data;
            console.log("res", userData)
    
            dispatch(loginSuccess({ userData }));
        } else {
            throw new Error(res.data);
        }
        
    
}

export const signup = ({ fullname, username, password, Buyer, Seller }) => async dispatch => {
    try {
        const res = await api.post('register', { fullname, username, password, Buyer, Seller })
        const userData = res.data;
        console.log("res", userData)
        dispatch(signUpSuccess({ userData }));
    }
    catch (e) {
        return console.log(e.message);
    }
}

export const logout = ({ username, password }) => async dispatch => {
    try {
        //logout logic
        return dispatch(logoutSuccess())
    }
    catch (e) {
        return console.log(e.message);
    }
}