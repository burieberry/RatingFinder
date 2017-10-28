import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const SET_LOCATION = 'SET_LOCATION';

export const setLocation = (location) => {
  return {
    type: SET_LOCATION,
    location
  }
};

const reducer = (state = { location: '' }, action) => {
  switch(action.type) {
    case SET_LOCATION:
      return Object.assign({}, state, { location: action.location || '' });

    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
