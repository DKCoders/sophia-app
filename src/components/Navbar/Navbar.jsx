/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Navbar as NavbarSophia,
  NavbarBrand,
  NavbarMenu,
  NavbarEnd,
  NavbarItem,
  Container,
} from 'sophia-components';
import { withHandlers } from 'proppy';
import { attach } from 'proppy-react';
import { withRouter, Link } from 'react-router-dom';
import Auth from '../../services/auth';

const P = withHandlers({
  logout: ({ history }) => () => {
    Auth.logout();
    history.push('/login');
  },
});

// eslint-disable-next-line no-unused-vars
const Navbar = ({ logout }) => (
  <NavbarSophia black>
    <Container fluid>
      <NavbarBrand>
        <Link to="/" className="navbar-item">
          <img src="/static/img/sophia-logo.png" alt="Sophia logo" />
        </Link>
      </NavbarBrand>
      <NavbarMenu>
        <NavbarEnd>
          <NavbarItem onClick={logout}>
              Logout
          </NavbarItem>
        </NavbarEnd>
      </NavbarMenu>
    </Container>
  </NavbarSophia>
);

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

Navbar.defaultProps = {};

export default withRouter(attach(P)(Navbar));
