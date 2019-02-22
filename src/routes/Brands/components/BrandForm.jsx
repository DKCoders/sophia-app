import React from 'react';
import PropTypes from 'prop-types';
import {
  withStateHandlers, compose, didSubscribe, withHandlers, withState,
} from 'proppy';
import { attach } from 'proppy-react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import photoCropUpload from '../../../services/photoCropUpload';
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
  code: ['required'],
  name: ['required'],
};

const mappedByValidationTypeEntries = mapValidationByType(fieldValidations);

const P = compose(
  withState('loading', 'setLoading', false),
  withState('generalError', 'setGeneralError', null),
  withStateHandlers({
    code: '',
    name: '',
    description: '',
    origin: '',
    logo: '',
  }, {
    setInitial: ({
      code, name, description, origin, logo,
    }) => initial => ({
      code, name, description, origin, logo, ...initial,
    }),
    onChange: () => ({ target: { name, value } }) => ({ [name]: value }),
    setLogo: () => logo => ({ logo }),
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
    onChangeLogoClick: ({ setLogo, checkDirty }) => async () => {
      const url = await photoCropUpload.show();
      if (url) {
        setLogo(url);
        checkDirty({ target: { name: 'logo' } });
      }
    },
    onSaveClick: ({
      brandId, code, name, description, origin, logo, setLoading, onSaveComplete, setGeneralError,
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
      dispatch.brand.patchBrand({
        brandId,
        patch: {
          code, name, description, origin, logo,
        },
        resolve,
        reject,
      });
    },
  }),
  didSubscribe(({ initial, setInitial }) => { setInitial(initial); }),
);

const BrandForm = ({
  classes,
  code,
  name,
  description,
  origin,
  logo,
  validationHook,
  onSaveClick,
  loading,
  onCancelClick,
  onChangeLogoClick,
  errors,
  generalError,
  dirty,
}) => (
  <Card>
    <CardContent>
      <TextField
        label="Code"
        value={code}
        name="code"
        required
        onChange={validationHook}
        error={!!dirty.code && !!errors.code}
        helperText={!!dirty.code && !!errors.code && errors.code}
        {...textFieldProps}
      />
      <TextField
        label="Name"
        value={name}
        name="name"
        required
        onChange={validationHook}
        error={!!dirty.name && !!errors.name}
        helperText={!!dirty.name && !!errors.name && errors.name}
        {...textFieldProps}
      />
      <TextField
        label="Origin"
        value={origin}
        name="origin"
        onChange={validationHook}
        {...textFieldProps}
      />
      <TextField
        label="Description"
        value={description}
        name="description"
        multiline
        onChange={validationHook}
        {...textFieldProps}
      />
      <FormControl variant="outlined">
        <InputLabel variant="outlined" shrink filled>Logo</InputLabel>
        <InputBase
          inputComponent={() => (
            <div>
              <img src={logo} alt="initial-logo" className={classes.logo} />
              <Button variant="outlined" onClick={onChangeLogoClick}>Change logo</Button>
            </div>
          )}
        />
      </FormControl>
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

BrandForm.propTypes = {
  initial: PropTypes.shape().isRequired,
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  brandId: PropTypes.string,
  onSaveComplete: PropTypes.func,
  onCancelClick: PropTypes.func,
  onSaveClick: PropTypes.func.isRequired,
  validationHook: PropTypes.func.isRequired,
  onChangeLogoClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const dummyFunc = () => {};
BrandForm.defaultProps = {
  brandId: null,
  onSaveComplete: null,
  onCancelClick: dummyFunc,
};

export default withStyles(styles)(attach(P)(BrandForm));
