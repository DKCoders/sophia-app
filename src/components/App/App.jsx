import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Navbar from '../Navbar';
import PrivateRoute from '../PrivateRoute';
import Login from '../../routes/Login';
import Dashboard from '../../routes/Dashboard';
import Brands from '../../routes/Brands';
import Categories from '../../routes/Categories';
import Users from '../../routes/Users';

const styles = theme => ({
  mainContainer: {
    paddingTop: 60,
    overflowY: 'auto',
    overflowX: 'hidden',
    [theme.breakpoints.up('sm')]: {
      overflow: 'inherit',
    },
  },
  wrapper: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing.unit * 2,
      marginLeft: theme.spacing.unit * 2,
    },
  },
  wrapperHeight: {
    height: '100%',
  },
});

const App = ({ location, classes }) => (
  <Fragment>
    <CssBaseline />
    {location.pathname !== '/login' && <Navbar />}
    <Route path="/login" component={Login} />
    <div className={classes.mainContainer}>
      <div className={`${classes.wrapper} ${classes.wrapperHeight}`}>
        <Grid container spacing={16} className={classes.wrapperHeight}>
          <Grid item md={12} className={classes.wrapperHeight}>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/brands" component={Brands} />
            <PrivateRoute path="/categories" component={Categories} />
            <PrivateRoute path="/users" component={Users} />
          </Grid>
        </Grid>
      </div>
    </div>
  </Fragment>
);

App.propTypes = {
  location: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
};

App.defaultProps = {};

export default withStyles(styles)(withRouter(App));
