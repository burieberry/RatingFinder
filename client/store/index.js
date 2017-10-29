import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

const SET_LOCATION = 'SET_LOCATION';
const SET_YELP_LOCATION = 'SET_YELP_LOCATION';

const initialState = {
  location: '',
  yelpLocation: '',
  response: ''
}

export const setLocation = (location) => {
  return {
    type: SET_LOCATION,
    location
  }
};

export const setYelpLocation = (yelpLocation) => {
  return {
    type: SET_YELP_LOCATION,
    yelpLocation
  }
};

export const searchYelp = (place) => dispatch => {
  console.log(place)
  return axios.post('/api', { term: 'four barrel coffee', location: 'San Francisco, Ca' })
    .then(res => res.data)
    .then(resp => {
      console.log(resp)
      dispatch(setYelpLocation(resp))
    })
    .catch(err => console.log(`error in fetchYelp: ${ err }`));
}

// export const fetchYelp = () => dispatch => {
//   return axios.get('/api')
//     .then(res => res.data)
//     .then(resp => {
//       console.log(resp)
//       dispatch(setLocation(resp))
//     })
//     .catch(err => console.log(`error in fetchYelp: ${ err }`));
// }

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_LOCATION:
      return Object.assign({}, state, { location: action.location || '' });

    case SET_YELP_LOCATION:
      return Object.assign({}, state, { yelpLocation: action.yelpLocation || '' });

    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
