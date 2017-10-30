import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';

const Main = () => (
  <Provider store={ store }>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(<Main />, document.getElementById('root'));
