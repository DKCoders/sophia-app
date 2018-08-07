/* eslint-disable no-underscore-dangle,jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,max-len */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Container, Columns, Column } from 'sophia-components';
import { Navbar, NavbarGroup } from '@blueprintjs/core';
import { compose, withState, withHandlers } from 'proppy';
import { attach } from 'proppy-react';
import RouteTitle from '../../../../components/RouteTitle';
import ContentCard from '../../../../components/ContentCard';
import Search from '../../../../components/Search';
import ResponsiveImage from '../../../../components/ResponsiveImage';
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
      <ContentCard
        data={brand._id}
        onClick={goTo}
        title={brand.name}
        subtitle={brand.code}
        image={<ResponsiveImage url={brand.logo} />}
      />
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
