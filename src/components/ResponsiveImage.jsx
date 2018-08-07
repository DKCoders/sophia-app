import React from 'react';
import PropTypes from 'prop-types';
import { classNameJoiner } from '../utils/helpers';

const ResponsiveImage = ({ url, className }) => (
  <div style={{ backgroundImage: `url(${url})` }} className={classNameJoiner('responsive-image', className)} />
);

ResponsiveImage.propTypes = {
  url: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ResponsiveImage.defaultProps = {
  className: null,
};

export default ResponsiveImage;
