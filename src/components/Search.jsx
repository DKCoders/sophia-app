import React from 'react';
import PropTypes from 'prop-types';
import { withHandlers } from 'proppy';
import { attach } from 'proppy-react';
import { InputGroup } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

let debounce;
const P = withHandlers({
  onInputChange: ({ onChange }) => (event) => {
    if (onChange) {
      const { target: { value } } = event;
      if (debounce) {
        clearTimeout(debounce);
      }
      setTimeout(() => onChange(value, event), 300);
    }
  },
});

const Search = ({ onInputChange, searchTerm }) => (
  <InputGroup
    leftIcon={IconNames.SEARCH}
    type="search"
    placeholder="Search..."
    onChange={onInputChange}
    defaultValue={searchTerm}
  />
);

Search.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  onChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

Search.defaultProps = {};

export default attach(P)(Search);
