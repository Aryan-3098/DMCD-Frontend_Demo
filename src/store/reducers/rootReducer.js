import { combineReducers } from 'redux';
import userReducer from './userReducer';
const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_USER_LOADING':
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  userLoading: loadingReducer,
});

export default rootReducer;
