import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import { ProppyProvider } from 'proppy-react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import models from './modules';
import 'react-image-crop/dist/ReactCrop.css';

const store = init({
  models,
});
const { getState, dispatch } = store;
const providers = { store, getState, dispatch };

const elem = document.createElement('div');
elem.id = 'portal';
document.body.appendChild(elem);

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
  typography: { useNextVariants: true },
  overrides: {
    MuiGrid: { // Name of the component ⚛️ / style sheet
      container: {
        height: 'inherit',
      },
    },
    MuiFab: {
      primary: {
        backgroundColor: '#2196f3', /* this color is used in FAB and buttons, maybe we can configure it inside the color palette? */
        '&:hover': {
          color: '#FFFFFF',
        },
      },
    },
    MuiButton: {
      containedPrimary: {
        backgroundColor: '#2196f3',
      },
    },
  },
});

ReactDOM.render((
  <Provider store={store}>
    <ProppyProvider providers={providers}>
      <Router>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </Router>
    </ProppyProvider>
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
