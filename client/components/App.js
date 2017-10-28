import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SearchBox from './SearchBox';
import store, { setLocation } from '../store';

export default class App extends Component {
  componentDidMount() {
    store.dispatch(setLocation());
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
