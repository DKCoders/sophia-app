/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
// import PropTypes from 'prop-types';
import {
  Menu,
  MenuLabel,
  MenuList,
} from 'sophia-components';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <Menu>
    <MenuLabel>Masters</MenuLabel>
    <MenuList>
      <Link to="/brands">Brands</Link>
    </MenuList>
  </Menu>
);

Sidebar.propTypes = {};

Sidebar.defaultProps = {};

export default Sidebar;
