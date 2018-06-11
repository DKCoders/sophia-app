/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  Control,
  Field,
  Input,
  Columns,
  Column,
  Card,
  CardImage,
  CardContent,
  Image,
  Content,
  Title,
} from 'sophia-components';
import { compose, didSubscribe, withState } from 'proppy';
import { attach } from 'proppy-react';
import RouteTitle from '../../components/RouteTitle';
import { filterByQuery } from '../../utils/helpers';

const P = compose(
  withState('search', 'setSearch', ''),
  didSubscribe(({ fetchBrands }) => fetchBrands()),
);

const Brands = ({ brands, search, setSearch }) => {
  const filtered = !search ? brands : brands.filter(filterByQuery(search));
  const items = filtered.map(brand => (
    <Column three key={brand._id}>
      <Card>
        <CardImage>
          <Image src={brand.logo} ratio="square" alt="brand logo" />
        </CardImage>
        <CardContent>
          <Content>
            <Title textCentered six>{brand.name}</Title>
          </Content>
        </CardContent>
      </Card>
    </Column>
  ));
  return (
    <Fragment>
      <RouteTitle title="Brands" />
      <Navbar dark>
        <NavbarBrand>
          <NavbarItem as="div">
            <Field>
              <Control>
                <Input
                  placeholder="Search..."
                  value={search}
                  onChange={({ target: { value } }) => setSearch(value)}
                />
              </Control>
            </Field>
          </NavbarItem>
        </NavbarBrand>
      </Navbar>
      <Columns mobile multiline style={{ marginTop: 10 }}>
        {items}
      </Columns>
    </Fragment>
  );
};

Brands.propTypes = {
// eslint-disable-next-line react/no-unused-prop-types
  fetchBrands: PropTypes.func.isRequired,
  brands: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

Brands.defaultProps = {};

export default attach(P)(Brands);
