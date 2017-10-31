import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

const SET_LOCATION = 'SET_LOCATION';
const SET_YELP_LOCATION = 'SET_YELP_LOCATION';
const SET_YELP_REVIEWS = 'SET_YELP_REVIEWS';
const SET_FS_LOCATION = 'SET_FS_LOCATION';
const SET_FS_REVIEWS = 'SET_FS_REVIEWS';

const initialState = {
  location: '',
  yelpLocation: '',
  yelpReviews: '',
  fsLocation: '',
  fsReviews: ''
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

export const setYelpReviews = (yelpReviews) => {
  return {
    type: SET_YELP_REVIEWS,
    yelpReviews
  }
}

export const setFsReviews = (fsReviews) => {
  return {
    type: SET_FS_REVIEWS,
    fsReviews
  }
}

export const setFsLocation = (fsLocation) => {
  return {
    type: SET_FS_LOCATION,
    fsLocation
  }
};

export const fetchYelpReviews = (id) => dispatch => {
  return axios.post('/api/yelp/reviews', { id })
    .then(res => res.data)
    .then(reviews => {
      // console.log(reviews);
      dispatch(setYelpReviews(reviews));
    })
}

export const searchYelp = (location, place) => dispatch => {
  // console.log(location)
  return axios.post('/api/yelp', { latitude: location.lat, longitude: location.lng, term: place })
    .then(res => res.data)
    .then(venue => {
      console.log(venue)
      dispatch(fetchYelpReviews(venue.id));
      dispatch(setYelpLocation(venue));
    })
}

export const fetchFoursquareReviews = (id, key, version) => dispatch => {
  return axios.get(`https://api.foursquare.com/v2/venues/${id}/tips?v=${version}&${key}&sort=recent&limit=100`)
    .then(res => res.data)
    .then(reviews => {
      console.log(reviews.response.tips.items);
      dispatch(setFsReviews(reviews.response.tips.items));
    })
}

const fetchFoursquareDetails = (id, key, version) => dispatch => {
  return axios.get(`https://api.foursquare.com/v2/venues/${id}?v=${version}&${key}`)
    .then(res => res.data)
    .then(details => {
      console.log(details);
      dispatch(setFsLocation(details.response.venue));
    })
}

export const searchFoursquare = (location, place) => dispatch => {
  const fsConfig = {
    searchApi: 'https://api.foursquare.com/v2/venues/search',
    version: '20171029',
    key: `client_id=${fsId}&client_secret=${fsSecret}`,
    ll: `${location.lat},${location.lng}`,
    query: place
  };

  const { searchApi, version, key, ll, query } = fsConfig;
  const queryUrl = `${searchApi}?v=${version}&ll=${ll}&query=${query}&${key}`;

  return axios.get(queryUrl)
    .then(res => res.data)
    .then(venues => {
      dispatch(fetchFoursquareReviews(venues.response.venues[0].id, key, version));
      dispatch(fetchFoursquareDetails(venues.response.venues[0].id, key, version));
    })
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_LOCATION:
      return Object.assign({}, state, { location: action.location || '' });

    case SET_YELP_LOCATION:
      return Object.assign({}, state, { yelpLocation: action.yelpLocation || '' });

    case SET_YELP_REVIEWS:
      return Object.assign({}, state, { yelpReviews: action.yelpReviews || '' });

    case SET_FS_LOCATION:
      return Object.assign({}, state, { fsLocation: action.fsLocation || '' });

    case SET_FS_REVIEWS:
      return Object.assign({}, state, { fsReviews: action.fsReviews || '' });

    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
