/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Title,
  Subtitle,
  Columns,
  Column,
  Image,
  Hero,
  HeroBody,
  Container,
} from 'sophia-components';
import { withHandlers, compose, didSubscribe, withState } from 'proppy';
import { attach } from 'proppy-react';

const P = compose(
  withState('top', 'setTop', null),
  withState('left', 'setLeft', null),
  withHandlers({
    onSaveClick: ({ brand: { _id: brandId }, patchBrand }) =>
      (value, data, resolve, reject) =>
        patchBrand({
          brandId, patch: { [data]: value }, resolve, reject,
        }),
  }),
  didSubscribe((props) => {
    const name = document.getElementById('brand-name');
    const { top, left } = name.getBoundingClientRect();
    props.setTop(top);
    props.setLeft(left);
  }),
);

const BrandView = ({
  brand, onSaveClick,
}) => (!brand ? null : (
  <Fragment>
    <Hero light>
      <HeroBody>
        <Container>
          <Columns>
            <Column two>
              <Image src={brand.logo} alt="brand logo" ratio="square" />
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
      </HeroBody>
    </Hero>
  </Fragment>
));

BrandView.propTypes = {
  brand: PropTypes.shape(),
  onSaveClick: PropTypes.func.isRequired,
};

BrandView.defaultProps = {
  brand: null,
  top: null,
  left: null,
};

export default attach(P)(BrandView);
