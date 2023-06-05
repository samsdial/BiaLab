import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ onChange }) => {
  const input = (
    <input
      type="text"
      placeholder="Search..."
      onChange={onChange}
    />
  );

  return input;
};
Input.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Input;
