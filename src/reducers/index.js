import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import agastReducer from './AgastReducer';

const rootReducer = combineReducers({
  agastReducer,
  routing: routerReducer
});

export default rootReducer;