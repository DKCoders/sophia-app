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
  onSaveComplete: ({ history, brand }) => () => {
    history.replace(`/brands/${brand._id}`);
  },
});

const BrandEdit = ({ brand, onSaveComplete }) => (
  <Grid container justify="center">
    <Grid item>
      <Typography variant="h2" align="center">Edit Brand</Typography>
      {!brand ? <CircularProgress /> : (
        <BrandForm
          initial={brand}
          brandId={brand._id}
          onCancelClick={onSaveComplete}
          onSaveComplete={onSaveComplete}
        />
      )}
    </Grid>
  </Grid>
);

BrandEdit.propTypes = {
  brand: PropTypes.shape(),
  onSaveComplete: PropTypes.func.isRequired,
};

BrandEdit.defaultProps = {
  brand: null,
};

const mapStateToProps = (state, { match: { params: { id } } }) => ({
  brand: brandSelectors.brandById(state, { id }),
});

export default connect(mapStateToProps)(attach(P)(BrandEdit));
