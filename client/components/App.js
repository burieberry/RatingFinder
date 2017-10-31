import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SearchBox from './SearchBox';
import store, { setLocation, setYelpLocation, setFsLocation } from '../store';

export default class App extends Component {
  componentDidMount() {
    store.dispatch(setLocation());
    store.dispatch(setYelpLocation());
    store.dispatch(setFsLocation());
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>RatingFinder <i className="fa fa-search" aria-hidden="true" /></h1>
        <Route component={ SearchBox } />
      </div>
    );
  }
}
