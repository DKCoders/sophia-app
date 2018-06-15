import React from 'react';
// import PropTypes from 'prop-types';
import { Icon } from 'sophia-components';
import { withState } from 'proppy';
import { attach } from 'proppy-react';

const withEditIcon = (Comp) => {
  const P = withState('hovered', 'setHovered', false);

  const Hoc = ({
    children, hovered, setHovered, ...props
  }) => (
    <Comp {...props}><span onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>{children} <Icon invisible={!hovered} small icon="fas fa-edit" style={{ marginLeft: 10 }} /></span></Comp>
  );
  Hoc.propTypes = {
    ...Comp.propTypes,
  };
  Hoc.defaultProps = { ...Comp.defaultProps };
  return attach(P)(Hoc);
};


export default withEditIcon;
