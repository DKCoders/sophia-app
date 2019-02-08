import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const RouteTitle = ({ title }) => (
  <Typography variant="h1">{title}</Typography>
);

RouteTitle.propTypes = {
  title: PropTypes.node.isRequired,
};

RouteTitle.defaultProps = {};

export default RouteTitle;
