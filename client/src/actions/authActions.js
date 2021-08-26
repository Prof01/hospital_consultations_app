import axios from 'axios';
import { returnErrors } from "./errorActions";
import { 
    OFFICER_LOADING,
    OFFICER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
 } from "./types";

 //Check token & load officer
export const loadOfficer = () => (dispatch, getState) => {
    //Officer loading
    dispatch(setOfficerLoading());
    
    axios.get('/api/v1/officer', tokenConfig(getState))
        .then(res => dispatch({
            type: OFFICER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err?.response?.data, err?.response?.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
    };
    
    //Register Officer
    export const registerOfficer = ({ fullName, email, password } ) => dispatch => {
        //Officer loading
        dispatch(setOfficerLoading());
        //Headers
        const config = {
            headers: {
            'Content-type': 'application/json'
        }
    };
    
    //Request body
    const body = JSON.stringify({ fullName, email, password });
    
    axios.post('/api/v1/officer/register', body, config)
    .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err?.response?.data, err?.response?.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

//Login Officer
export const loginOfficer = ({ email, password }) => dispatch => {
    //Officer loading
    dispatch(setOfficerLoading());
    //Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    //Request body
    const body = JSON.stringify({email, password });

    axios.post('/api/v1/officer/login', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err?.response?.data, err?.response?.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

//logout
export const logoutOfficer = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

//Setup config/header and token
export const tokenConfig = (getState) => {
    //get token from localStorage
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            'Content-Type': 'applicaton/json'
        }
    }

    //If token add to headers
    if(token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}

// Set Officer to Loading
export const setOfficerLoading = () => {
    return {
      type: OFFICER_LOADING
    };
  };