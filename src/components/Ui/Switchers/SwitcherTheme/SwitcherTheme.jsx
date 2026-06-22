import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '../../../Icons/index.js';
import css from './SwitcherTheme.module.css';

const SwitcherTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const switcherTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkTheme]);

  return (
    <button
      className={css['switcher-theme-btn']}
      onClick={switcherTheme}
      aria-label="Switch topic"
    >
      {isDarkTheme ? (
        <SunIcon className={css['theme-icon-md-light']} />
      ) : (
        <MoonIcon className={css['theme-icon-md-dark']} />
      )}
    </button>
  );
};

export default SwitcherTheme;
