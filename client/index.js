import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';

const Main = () => {
  const root = document.getElementById('root');
  const config = root.dataset.foursquare.split(',');
  const fsId = config[0];
  const fsSecret = config[1];

  return (
    <Provider store={ store }>
      <Router>
        <App fsId={ fsId } fsSecret={ fsSecret } />
      </Router>
    </Provider>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'));
