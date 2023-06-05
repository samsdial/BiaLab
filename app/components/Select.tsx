import React, { FC } from 'react';

interface SelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const Select: FC<SelectProps> = ({ value, onChange }) => {
  const select = (
    <select className="selected py-3 px-4 pr-9 shadow-md block w-full md:w-1/4 ml-auto border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" value={value} onChange={onChange}>
      <option value="">All regions</option>
      <option value="Americas">Americas</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  );

  return select;
};

export default Select;
