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
import witEditIcon from '../../../../hoc/withEditIcon';

const Title = witEditIcon(SophiaTitle, { inputClassName: 'title' });

const BrandView = ({ brand }) => (!brand ? null : (
  <Fragment>
    <Hero light>
      <HeroBody>
        <Container>
          <Columns>
            <Column two>
              <Image src={brand.logo} alt="brand logo" ratio="square" />
            </Column>
            <Column>
              <Title six marginless inputClassName="is-6 is-marginless">{brand.code}</Title>
              <Title
                onSaveClick={(editable) => { console.log(editable); return true; }}
              >
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
};

BrandView.defaultProps = {
  brand: null,
};

export default BrandView;
