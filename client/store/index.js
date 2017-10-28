import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const GET_LOCATION = 'GET_LOCATION';

export const getLocation = (location) => {
  return {
    type: GET_LOCATION,
    location
  }
};

const initialState = {
  location: 'New York, NY'
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_LOCATION:
      return Object.assign({}, state, { location: action.location });

    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
