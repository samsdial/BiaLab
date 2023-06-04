"use client";
import React, {useEffect} from 'react';
import { useTheme } from 'next-themes';
import { BsSun, BsFillMoonFill } from 'react-icons/bs';

const DarkModeBtn = () => {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const currentTheme = theme === 'system' ? systemTheme : theme;
  return (
    <>
      {currentTheme === 'dark' ? <BsSun className="h-6 w-6 cursor-pointer" onClick={() => setTheme('light')} /> : <BsFillMoonFill className="h-6 w-6 cursor-pointer" onClick={() => setTheme('dark')} />}
    </>
  );
};
export default DarkModeBtn;
