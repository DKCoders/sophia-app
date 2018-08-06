/* eslint-disable no-underscore-dangle,jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,max-len */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Columns,
  Column,
  Image,
} from 'sophia-components';
import { Card, H2, H3, ButtonGroup, Button, Navbar, NavbarGroup } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { compose, withState, withHandlers } from 'proppy';
import { attach } from 'proppy-react';
import RouteTitle from '../../../../components/RouteTitle';
import Search from '../../../../components/Search';
import { filterByKey } from '../../../../utils/helpers';

const P = compose(
  withState('search', 'setSearch', ''),
  withHandlers({
    goTo: ({ history }) => (id) => {
      history.push(`/brands/${id}`);
    },
  }),
);

const BrandList = ({
  brands, search, setSearch, goTo,
}) => {
  const filtered = !search ? brands : brands.filter(filterByKey(search));
  const items = filtered.map(brand => (
    <Column four key={brand._id}>
      <Card interactive onClick={() => goTo(brand._id)}>
        <Columns>
          <Column>
            <Image src={brand.logo} square="64" alt="brand logo" />
          </Column>
          <Column>
            <H2>{brand.name}</H2>
            <H3>{brand.code}</H3>
            <ButtonGroup minimal>
              <Button icon={IconNames.DUPLICATE} />
              <Button icon={IconNames.TRASH} />
            </ButtonGroup>
          </Column>
        </Columns>
      </Card>
    </Column>
  ));
  return (
    <Fragment>
      <RouteTitle title="Brands" />
      <Navbar>
        <Container>
          <NavbarGroup>
            <Search
              searchTerm={search}
              onInputChange={value => setSearch(value)}
            />
          </NavbarGroup>
        </Container>
      </Navbar>
      <Container>
        <Columns mobile multiline style={{ marginTop: 10 }}>
          {items}
        </Columns>
      </Container>
    </Fragment>
  );
};

BrandList.propTypes = {
// eslint-disable-next-line react/no-unused-prop-types
  fetchBrands: PropTypes.func.isRequired,
  brands: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
};

BrandList.defaultProps = {};

export default attach(P)(BrandList);
