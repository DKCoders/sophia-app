/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Title,
  Subtitle,
  Columns,
  Column,
  Container,
} from 'sophia-components';
import { withHandlers, compose } from 'proppy';
import { attach } from 'proppy-react';
import { connect } from 'react-redux';
import { select } from '@rematch/select';
import { dispatch } from '@rematch/core';
import ResponsiveImage from '../../../../components/ResponsiveImage';

const P = compose(
  withHandlers({
    onSaveClick: ({ brand: { _id: brandId } }) =>
      (value, data, resolve, reject) =>
        dispatch.brand.patchBrand({
          brandId, patch: { [data]: value }, resolve, reject,
        }),
  }),
);

const BrandView = ({
  brand, onSaveClick,
}) => (!brand ? null : (
  <Container>
    <Columns>
      <Column two>
        <ResponsiveImage
          url={brand.logo}
        />
      </Column>
      <Column>
        <Title
          six
          marginless
          data="code"
          onSaveClick={onSaveClick}
        >
          {brand.code}
        </Title>
        <Title id="brand-name">
          {brand.name}
        </Title>
        <Subtitle six><strong>Origin:</strong> {brand.origin}</Subtitle>
        <p>{brand.description}</p>
      </Column>
    </Columns>
  </Container>
));

BrandView.propTypes = {
  brand: PropTypes.shape(),
  onSaveClick: PropTypes.func.isRequired,
};

BrandView.defaultProps = {
  brand: null,
};

const mapStateToProps = (state, { match: { params: { id } } }) => ({
  brand: select.brand.brandByIdSelector(state, { id }),
});

export default connect(mapStateToProps)(attach(P)(BrandView));
