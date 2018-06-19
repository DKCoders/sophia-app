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
import { withHandlers, compose, didSubscribe, withState } from 'proppy';
import { attach } from 'proppy-react';
import withEditable from '../../../../hoc/withEditable';
import Popover from '../../../../components/Popover';

const Title = withEditable(SophiaTitle);

const Paragraph = withEditable(({ children, ...props }) => <p {...props}>{children}</p>);

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
  brand, onSaveClick, top, left,
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
              <SophiaTitle id="brand-name">
                {brand.name}
              </SophiaTitle>
              <Popover active top={top} left={left}>
                PopoverTest
              </Popover>
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
  top: PropTypes.number,
  left: PropTypes.number,
};

BrandView.defaultProps = {
  brand: null,
  top: null,
  left: null,
};

export default attach(P)(BrandView);
