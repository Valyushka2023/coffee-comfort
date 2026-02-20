import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import Logo from '../../components/Ui/Logo/Logo.jsx';
import ThemeToggle from '../../components/Ui/Buttons/ThemeToggle/ThemeToggle.jsx';
import MenuToggleButton from '../../components/Ui/Buttons/MenuToggleButton/MenuToggleButton.jsx';
import LanguageSwitcher from '../../components/Ui/LanguageSwitcher/LanguageSwitcher.jsx';

import css from './Header.module.css';

const Header = () => {
  const location = useLocation();
  const { t, i18n: _i18n } = useTranslation('header');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Закриття меню при зміні сторінки (якщо будуть інші роути)
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Блокування скролу фону при відкритому меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  };

  return (
    <header className={css['header-wrapper']}>
      <div className={css['header-container']}>
        <Link to="/" className={css['logo-header']} aria-label="Home">
          <Logo />
        </Link>

        {/* Десктопна навігація */}
        <nav className={css['nav-container']}>
          <ul className={css['nav-links']}>
            <li>
              <a href="#menu">{t('nav_menu', 'Menu')}</a>
            </li>
            <li>
              <a href="#about">{t('nav_about', 'About us')}</a>
            </li>
            <li>
              <a href="#gallery">{t('nav_gallery', 'Gallery')}</a>
            </li>
            <li>
              <a href="#contacts">{t('nav_contacts', 'Contacts')}</a>
            </li>
          </ul>
        </nav>

        <div className={css['toggle-icons']}>
          <a href="#contacts" className={css['button-cta']}>
            {t('cta_booking', 'Book a table')}
          </a>

          <ThemeToggle />
          <LanguageSwitcher />

          <MenuToggleButton
            isOpen={isMenuOpen}
            onClick={toggleMenu}
            ariaLabel={t('menu_open_label', 'Toggle menu')}
          />
        </div>
      </div>

      {/* МОБІЛЬНЕ МЕНЮ */}
      <div
        className={clsx(css.menu, isMenuOpen && css['is-open'])}
        aria-hidden={!isMenuOpen}
      >
        <nav className={css['mobile-nav']}>
          <a href="#menu" className={css.link} onClick={closeMenu}>
            {t('nav_menu', 'Menu')}
          </a>
          <a href="#about" className={css.link} onClick={closeMenu}>
            {t('nav_about', 'About us')}
          </a>
          <a href="#gallery" className={css.link} onClick={closeMenu}>
            {t('nav_gallery', 'Gallery')}
          </a>
          <a href="#contacts" className={css.link} onClick={closeMenu}>
            {t('nav_contacts', 'Contacts')}
          </a>
          <a
            href="#contacts"
            className={clsx(css.link, css['mobile-cta'])}
            onClick={closeMenu}
          >
            {t('cta_booking', 'Book a table')}
          </a>
        </nav>
      </div>

      {/* Бекдроп (фон) */}
      <div
        className={clsx(css['menu-backdrop'], isMenuOpen && css['is-visible'])}
        onClick={closeMenu}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Close menu"
      />
    </header>
  );
};

export default Header;
