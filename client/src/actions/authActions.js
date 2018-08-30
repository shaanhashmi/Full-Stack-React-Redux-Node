import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// Login User
export const loginUser = (userData) => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);  // Save to localStorage
      setAuthToken(token);                      // Set token to Auth header
      const decoded = jwt_decode(token);        // Decode token to get user data
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');  // Remove token from localStorage
  setAuthToken(false);                  // Remove auth header from future requests
  dispatch(setCurrentUser({}));         // Set current user to {} will set isAuthenticated to fasle

}
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}