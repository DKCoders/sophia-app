/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { connect } from 'react-redux';
import BasicInfo from '../BasicInfo';
import * as brandSelectors from '../../modules/brand/selectors';

const BrandView = ({ brand }) => (!brand ? null : (
  <>
    <IconButton component={Link} to="/brands"><ArrowBackIcon /></IconButton>
    <BasicInfo
      routeTitle="Brand"
      avatarSrc={brand.logo}
      avatarAlt="Brand logo"
      title={brand.code}
      subtitle={brand.name}
      additionalNodes={(
        <>
          <Typography variant="h6">
            Origin:
            {brand.origin}
          </Typography>
          <Typography>{brand.description}</Typography>
        </>
      )}
    />
    <Fab color="secondary" aria-label="Edit" component={Link} to={`/brands/${brand._id}/edit`}>
      <EditIcon />
    </Fab>
  </>
));

BrandView.propTypes = {
  brand: PropTypes.shape(),
  onSaveClick: PropTypes.func.isRequired,
};

BrandView.defaultProps = {
  brand: null,
};

const mapStateToProps = (state, { match: { params: { id } } }) => ({
  brand: brandSelectors.brandById(state, { id }),
});

export default connect(mapStateToProps)(BrandView);
