import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import { init } from '@rematch/core';
import selectPlugin from '@rematch/select';
import { Provider } from 'react-redux';
import 'bulma/bulma.sass';

import App from './components/App';
import models from './modules';

const store = init({
  models,
  plugins: [selectPlugin({ sliceState: rootState => rootState })],
});

const elem = document.createElement('div');
elem.id = 'portal';
document.body.appendChild(elem);
const root = document.getElementById('root');
const load = () => render(
  (
    <AppContainer>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </AppContainer>
  ), root,
);

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept('./components/App', load);
}

load();
