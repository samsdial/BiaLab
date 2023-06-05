'use client';

import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { BsSun, BsFillMoonFill } from 'react-icons/bs';

const DarkModeBtn = () => {
  const [mounted, setMounted] = React.useState(false);
  const {
    theme,
    setTheme,
    systemTheme,
  } = useTheme();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const currentTheme = theme === 'system' ? systemTheme : theme;
  return (
    <div className="flex items-center">
      {currentTheme === 'dark' ? (
        <button type="button" onClick={() => setTheme('light')} className="flex justify-center">
          <BsSun className="h-4 w-4 mx-2 cursor-pointer" />
          <small className="text-xs font-light">
            Dark Mode
          </small>
        </button>
      ) : (
        <button type="button" onClick={() => setTheme('dark')} className="flex justify-center">
          <BsFillMoonFill className="h-4 w-4 mx-2 cursor-pointer" />
          <small className="text-xs font-light">
            Black Mode
          </small>
        </button>
      )}
    </div>
  );
};
export default DarkModeBtn;
