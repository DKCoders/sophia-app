/* eslint-disable no-underscore-dangle,jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,max-len */
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
  Box,
} from 'sophia-components';
import { compose, didSubscribe, withState, withHandlers } from 'proppy';
import { attach } from 'proppy-react';
import RouteTitle from '../../../../components/RouteTitle/index';
import { filterByQuery } from '../../../../utils/helpers';

const P = compose(
  withState('search', 'setSearch', ''),
  withHandlers({
    goTo: ({ history }) => (id) => {
      console.log(history);
      history.push(`/brands/${id}`);
    },
  }),
  didSubscribe(({ fetchBrands }) => fetchBrands()),
);

const BrandList = ({
  brands, search, setSearch, goTo,
}) => {
  const filtered = !search ? brands : brands.filter(filterByQuery(search));
  const items = filtered.map(brand => (
    <Column four key={brand._id}>
      <Box style={{ cursor: 'pointer' }}>
        <Media onClick={() => goTo(brand._id)}>
          <MediaLeft>
            <Image src={brand.logo} square="64" alt="brand logo" />
          </MediaLeft>
          <MediaContent>
            <Content>
              <Title six>{brand.name}</Title>
            </Content>
            <Level>
              <LevelLeft>
                <a className="level-item" onClick={() => goTo(brand._id)}>
                  <Icon icon="fas fa-clone" />
                </a>
                <a className="level-item">
                  <Icon icon="fas fa-trash" />
                </a>
              </LevelLeft>
            </Level>
          </MediaContent>
        </Media>
      </Box>
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
