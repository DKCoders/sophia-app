/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
} from 'sophia-components';
import { withHandlers } from 'proppy';
import { attach } from 'proppy-react';
import { Navbar as NavbarBlu, NavbarGroup, Button, Classes } from '@blueprintjs/core';
import { withRouter, Link } from 'react-router-dom';
import Auth from '../services/auth';
import logo from '../assets/img/sophia-logo.png';

const P = withHandlers({
  logout: ({ history }) => () => {
    Auth.logout();
    history.push('/login');
  },
});

// eslint-disable-next-line no-unused-vars
const Navbar = ({ logout }) => (
  <NavbarBlu>
    <Container>
      <NavbarGroup>
        <Link to="/" className={Classes.NAVBAR_HEADING} style={{ height: '100%' }}>
          <img src={logo} alt="Sophia logo" style={{ height: '100%' }} />
        </Link>
      </NavbarGroup>
      <NavbarGroup>
        <Link className="navbar-item" to="/brands">Brands</Link>
        <Button minimal onClick={logout}>
            Logout
        </Button>
      </NavbarGroup>
    </Container>
  </NavbarBlu>
);

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

Navbar.defaultProps = {};

export default withRouter(attach(P)(Navbar));
