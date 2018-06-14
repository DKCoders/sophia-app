/* eslint-disable no-underscore-dangle,jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,max-len */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarItem,
  Control,
  Field,
  Input,
  Columns,
  Column,
  Image,
  Title,
  Subtitle,
  Media,
  MediaLeft,
  MediaContent,
  Level,
  LevelLeft,
  Icon,
  Box,
} from 'sophia-components';
import { compose, withState, withHandlers } from 'proppy';
import { attach } from 'proppy-react';
import RouteTitle from '../../../../components/RouteTitle/index';
import { filterByQuery } from '../../../../utils/helpers';

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
  const filtered = !search ? brands : brands.filter(filterByQuery(search));
  const items = filtered.map(brand => (
    <Column four key={brand._id}>
      <Box style={{ cursor: 'pointer' }} onClick={() => goTo(brand._id)}>
        <Media>
          <MediaLeft>
            <Image src={brand.logo} square="64" alt="brand logo" />
          </MediaLeft>
          <MediaContent>
            <Title six>{brand.name}</Title>
            <Subtitle six style={{ fontSize: '0.85rem' }}>{brand.code}</Subtitle>
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
      </Box>
    </Column>
  ));
  return (
    <Fragment>
      <RouteTitle title="Brands" />
      <Navbar dark>
        <Container>
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