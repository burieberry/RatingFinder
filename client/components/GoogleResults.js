import React from 'react';
import { connect } from 'react-redux';
import { getLocation } from '../store';

const GoogleResults = ({ loc }) => {
  console.log(loc)
  return (
      <div>
        <li>Name: { loc }</li>
      </div>
  )
};

const mapStateToProps = ({ location }) => {
  return { location };
};

const mapDispatch = { getLocation };

export default connect(mapStateToProps, mapDispatch)(GoogleResults);
