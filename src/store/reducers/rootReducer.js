// store/reducers/index.js

import { combineReducers } from 'redux';
import userReducer from './userReducer';

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;