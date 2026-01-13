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
  const { t } = useTranslation('header');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  // Закриття меню при зміні сторінки
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Блокування скролу фону при відкритому меню
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Виправлення помилок ESLint: обробка клавіш для доступності
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
          <a href="#booking" className={css['button-cta']}>
            {t('cta_booking', 'Book a table')}
          </a>

          <ThemeToggle />
          <LanguageSwitcher />

          {/* Кнопка-хрестик */}
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
          <Link
            to="/menu"
            className={clsx(
              css.link,
              location.pathname === '/menu' && css.active
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav_menu', 'Menu')}
          </Link>
          <Link
            to="/about"
            className={clsx(
              css.link,
              location.pathname === '/about' && css.active
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav_about', 'About us')}
          </Link>
          <Link
            to="/gallery"
            className={clsx(
              css.link,
              location.pathname === '/gallery' && css.active
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav_gallery', 'Gallery')}
          </Link>
          <Link
            to="/contacts"
            className={clsx(
              css.link,
              location.pathname === '/contacts' && css.active
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav_contacts', 'Contacts')}
          </Link>
        </nav>
      </div>

      {/* Бекдроп (фон) */}
      <div
        className={clsx(css['menu-backdrop'], isMenuOpen && css['is-visible'])}
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Close menu"
      />
    </header>
  );
};

export default Header;
