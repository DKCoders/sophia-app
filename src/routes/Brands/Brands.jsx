import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import {  } from 'sophia-components';
import { didSubscribe } from 'proppy';
import { attach } from 'proppy-react';
import RouteTitle from '../../components/RouteTitle';

const P = didSubscribe(({ fetchBrands }) => fetchBrands());

const Brands = ({ brands }) => {
  console.log(brands);
  return (
    <Fragment>
      <RouteTitle title="Brands" />
    </Fragment>
  );
};

Brands.propTypes = {
// eslint-disable-next-line react/no-unused-prop-types
  fetchBrands: PropTypes.func.isRequired,
  brands: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

Brands.defaultProps = {};

export default attach(P)(Brands);
