import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { didSubscribe } from 'proppy';
import { attach } from 'proppy-react';
import Typography from '@material-ui/core/Typography';
import UserList from './components/UserList';
import UserView from './components/UserView';
import UserEdit from './components/UserEdit';
import UserForm from './components/UserForm';

const listProperties = {
  title: 'username',
  subtitle: 'email',
};

const additionalNodes = item => (
  <>
    <Typography variant="h6">{item.name}</Typography>
  </>
);


const P = didSubscribe((props, { dispatch }) => dispatch.user.fetchUsers());

const Users = ({ match }) => (
  <Switch>
    <Route
      exact
      path={match.url}
      render={props => (
        <UserList
          properties={listProperties}
          routeTitle="Users"
          mainRoute={match.url}
          {...props}
        />
      )}
    />
    <Route
      path={`${match.url}/new`}
      render={props => (
        <UserEdit
          FormComponent={UserForm}
          routeTitle="New User"
          isNew
          mainRoute={match.url}
          {...props}
        />
      )}
    />
    <Route
      path={`${match.url}/:id/edit`}
      render={props => (
        <UserEdit
          FormComponent={UserForm}
          routeTitle="Edit User"
          mainRoute={match.url}
          {...props}
        />
      )}
    />
    <Route
      path={`${match.url}/:id/clone`}
      render={props => (
        <UserEdit
          FormComponent={UserForm}
          routeTitle="New User"
          isClone
          mainRoute={match.url}
          {...props}
        />
      )}
    />
    <Route
      path={`${match.url}/:id`}
      render={props => (
        <UserView
          properties={listProperties}
          routeTitle="User"
          mainRoute={match.url}
          additionalNodes={additionalNodes}
          {...props}
        />
      )}
    />
  </Switch>
);

Users.propTypes = {
  match: PropTypes.shape().isRequired,
};

Users.defaultProps = {};

export default attach(P)(Users);
