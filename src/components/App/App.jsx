import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Navbar from '../Navbar';
import PrivateRoute from '../PrivateRoute';
import Login from '../../routes/Login';
import Dashboard from '../../routes/Dashboard';
import Brands from '../../routes/Brands';

const App = () => (
  <Fragment>
    <Navbar />
    <Route path="/login" component={Login} />
    <PrivateRoute exact path="/" component={Dashboard} />
    <PrivateRoute path="/brands" component={Brands} />
  </Fragment>
);

App.propTypes = {};

App.defaultProps = {};

export default App;

