import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

const SET_LOCATION = 'SET_LOCATION';
const SET_YELP_LOCATION = 'SET_YELP_LOCATION';
const SET_FS_LOCATION = 'SET_FS_LOCATION';

const initialState = {
  location: '',
  yelpLocation: '',
  fsLocation: ''
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

export const setFSLocation = (fsLocation) => {
  return {
    type: SET_FS_LOCATION,
    fsLocation
  }
};

export const searchYelp = (place) => dispatch => {
  // console.log('place: ', place)
  return axios.post('/api', { term: place.split(',')[0], location: place })
    .then(res => res.data)
    .then(resp => {
      // console.log(resp)
      dispatch(setYelpLocation(resp))
    })
    .catch(err => console.log(`error in fetchYelp: ${ err }`));
}

export const searchFoursquare = (query) => dispatch => {
  const fsQuery = {
    date: '20171029',
    ll: '40.7050881,-74.0113487',
    query
  }

  const searchStr = `v=${fsQuery.date}&ll=${fsQuery.ll}&query=${query}`;
  console.log('query: ', query, 'searchStr: ', searchStr);
  return axios.get(`https://api.foursquare.com/v2/venues/search?${ searchStr }`)
    .then(res => res.data)
    .then(resp => {
      console.log('foursquare: ', resp);

    })
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_LOCATION:
      return Object.assign({}, state, { location: action.location || '' });

    case SET_YELP_LOCATION:
      return Object.assign({}, state, { yelpLocation: action.yelpLocation || '' });

    case SET_FS_LOCATION:
      return Object.assign({}, state, { fsLocation: action.fsLocation || '' });

    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
