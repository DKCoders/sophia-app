import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const ConfirmDialog = ({
  open, onCancel, onConfirm, title, content, cancelText, confirmText,
}) => (
  <Dialog
    open={open}
    onClose={onCancel}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {content}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="primary">
        {cancelText}
      </Button>
      <Button onClick={onConfirm} color="primary" autoFocus>
        {confirmText}
      </Button>
    </DialogActions>
  </Dialog>
);

ConfirmDialog.propTypes = {
  title: PropTypes.node,
  content: PropTypes.node,
  cancelText: PropTypes.node,
  confirmText: PropTypes.node,
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

const dummyFunc = () => {};
ConfirmDialog.defaultProps = {
  title: 'Confirmation Dialog',
  content: 'Are you sure of perform this action?',
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  open: false,
  onCancel: dummyFunc,
  onConfirm: dummyFunc,
};

export default ConfirmDialog;
