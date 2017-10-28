import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SearchBox from './SearchBox';
import store, { getLocation } from '../store';

export default class App extends Component {
  componentDidMount() {
    store.dispatch(getLocation());
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>RatingFinder</h1>
        <Route component={ SearchBox } />
      </div>
    );
  }
}
