import { useEffect, useState } from 'react';

export const useInitDisplayPref = () => {
  useEffect(() => {
    onBoot();
  }, []);
  const onBoot = () => {
    const isSystemDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    const mode =
      'theme' in localStorage
        ? localStorage.theme
        : isSystemDarkMode
        ? 'dark'
        : 'light';
    if (!process.browser || !window) return;

    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // set local storage value if not set
    if (!('theme' in localStorage)) {
      localStorage.setItem('theme', isSystemDarkMode ? 'dark' : 'light');
    }
  };
};

export const useDisplayPref = () => {
  const [mode, setMode] = useState<'dark' | 'light'>(() => {
    if (!process.browser || !window) return 'light';

    const isSystemDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    return 'theme' in localStorage
      ? localStorage.theme
      : isSystemDarkMode
      ? 'dark'
      : 'light';
  });

  const toggleMode = () => {
    if (mode === 'dark') {
      setMode('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      setMode('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return { mode, toggleMode };
};
