import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { didSubscribe } from 'proppy';
import { attach } from 'proppy-react';
import Typography from '@material-ui/core/Typography';
import CategoryList from './components/CategoryList';
import CategoryView from './components/CategoryView';
import CategoryEdit from './components/CategoryEdit';
import CategoryForm from './components/CategoryForm';

const listProperties = {
  title: 'name',
  subtitle: 'code',
  avatarSrc: 'img',
  avatarAlt: 'name',
};

const additionalNodes = item => (
  <Typography>{item.description}</Typography>
);

const P = didSubscribe((props, { dispatch }) => dispatch.category.fetchCategories());

const Categories = ({ match }) => (
  <Switch>
    <Route
      exact
      path={match.url}
      render={props => (
        <CategoryList
          properties={listProperties}
          routeTitle="Categories"
          mainRoute={match.url}
          {...props}
        />
      )}
    />
    <Route
      path={`${match.url}/new`}
      render={props => (
        <CategoryEdit
          FormComponent={CategoryForm}
          routeTitle="New Category"
          isNew
          mainRoute={match.url}
          {...props}
        />
      )}
    />
    <Route
      path={`${match.url}/:id/edit`}
      render={props => (
        <CategoryEdit
          FormComponent={CategoryForm}
          routeTitle="Edit Category"
          mainRoute={match.url}
          {...props}
        />
      )}
    />
    <Route
      path={`${match.url}/:id/clone`}
      render={props => (
        <CategoryEdit
          FormComponent={CategoryForm}
          routeTitle="New Category"
          isClone
          mainRoute={match.url}
          {...props}
        />
      )}
    />
    <Route
      path={`${match.url}/:id`}
      render={props => (
        <CategoryView
          properties={listProperties}
          routeTitle="Category"
          mainRoute={match.url}
          additionalNodes={additionalNodes}
          {...props}
        />
      )}
    />
  </Switch>
);

Categories.propTypes = {
  match: PropTypes.shape().isRequired,
};

Categories.defaultProps = {};

export default attach(P)(Categories);
