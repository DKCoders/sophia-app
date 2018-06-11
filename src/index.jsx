import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import 'bulma/bulma.sass';

import App from './components/App';
import models from './modules';

const store = init({ models });

const root = document.getElementById('root');
const load = () => render(
  (
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>
  ), root,
);

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept('./components/App', load);
}

load();
