import React from 'react';
// import PropTypes from 'prop-types';
import {
  Menu,
  MenuLabel,
  MenuList,
  MenuListItem,
} from 'sophia-components';

const Sidebar = () => (
  <Menu>
    <MenuLabel>Masters</MenuLabel>
    <MenuList>
      <MenuListItem>Brands</MenuListItem>
    </MenuList>
  </Menu>
);

Sidebar.propTypes = {};

Sidebar.defaultProps = {};

export default Sidebar;
