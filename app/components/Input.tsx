import React, { FC } from 'react';
import { BsSearch } from 'react-icons/bs';

interface InputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({ onChange }) => {
  const input = (
    <div className="w-full md:w-2/4 relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <BsSearch className="h-4 w-4 mx-2 cursor-pointer" />
      </div>
      <input
        className="g-gray-50 shadow-md text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-4 pr-9 pl-11 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:placeholder:text-white light:text-black"
        type="text"
        placeholder="Search..."
        onChange={onChange}
      />
    </div>
  );
  return input;
};

export default Input;
