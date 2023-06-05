import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ value, onChange }) => {
  const select = (
    <select value={value} onChange={onChange}>
      <option value="0">All regions</option>
      <option value="Americas">Americas</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  );

  return select;
};
Select.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
