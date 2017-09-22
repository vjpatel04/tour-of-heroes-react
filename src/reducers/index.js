import { combineReducers } from 'redux';
import heroAppState from './heroes';
import loaderState from './loaderState';

const rootReducer = combineReducers({
    heroAppState,
    loaderState
});

export default rootReducer;