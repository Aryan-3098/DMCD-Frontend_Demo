import axios from 'axios';
import { SET_USER, CLEAR_USER, UPDATE_USER,SET_USER_LOADING } from './actionTypes';
import { BACKEND_ENDPOINT } from '../../constants';
import { type } from '@testing-library/user-event/dist/type';

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

export const setUserLoading = (loading) =>({
    type:SET_USER_LOADING,
    payload: loading
})


export const fetchUserData = (userID) => {
    return async (dispatch) => {
        setUserLoading(true)
        try {
            const response = await axios.get(`${BACKEND_ENDPOINT}user/${userID}`);
            if(response.status === 200){
            dispatch(setUser(response.data.user))
                setUserLoading(false)
        };
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUserLoading(false)
        }
    };
};
