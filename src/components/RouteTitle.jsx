import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'sophia-components';
import { H1 } from '@blueprintjs/core';

const RouteTitle = ({ title }) => (
  <Container>
    <H1>{title}</H1>
  </Container>
);

RouteTitle.propTypes = {
  title: PropTypes.node.isRequired,
};

RouteTitle.defaultProps = {};

export default RouteTitle;
