import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState, withHandlers } from 'proppy';
import { attach } from 'proppy-react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import ReactCrop from 'react-image-crop';
import uuidv4 from 'uuid/v4';
import api from '../../services/api';
import { apiUrl } from '../../config/paths';

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
      reader.onloadend = () => {
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

const P = compose(
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
  withHandlers({
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
    onSaveImageClick: ({ blob, onSaveDone, onClose }) => async (event) => {
      event.preventDefault();
      const name = uuidv4();

      const file = await api.uploadImg({
        base: blob,
        name,
      });
      onSaveDone(`${apiUrl}/imgs/${file}`);
      onClose();
    },
  }),
);

const PhotoCropUpload = ({
  open,
  src,
  crop,
  croppedImageUrl,
  onSelectFile,
  onImageLoaded,
  onCropChange,
  onCropComplete,
  onSaveImageClick,
  onClose,
}) => (
  <Dialog open={open} onClose={onClose}>
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
);

PhotoCropUpload.propTypes = {
  open: PropTypes.bool.isRequired,
  crop: PropTypes.shape().isRequired,
  src: PropTypes.string,
  croppedImageUrl: PropTypes.string,
  onSelectFile: PropTypes.func.isRequired,
  onImageLoaded: PropTypes.func.isRequired,
  onCropChange: PropTypes.func.isRequired,
  onCropComplete: PropTypes.func.isRequired,
  onSaveImageClick: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  onSaveDone: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

PhotoCropUpload.defaultProps = {
  src: null,
  croppedImageUrl: null,
};

export default attach(P)(PhotoCropUpload);
