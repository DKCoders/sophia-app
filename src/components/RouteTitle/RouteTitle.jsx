import React from 'react';
import PropTypes from 'prop-types';
import { Hero, HeroBody, Content, Title, Container } from 'sophia-components';

const RouteTitle = ({ title }) => (
  <Hero small>
    <HeroBody>
      <Container>
        <Content>
          <Title>{title}</Title>
        </Content>
      </Container>
    </HeroBody>
  </Hero>
);

RouteTitle.propTypes = {
  title: PropTypes.node.isRequired,
};

RouteTitle.defaultProps = {};

export default RouteTitle;
