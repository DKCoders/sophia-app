import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import BrandList from './components/BrandList';

const Brands = ({ match }) => (
  <Fragment>
    <Route path={match.url} exact component={BrandList} />
  </Fragment>
);

Brands.propTypes = {
  match: PropTypes.shape().isRequired,
};

Brands.defaultProps = {};

export default Brands;
