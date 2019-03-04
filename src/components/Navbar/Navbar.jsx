/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { withHandlers } from 'proppy';
import { attach } from 'proppy-react';
import { withRouter, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Auth from '../../services/auth';
import logo from '../../assets/img/sophia-logo.png';

const styles = () => ({
  appBar: {
    position: 'fixed',
  },
});

const P = withHandlers({
  logout: ({ history }) => () => {
    Auth.logout();
    history.push('/login');
  },
});

// eslint-disable-next-line no-unused-vars
const Navbar = ({ logout, classes }) => (
  <AppBar position="static" className={classes.appBar}>
    <Toolbar>
      <Typography style={{ flexGrow: 1 }}>
        <Link to="/" className="navbar-item">
          <img src={logo} alt="Sophia logo" style={{ height: 50 }} />
        </Link>
      </Typography>
      <Button color="inherit">
        <Link className="navbar-item" to="/brands" style={{ color: 'inherit', textDecoration: 'none' }}>Brands</Link>
      </Button>
      <Button color="inherit">
        <Link className="navbar-item" to="/categories" style={{ color: 'inherit', textDecoration: 'none' }}>Categories</Link>
      </Button>
      <Button color="inherit" onClick={logout}>Logout</Button>
    </Toolbar>
  </AppBar>
);

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

Navbar.defaultProps = {};

export default withStyles(styles)(withRouter(attach(P)(Navbar)));
