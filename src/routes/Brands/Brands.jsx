import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { didSubscribe } from 'proppy';
import { attach } from 'proppy-react';
import { dispatch } from '@rematch/core';
import BrandList from './components/BrandList';
import BrandView from './components/BrandView';

const P = didSubscribe(() => dispatch.brand.fetchBrands());

const Brands = ({ match }) => (
  <Fragment>
    <Route exact path={match.url} component={BrandList} />
    <Route path={`${match.url}/:id`} component={BrandView} />
  </Fragment>
);

Brands.propTypes = {
  match: PropTypes.shape().isRequired,
};

Brands.defaultProps = {};

export default attach(P)(Brands);
