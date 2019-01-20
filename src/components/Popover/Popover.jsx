import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'sophia-components';
import './popover.sass';

const Popover = ({
  children, active, top, left,
}) => (!active || !top || !left ? null : (
  <Box className="popover" style={{ top, left }}>
    {children}
  </Box>
));

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
  top: PropTypes.number,
  left: PropTypes.number,
};

Popover.defaultProps = {
  top: null,
  left: null,
};

export default Popover;
