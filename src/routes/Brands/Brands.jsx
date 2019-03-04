import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { didSubscribe } from 'proppy';
import { attach } from 'proppy-react';
import Typography from '@material-ui/core/Typography';
import BrandList from './components/BrandList';
import BrandView from './components/BrandView';
import BrandEdit from './components/BrandEdit';

const listProperties = {
  title: 'name',
  subtitle: 'code',
  avatarSrc: 'logo',
  avatarAlt: 'name',
};

const additionalNodes = item => (
    <>
      <Typography variant="h6">
        Origin:
        {item.origin}
      </Typography>
      <Typography>{item.description}</Typography>
    </>
);

const P = didSubscribe((props, { dispatch }) => dispatch.brand.fetchBrands());

const BrandClone = props => <BrandEdit isClone {...props} />;
const BrandNew = props => <BrandEdit isNew {...props} />;

const Brands = ({ match }) => (
  <Switch>
    <Route
      exact
      path={match.url}
      render={props => (
        <BrandList
          properties={listProperties}
          routeTitle="Brands"
          mainRoute={match.url}
          {...props}
        />
      )}
    />
    <Route path={`${match.url}/new`} component={BrandNew} />
    <Route path={`${match.url}/:id/edit`} component={BrandEdit} />
    <Route path={`${match.url}/:id/clone`} component={BrandClone} />
    <Route
      path={`${match.url}/:id`}
      render={props => (
        <BrandView
          properties={listProperties}
          routeTitle="Brand"
          mainRoute={match.url}
          additionalNodes={additionalNodes}
          {...props}
        />
      )}
    />
  </Switch>
);

Brands.propTypes = {
  match: PropTypes.shape().isRequired,
};

Brands.defaultProps = {};

export default attach(P)(Brands);
