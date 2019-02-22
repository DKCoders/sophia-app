import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withHandlers } from 'proppy';
import { attach } from 'proppy-react';
import * as brandSelectors from '../../../modules/brand/selectors';
import BrandForm from './BrandForm';

const P = withHandlers({
  onSaveComplete: ({ history, brand }) => (redirectId = null) => {
    history.replace(`/brands/${redirectId || brand._id}`);
  },
  onCancelClick: ({ history, brand, isNew }) => () => {
    history.replace(`/brands/${isNew ? '' : brand._id}`);
  },
});

const BrandEdit = ({
  brand, onSaveComplete, isClone, isNew, onCancelClick,
}) => (
  <Grid container justify="center">
    <Grid item>
      <Typography variant="h2" align="center">Edit Brand</Typography>
      {!brand ? <CircularProgress /> : (
        <BrandForm
          initial={brand}
          brandId={!isClone && !isNew ? brand._id : null}
          onCancelClick={onCancelClick}
          onSaveComplete={onSaveComplete}
        />
      )}
    </Grid>
  </Grid>
);

BrandEdit.propTypes = {
  brand: PropTypes.shape(),
  onSaveComplete: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  isClone: PropTypes.bool,
  isNew: PropTypes.bool,
};

BrandEdit.defaultProps = {
  brand: null,
  isClone: false,
  isNew: false,
};

const newBrand = {
  code: '',
  name: '',
  description: '',
  origin: '',
  logo: '',
};

const mapStateToProps = (state, { match: { params: { id } }, isNew }) => ({
  brand: !isNew ? brandSelectors.brandById(state, { id }) : newBrand,
});

export default connect(mapStateToProps)(attach(P)(BrandEdit));
