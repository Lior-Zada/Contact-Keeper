import React, { useContext, useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

import axios from 'axios';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //Load User

    const loadUser = async () => {
        handleToken();
        try {
            const res = await axios.get('/api/auth');
            dispatch({ type: USER_LOADED, payload: res.data });
        } catch (error) {
            dispatch({ type: AUTH_ERROR, payload: error.response.data.msg });
        }
    };
    //Register User
    const register = async formData => {
        try {
            const result = await axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType: 'json',
                url: '/api/users',
                data: JSON.stringify(formData)
            });
            dispatch({ type: REGISTER_SUCCESS, payload: result.data });
            loadUser();
        } catch (error) {
            dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
        }
    };
    //Login User
    const login = async formData => {
        try {
            const result = await axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType: 'json',
                url: '/api/auth',
                data: JSON.stringify(formData)
            });
            dispatch({ type: LOGIN_SUCCESS, payload: result.data });
            loadUser();
        } catch (error) {
            dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
        }
    };
    //Logout
    const logout = () => dispatch({ type: LOGOUT });
    //Clear Errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    const handleToken = () => {
        if (localStorage.getItem('token')) {
            setAuthToken(localStorage.getItem('token'));
        }
    };
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
