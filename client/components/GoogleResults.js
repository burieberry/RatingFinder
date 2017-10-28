import React from 'react';
import { connect } from 'react-redux';
import { getLocation } from '../store';
import SearchBox from './SearchBox';

const GoogleResults = ({ location }) => {
  return (
      <div>
        <SearchBox />
        <li>Name: { location }</li>
      </div>
  )
};

const mapStateToProps = ({ location }) => {
  return { location };
};

const mapDispatch = { getLocation };

export default connect(mapStateToProps, mapDispatch)(GoogleResults);
