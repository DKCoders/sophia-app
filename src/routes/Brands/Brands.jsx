/* eslint-disable no-underscore-dangle,jsx-a11y/anchor-is-valid */
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
  Image,
  Content,
  Title,
  Media,
  MediaLeft,
  MediaContent,
  Level,
  LevelLeft,
  Icon,
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
    <Column four key={brand._id}>
      <Media>
        <MediaLeft>
          <Image src={brand.logo} square="64" alt="brand logo" />
        </MediaLeft>
        <MediaContent>
          <Content>
            <Title six>{brand.name}</Title>
          </Content>
          <Level>
            <LevelLeft>
              <a className="level-item">
                <Icon icon="fas fa-clone" />
              </a>
              <a className="level-item">
                <Icon icon="fas fa-trash" />
              </a>
            </LevelLeft>
          </Level>
        </MediaContent>
      </Media>
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
