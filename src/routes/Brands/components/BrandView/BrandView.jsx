import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Title,
  Columns,
  Column,
  Image,
} from 'sophia-components';

const BrandView = ({ brand }) => (!brand ? null : (
  <Fragment>
    <Columns>
      <Column>
        <Image src={brand.logo} alt="brand logo" ratio="square" />
      </Column>
      <Column>
        <Title>{brand.name}</Title>
      </Column>
    </Columns>
  </Fragment>
));

BrandView.propTypes = {
  brand: PropTypes.shape(),
};

BrandView.defaultProps = {
  brand: null,
};

export default BrandView;
