import axios from 'axios';
import { SET_USER, CLEAR_USER, UPDATE_USER,SET_USER_LOADING, SET_USER_LOGGED_IN } from './actionTypes';
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

export const setUserLoading = (loading) =>({
    type:SET_USER_LOADING,
    payload: loading
})

export const setUserLoggedIn = (loggedIn) =>({
    type:SET_USER_LOGGED_IN,
    payload: loggedIn
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
