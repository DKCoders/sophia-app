import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  compose, withStateHandlers, didSubscribe, withHandlers,
} from 'proppy';
import { attach } from 'proppy-react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Auth from '../../services/auth';
import logo from '../../assets/img/sophia-logo.png';

const initialState = {
  isLogged: false, username: '', password: '', error: false,
};
const stateHandlers = {
  onInputChange: () => ({ target: { name, value } }) => ({ [name]: value }),
  setError: () => () => ({ username: '', password: '', error: true }),
  checkToken: () => () => {
    if (Auth.getToken()) {
      return { isLogged: true };
    }
    return {};
  },
};
const handlers = {
  onLoginClick: ({
    checkToken,
    setError,
    username,
    password,
  }) => async (event) => {
    event.preventDefault();
    if (await Auth.login({ username, password })) {
      checkToken();
    } else {
      setError();
    }
  },
};

const P = compose(
  withStateHandlers(initialState, stateHandlers),
  withHandlers(handlers),
  didSubscribe(({ checkToken }) => checkToken()),
);

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

const Login = ({
  isLogged, username, password, onLoginClick, onInputChange, classes, error,
}) => {
  const redirect = !isLogged ? null : <Redirect to="/" />;
  const errorNotification = !error ? null : (
    <Typography color="error">
      Username, Email and Password incorrect.
    </Typography>
  );
  const nodes = (
    <div className={classes.main}>
      {redirect}
      <img src={logo} alt="Login img" ratio="2by1" />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Username or Email Address</InputLabel>
            <Input
              id="email"
              name="username"
              autoComplete="email"
              autoFocus
              onChange={onInputChange}
              value={username}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={onInputChange} value={password} />
          </FormControl>
          {errorNotification}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onLoginClick}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </div>
  );
  return ReactDOM.createPortal(nodes, document.getElementById('portal'));
};

Login.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

export default attach(P)(withStyles(styles)(Login));
