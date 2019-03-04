import React from 'react';
import PropTypes from 'prop-types';
import {
  withStateHandlers, compose, didSubscribe, withHandlers, withState,
} from 'proppy';
import { attach } from 'proppy-react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { mapValidationByType, validations, validationsMessages } from '../../../utils/helpers';

const styles = () => ({
  logo: {
    marginTop: 5,
    width: 80,
    height: 80,
  },
  progressButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  progressButtonWrapper: {
    position: 'relative',
  },
});

const textFieldProps = {
  margin: 'normal',
  variant: 'outlined',
  fullWidth: true,
};

const fieldValidations = {
  username: ['required'],
  email: ['required'],
};

const mappedByValidationTypeEntries = mapValidationByType(fieldValidations);

const P = compose(
  withState('loading', 'setLoading', false),
  withState('generalError', 'setGeneralError', null),
  withStateHandlers({
    username: '',
    email: '',
    name: '',
  }, {
    setInitial: ({
      username, email, name,
    }) => initial => ({
      username, email, name, ...initial,
    }),
    onChange: () => ({ target: { name, value } }) => ({ [name]: value }),
  }),
  withStateHandlers({
    dirty: [],
  }, {
    pushDirty: ({ dirty }) => name => ({ dirty: [...dirty, name] }),
  }),
  withStateHandlers({
    errors: {},
  }, {
    checkErrors: props => () => {
      const errors = mappedByValidationTypeEntries.reduce((acum, [type, keys]) => {
        keys.forEach((key) => {
          if (!validations[type](props[key])) {
            // eslint-disable-next-line no-param-reassign
            acum[key] = validationsMessages[type];
          }
        });
        return acum;
      }, {});
      return { errors };
    },
  }),
  withHandlers({
    checkDirty: ({ pushDirty, dirty }) => ({ target: { name } }) => {
      if (!dirty.includes(name)) {
        pushDirty(name);
      }
    },
    validationHook: ({ onChange, checkErrors, checkDirty }) => (...params) => {
      onChange(...params);
      checkDirty(...params);
      checkErrors();
    },
  }),
  withHandlers({
    onSaveClick: ({
      itemId, username, email, name, setLoading, onSaveComplete, setGeneralError,
    }, { dispatch }) => () => {
      const resolve = (redirectId) => {
        setLoading(false);
        if (onSaveComplete) onSaveComplete(redirectId);
      };
      const reject = (err) => {
        setLoading(false);
        const errMessage = err.response.data.message;
        const message = !errMessage.includes('E11000') ? errMessage : 'Duplicated code';
        setGeneralError(message);
      };
      setLoading(true);
      dispatch.user.patchUser({
        userId: itemId,
        patch: {
          username, email, name,
        },
        resolve,
        reject,
      });
    },
  }),
  didSubscribe(({ initial, setInitial }) => { setInitial(initial); }),
);

const UserForm = ({
  classes,
  username,
  email,
  name,
  validationHook,
  onSaveClick,
  loading,
  onCancelClick,
  errors,
  generalError,
  dirty,
}) => (
  <Card>
    <CardContent>
      <TextField
        label="Username"
        value={username}
        name="username"
        required
        onChange={validationHook}
        error={!!dirty.username && !!errors.username}
        helperText={!!dirty.username && !!errors.username && errors.username}
        {...textFieldProps}
      />
      <TextField
        label="Email"
        value={email}
        name="email"
        required
        onChange={validationHook}
        error={!!dirty.email && !!errors.email}
        helperText={!!dirty.email && !!errors.email && errors.email}
        {...textFieldProps}
      />
      <TextField
        label="Name"
        value={name}
        name="name"
        onChange={validationHook}
        {...textFieldProps}
      />
      {!!generalError && <Typography color="error">{generalError}</Typography>}
    </CardContent>
    <CardActions>
      <Button onClick={onCancelClick}>Cancel</Button>
      <div style={{ position: 'relative' }}>
        <Button variant="contained" color="primary" onClick={onSaveClick} disabled={loading || !!Object.keys(errors).length || !dirty.length}>Save</Button>
        {loading && <CircularProgress size={24} color="primary" className={classes.progressButton} />}
      </div>
    </CardActions>
  </Card>
);

UserForm.propTypes = {
  initial: PropTypes.shape().isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  itemId: PropTypes.string,
  onSaveComplete: PropTypes.func,
  onCancelClick: PropTypes.func,
  onSaveClick: PropTypes.func.isRequired,
  validationHook: PropTypes.func.isRequired,
  onChangeLogoClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const dummyFunc = () => {};
UserForm.defaultProps = {
  itemId: null,
  onSaveComplete: null,
  onCancelClick: dummyFunc,
};

export default withStyles(styles)(attach(P)(UserForm));
