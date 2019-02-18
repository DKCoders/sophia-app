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
import photoCropUpload from '../../../services/photoCropUpload';

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

const P = compose(
  withState('loading', 'setLoading', false),
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
  withHandlers({
    onChangeLogoClick: ({ setLogo }) => async () => {
      const url = await photoCropUpload.show();
      if (url) setLogo(url);
    },
    onSaveClick: ({
      brandId, code, name, description, origin, logo, setLoading, onSaveComplete,
    }, { dispatch }) => () => {
      const resolve = () => {
        setLoading(false);
        if (onSaveComplete) onSaveComplete();
      };
      const reject = resolve;
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
  onChange,
  onSaveClick,
  loading,
  onCancelClick,
  onChangeLogoClick,
}) => (
  <Card>
    <CardContent>
      <TextField
        label="Code"
        value={code}
        name="code"
        required
        onChange={onChange}
        {...textFieldProps}
      />
      <TextField
        label="Name"
        value={name}
        name="name"
        required
        onChange={onChange}
        {...textFieldProps}
      />
      <TextField
        label="Origin"
        value={origin}
        name="origin"
        onChange={onChange}
        {...textFieldProps}
      />
      <TextField
        label="Description"
        value={description}
        name="description"
        multiline
        onChange={onChange}
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
    </CardContent>
    <CardActions>
      <Button onClick={onCancelClick}>Cancel</Button>
      <div style={{ position: 'relative' }}>
        <Button variant="contained" color="primary" onClick={onSaveClick} disabled={loading}>Save</Button>
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
  onChange: PropTypes.func.isRequired,
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
