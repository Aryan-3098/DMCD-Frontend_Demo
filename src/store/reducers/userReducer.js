// store/reducers/userReducer.js
import { CLEAR_USER, SET_USER, UPDATE_USER } from "../actions/actionTypes";

// Define initial state
const initialState = {
    user: null,
};

// Define the user reducer function
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case CLEAR_USER:
            return {
                ...state,
                user: null,
            };
        case UPDATE_USER:
            return {
                ...state,
                user: { ...state.user, ...action.payload },
            };
        default:
            return state;
    }
};

export default userReducer;