import axios from 'axios';
import { SET_USER, CLEAR_USER, UPDATE_USER } from './actionTypes';
import { BACKEND_ENDPOINT } from '../../constants';

export const setUser = (userData) => ({
    type: SET_USER,
    payload: userData
});

export const clearUser = () => ({
    type: CLEAR_USER,
});

export const updateUser = (userData) => ({
    type: UPDATE_USER,
    payload: userData,
});


export const fetchUserData = (userID) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${BACKEND_ENDPOINT}user/${userID}`);
            dispatch(setUser(response.data.user));
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
};
