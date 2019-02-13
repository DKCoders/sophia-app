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
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ReactCrop from 'react-image-crop';
import uuidv4 from 'uuid/v4';
import api from '../../../services/api';
import { apiUrl } from '../../../config/paths';

function getCroppedImg(image, pixelCrop, fileName, fileUrl, setFileUrl, setBlob) {
  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        // reject(new Error('Canvas is empty'));
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function loadede() {
        const base64data = reader.result;
        // eslint-disable-next-line no-param-reassign
        blob.name = fileName;
        window.URL.revokeObjectURL(fileUrl);
        const newFileUrl = window.URL.createObjectURL(blob);
        setFileUrl(newFileUrl);
        setBlob(base64data);
        resolve(newFileUrl);
      };
    }, 'image/jpeg');
  });
}

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
  withState('src', 'setSrc', null),
  withState('imageRef', 'onImageLoaded', null),
  withState('fileUrl', 'setFileUrl', null),
  withState('croppedImageUrl', 'setCroppedImageUrl', null),
  withState('blob', 'setBlob', null),
  withState('crop', 'onCropChange', {
    aspect: 1,
    width: 50,
    x: 0,
    y: 0,
  }),
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
    onSelectFile: ({ setSrc }) => (event) => {
      if (event.target.files && event.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener('load', () => setSrc(reader.result));
        reader.readAsDataURL(event.target.files[0]);
      }
    },
    onCropComplete: ({
      imageRef, fileUrl, setFileUrl, setCroppedImageUrl, setBlob,
    }) => async (crop, pixelCrop) => {
      if (imageRef && crop.width && crop.height) {
        const croppedImageUrl = await getCroppedImg(
          imageRef,
          pixelCrop,
          'newFile.jpeg',
          fileUrl,
          setFileUrl,
          setBlob,
        );
        setCroppedImageUrl(croppedImageUrl);
      }
    },
    onSaveImageClick: ({ blob, setLogo }) => async (event) => {
      event.preventDefault();
      const name = uuidv4();

      const file = await api.uploadImg({
        base: blob,
        name,
      });
      setLogo(`${apiUrl}/imgs/${file}`);
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
  onSelectFile,
  src,
  crop,
  onImageLoaded,
  onCropChange,
  onCropComplete,
  croppedImageUrl,
  onSaveImageClick,
}) => (
  <>
    <Dialog open>
      <DialogTitle>Change Logo</DialogTitle>
      <DialogContent>
        <div>
          <div>
            <Input type="file" onChange={onSelectFile} />
          </div>
          {src && (
            <ReactCrop
              src={src}
              crop={crop}
              onImageLoaded={onImageLoaded}
              onChange={onCropChange}
              onComplete={onCropComplete}
            />
          )}
          {croppedImageUrl && (
            <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSaveImageClick}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
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
                <Button variant="outlined">Change logo</Button>
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
  </>
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
  loading: PropTypes.bool.isRequired,
};

const dummyFunc = () => {};
BrandForm.defaultProps = {
  brandId: null,
  onSaveComplete: null,
  onCancelClick: dummyFunc,
};

export default withStyles(styles)(attach(P)(BrandForm));
