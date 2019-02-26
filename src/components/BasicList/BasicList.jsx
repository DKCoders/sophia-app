import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  compose, withState, withHandlers, withStateHandlers,
} from 'proppy';
import { attach } from 'proppy-react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import RouteTitle from '../RouteTitle';
import ListCard from '../ListCard';
import { filterByQuery } from '../../utils/helpers';
import confirmDialog from '../../services/confirmDialog';

const P = compose(
  withState('search', 'setSearch', ''),
  withStateHandlers({ menuAnchor: null, item: null }, {
    openMenu: () => (item, { currentTarget }) => ({ item, menuAnchor: currentTarget }),
    closeMenu: () => () => ({ item: null, menuAnchor: null }),
  }),
  withHandlers({
    goTo: ({
      history, closeMenu, item, mainRoute,
    }) => (suffix = '') => {
      history.push(`/${mainRoute}/${item._id}${suffix}`);
      closeMenu();
    },
    detailTo: ({ goTo }) => () => goTo(),
    editTo: ({ goTo }) => () => goTo('/edit'),
    cloneTo: ({ goTo }) => () => goTo('/clone'),
    onDeleteClick: ({ item, closeMenu, onRemove }) => async () => {
      const confirm = await confirmDialog.show({
        title: 'Confirmation',
        content: `Are you sure in deleting "${item.name}"?`,
        confirmText: 'Delete it!',
        cancelText: 'No',
      });
      if (confirm && onRemove) {
        onRemove(item);
        // dispatch.brand.removeBrand({ brandId: item._id });
      }
      closeMenu();
    },
    onClickCard: ({ history, closeMenu, mainRoute }) => ({ _id }) => {
      history.push(`/${mainRoute}/${_id}`);
      closeMenu();
    },
  }),
);

const BasicList = ({
  items,
  search,
  setSearch,
  openMenu,
  menuAnchor,
  closeMenu,
  editTo,
  detailTo,
  cloneTo,
  onDeleteClick,
  onClickCard,
  properties: {
    title, subtitle, avatarSrc, avatarAlt,
  },
  routeTitle,
  mainRoute,
}) => {
  const filtered = !search ? items : items.filter(filterByQuery(search));
  const listItems = filtered.map(item => (
    <Grid item md={3} key={item._id}>
      <ListCard
        item={item}
        title={!!title && item[title]}
        subtitle={!!subtitle && item[subtitle]}
        onClick={onClickCard}
        avatarSrc={!!avatarSrc && item[avatarSrc]}
        avatarAlt={!!avatarAlt && item[avatarAlt]}
        onMoreClick={openMenu}
      />
    </Grid>
  ));
  return (
    <Fragment>
      <RouteTitle title={routeTitle} />
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
        {listItems}
      </Grid>
      <Fab color="secondary" aria-label="Edit" component={Link} to={`/${mainRoute}/new`}>
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

BasicList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  detailTo: PropTypes.func.isRequired,
  editTo: PropTypes.func.isRequired,
  cloneTo: PropTypes.func.isRequired,
  openMenu: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onClickCard: PropTypes.func.isRequired,
  // eslint-disable-next-line
  onRemove: PropTypes.func,
  menuAnchor: PropTypes.shape(),
  mainRoute: PropTypes.string.isRequired,
  routeTitle: PropTypes.string.isRequired,
  properties: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    avatarSrc: PropTypes.string.isRequired,
    avatarAlt: PropTypes.string.isRequired,
  }),
};

const dummyObj = {};
BasicList.defaultProps = {
  menuAnchor: null,
  onRemove: null,
  properties: dummyObj,
};

export default attach(P)(BasicList);
