'use client';

import { useEffect } from 'react';

const ThemeProvider = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  return null;
};

export default ThemeProvider;