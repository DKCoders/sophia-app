/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withHandlers } from 'proppy';
import { attach } from 'proppy-react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as brandSelectors from '../../../../modules/brand/selectors';

const styles = () => ({
  logo: {
    height: 200,
    width: 200,
  },
});

const P = withHandlers({
  onSaveClick: ({
    brand: { _id: brandId },
  }, { dispatch }) => (value, data, resolve, reject) => dispatch.brand.patchBrand({
    brandId, patch: { [data]: value }, resolve, reject,
  }),
});

const BrandView = ({
  brand, classes,
}) => (!brand ? null : (
  <>
    <IconButton component={Link} to="/brands"><ArrowBackIcon /></IconButton>
    <Typography variant="h2">Brand</Typography>
    <Avatar alt="Brand logo" src={brand.logo} className={classes.logo} />
    <Typography variant="h4">{brand.code}</Typography>
    <Typography variant="h3">{brand.name}</Typography>
    <Typography variant="h6">
      Origin:
      {brand.origin}
    </Typography>
    <Typography>{brand.description}</Typography>
    <Fab color="secondary" aria-label="Edit" component={Link} to={`/brands/${brand._id}/edit`}>
      <EditIcon />
    </Fab>
  </>
));

BrandView.propTypes = {
  classes: PropTypes.shape().isRequired,
  brand: PropTypes.shape(),
  onSaveClick: PropTypes.func.isRequired,
};

BrandView.defaultProps = {
  brand: null,
};

const mapStateToProps = (state, { match: { params: { id } } }) => ({
  brand: brandSelectors.brandById(state, { id }),
});

export default withStyles(styles)(connect(mapStateToProps)(attach(P)(BrandView)));
