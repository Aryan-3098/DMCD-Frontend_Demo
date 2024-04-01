import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

// Create the Redux store with the combined root reducer
const store = createStore(rootReducer);

export default store;