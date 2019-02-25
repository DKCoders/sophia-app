/* eslint-disable no-underscore-dangle,jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,max-len */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  compose, withState, withHandlers, withStateHandlers,
} from 'proppy';
import { attach } from 'proppy-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RouteTitle from '../../../../components/RouteTitle/index';
import BrandCard from './components/BrandCard';
import { filterByQuery } from '../../../../utils/helpers';
import { brandsAsArray } from '../../../../modules/brand/selectors';
import confirmDialog from '../../../../services/confirmDialog';

const P = compose(
  withState('search', 'setSearch', ''),
  withStateHandlers({ menuAnchor: null, item: null }, {
    openMenu: () => (item, { currentTarget }) => ({ item, menuAnchor: currentTarget }),
    closeMenu: () => () => ({ item: null, menuAnchor: null }),
  }),
  withHandlers({
    goTo: ({ history, closeMenu, item }) => (suffix = '') => {
      history.push(`/brands/${item._id}${suffix}`);
      closeMenu();
    },
    detailTo: ({ goTo }) => () => goTo(),
    editTo: ({ goTo }) => () => goTo('/edit'),
    cloneTo: ({ goTo }) => () => goTo('/clone'),
    onDeleteClick: ({ item, closeMenu }, { dispatch }) => async () => {
      const confirm = await confirmDialog.show({
        title: 'Confirmation',
        content: `Are you sure in deleting "${item.name}"?`,
        confirmText: 'Delete it!',
        cancelText: 'No',
      });
      if (confirm) {
        dispatch.brand.removeBrand({ brandId: item._id });
      }
      closeMenu();
    },
    onClickCard: ({ history, closeMenu }) => ({ _id }) => {
      history.push(`/brands/${_id}`);
      closeMenu();
    },
  }),
);


// TODO: fix goTo
const BrandList = ({
  brands, search, setSearch, openMenu, menuAnchor, closeMenu, editTo, detailTo, cloneTo, onDeleteClick, onClickCard,
}) => {
  const filtered = !search ? brands : brands.filter(filterByQuery(search));
  const items = filtered.map(brand => (
    <Grid item md={3} key={brand._id}>
      <BrandCard brand={brand} onMoreClick={openMenu} onClick={onClickCard} />
    </Grid>
  ));
  return (
    <Fragment>
      <RouteTitle title="Brands" />
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
      <Fab color="secondary" aria-label="Edit" component={Link} to="/brands/new">
        <AddIcon />
      </Fab>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
      >
        <MenuItem onClick={detailTo}>Details</MenuItem>
        <MenuItem onClick={editTo}>Edit</MenuItem>
        <MenuItem onClick={cloneTo}>Clone</MenuItem>
        <MenuItem onClick={onDeleteClick}>Delete</MenuItem>
      </Menu>
    </Fragment>
  );
};

BrandList.propTypes = {
  brands: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  detailTo: PropTypes.func.isRequired,
  editTo: PropTypes.func.isRequired,
  cloneTo: PropTypes.func.isRequired,
  openMenu: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onClickCard: PropTypes.func.isRequired,
  menuAnchor: PropTypes.shape(),
};

BrandList.defaultProps = {
  menuAnchor: null,
};

const mapStateToProps = state => ({
  brands: brandsAsArray(state),
});

export default connect(mapStateToProps)(attach(P)(BrandList));
