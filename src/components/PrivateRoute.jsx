/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (Auth.getToken() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      ))
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

PrivateRoute.defaultProps = {};

export default PrivateRoute;
