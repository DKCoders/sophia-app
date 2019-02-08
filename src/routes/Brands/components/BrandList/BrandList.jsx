/* eslint-disable no-underscore-dangle,jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,max-len */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  compose, withState, withHandlers, withStateHandlers,
} from 'proppy';
import { attach } from 'proppy-react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import RouteTitle from '../../../../components/RouteTitle/index';
import { filterByQuery } from '../../../../utils/helpers';
import { brandsAsArray } from '../../../../modules/brand/selectors';
import BrandCard from './components/BrandCard';

const P = compose(
  withState('search', 'setSearch', ''),
  withStateHandlers({ menuAnchor: null, item: null }, {
    openMenu: () => (item, { currentTarget }) => ({ item, menuAnchor: currentTarget }),
    closeMenu: () => () => ({ item: null, menuAnchor: null }),
  }),
  withHandlers({
    goTo: ({ history, closeMenu, item }) => () => {
      history.push(`/brands/${item.id}`);
      closeMenu();
    },
  }),
);


// TODO: fix goTo
const BrandList = ({
  brands, search, setSearch, goTo, openMenu, menuAnchor, closeMenu,
}) => {
  const filtered = !search ? brands : brands.filter(filterByQuery(search));
  const items = filtered.map(brand => (
    <Grid item md={3} key={brand._id}>
      <BrandCard brand={brand} onMoreClick={openMenu} />
    </Grid>
  ));
  return (
    <Fragment>
      <RouteTitle title="Brands" onClick={goTo} />
      <Grid container>
        <Grid item md={12}>
          <TextField
            label="Search..."
            type="search"
            margin="normal"
            onChange={({ target: { value } }) => setSearch(value)}
            value={search}
          />
        </Grid>
      </Grid>
      <Grid container spacing={8}>
        {items}
      </Grid>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
      >
        <MenuItem onClick={goTo}>Details</MenuItem>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Clone</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>
    </Fragment>
  );
};

BrandList.propTypes = {
  brands: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
  openMenu: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
  menuAnchor: PropTypes.shape(),
};

BrandList.defaultProps = {
  menuAnchor: null,
};

const mapStateToProps = state => ({
  brands: brandsAsArray(state),
});

export default connect(mapStateToProps)(attach(P)(BrandList));
