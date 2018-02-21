import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as AgastReducers from './AgastReducer';

const rootReducer = combineReducers({
  agastSaveReducer: AgastReducers.agastSaveReducer,
  agastReducer: AgastReducers.agastReducer,
  agastListReducer: AgastReducers.agastListReducer,
  routing: routerReducer
});

export default rootReducer;