import React, { FC } from 'react';
import { BsArrowLeft, BsArrowDownShort } from 'react-icons/bs';

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  arrow: boolean;
  arrowLeft: boolean;
  arrowDown: boolean;
}

const Button: FC<ButtonProps> = ({
  onClick,
  arrow,
  arrowDown,
  arrowLeft,
  children,
}) => {
  const button = (
    <div className="w-auto relative mb-6">
      {arrow ? (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {arrowLeft ? <BsArrowLeft className="h-4 w-4 mx-2 cursor-pointer" /> : null}
          {arrowDown ? <BsArrowDownShort className="h-4 w-4 mx-2 cursor-pointer" /> : null}
        </div>
      ) : null}

      <button
        type="button"
        className="g-gray-50 shadow-md text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-4 pr-9 pl-11 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:placeholder:text-white light:text-black"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );

  return button;
};

export default Button;
