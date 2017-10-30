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
};

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

export const setFsLocation = (fsLocation) => {
  return {
    type: SET_FS_LOCATION,
    fsLocation
  }
};

export const searchYelp = (location, place) => dispatch => {
  // console.log(location)
  return axios.post('/api/yelp', { latitude: location.lat, longitude: location.lng, term: place })
    .then(res => res.data)
    .then(venue => {
      // console.log(venue)
      dispatch(setYelpLocation(venue))
    })
}

export const searchFoursquare = (location, place) => dispatch => {
  const fsConfig = {
    searchApi: 'https://api.foursquare.com/v2/venues/search',
    version: '20171029',
    clientId: fsId,
    clientSecret: fsSecret,
    ll: `${location.lat},${location.lng}`,
    query: place
  };

  const { searchApi, version, clientId, clientSecret, ll, query } = fsConfig;
  const queryUrl = `${searchApi}?v=${version}&ll=${ll}&query=${query}&client_id=${clientId}&client_secret=${clientSecret}`;

  return axios.get(queryUrl)
    .then(res => res.data)
    .then(venue => {
      // console.log('foursquare: ', venue.response.venues[0]);
      dispatch(setFsLocation(venue.response.venues[0]));
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
