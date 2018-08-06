import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './features/Login';
import Dashboard from './features/Dashboard';
import Brands from './features/Brands';

const App = () => (
  <Fragment>
    <Route path="/login" component={Login} />
    <div className="app-container">
      <Navbar />
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute path="/brands" component={Brands} />
    </div>
  </Fragment>
);

App.propTypes = {};

App.defaultProps = {};

export default App;
