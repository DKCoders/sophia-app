import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import models from './modules';

const store = init({
  models,
});

const elem = document.createElement('div');
elem.id = 'portal';
document.body.appendChild(elem);

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
