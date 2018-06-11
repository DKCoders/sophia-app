import React from 'react';
import PropTypes from 'prop-types';
import { Hero, HeroBody, Content, Title } from 'sophia-components';

const RouteTitle = ({ title }) => (
  <Hero small>
    <HeroBody>
      <Content>
        <Title>{title}</Title>
      </Content>
    </HeroBody>
  </Hero>
);

RouteTitle.propTypes = {
  title: PropTypes.node.isRequired,
};

RouteTitle.defaultProps = {};

export default RouteTitle;
