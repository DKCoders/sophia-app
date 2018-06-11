import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import Login from '../../routes/Login';
import Dashboard from '../../routes/Dashboard';

const App = () => (
  <Router>
    <div className="container">
      <Route path="/login" component={Login} />
      <PrivateRoute exact path="/" component={Dashboard} />
    </div>
  </Router>
);

App.propTypes = {};

App.defaultProps = {};

export default App;

