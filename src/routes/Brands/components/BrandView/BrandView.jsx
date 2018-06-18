/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Title as SophiaTitle,
  Subtitle,
  Columns,
  Column,
  Image,
  Hero,
  HeroBody,
  Container,
} from 'sophia-components';
import { withHandlers } from 'proppy';
import { attach } from 'proppy-react';
import withEditable from '../../../../hoc/withEditable';

const Title = withEditable(SophiaTitle);

const Paragraph = withEditable(({ children, ...props }) => <p {...props}>{children}</p>);

const P = withHandlers({
  onSaveClick: ({ brand: { _id: brandId }, patchBrand }) =>
    (value, data, resolve, reject) =>
      patchBrand({
        brandId, patch: { [data]: value }, resolve, reject,
      }),
});

const BrandView = ({ brand, onSaveClick }) => (!brand ? null : (
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
              <Title
                data="name"
                onSaveClick={onSaveClick}
              >
                {brand.name}
              </Title>
              <Subtitle six><strong>Origin:</strong> {brand.origin}</Subtitle>
              <Paragraph data="description">{brand.description}</Paragraph>
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
};

export default attach(P)(BrandView);
