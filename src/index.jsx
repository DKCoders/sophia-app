import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { init } from '@rematch/core';
import selectorPlugin from '@rematch/select';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import models from './modules';
import registerServiceWorker from './registerServiceWorker';
import './assets/styles/index.scss';

const select = selectorPlugin({ sliceState: rootState => rootState });
const rematchInit = { models, plugins: [select] };
const store = init(rematchInit);

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
