'use client';
import React from 'react';
import { ThemeProvider } from 'next-themes';

const Provider = ({ children }: {
  children: React.ReactNode
}) => <ThemeProvider>{children}</ThemeProvider>;

export default Provider;
