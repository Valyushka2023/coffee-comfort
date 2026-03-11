import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../../components/Ui/Logo/Logo.jsx';
import ThemeToggle from '../../components/Ui/Buttons/ThemeToggle/ThemeToggle.jsx';
import LanguageSwitcher from '../../components/Ui/LanguageSwitcher/LanguageSwitcher.jsx';
// Імпортуємо ваш компонент кнопки
import MenuToggleButton from '../../components/Ui/Buttons/MenuToggleButton/MenuToggleButton.jsx';
import css from './Header.module.css';

const Header = ({ onToggleMenu, isMenuOpen }) => {
  const { t } = useTranslation('header');

  return (
    <header className={css['header-section']}>
      <div className={css['header-container']}>
        <Link to="/" className={css['logo-header']}>
          <Logo />
        </Link>

        <nav className={css['nav-desktop']}>
          <a href="#menu" className={css['nav-link']}>
            {t('nav_menu', 'Menu')}
          </a>
          <a href="#about" className={css['nav-link']}>
            {t('nav_about', 'About us')}
          </a>
          <a href="#gallery" className={css['nav-link']}>
            {t('nav_gallery', 'Gallery')}
          </a>
          <a href="#contacts" className={css['nav-link']}>
            {t('nav_contacts', 'Contacts')}
          </a>
        </nav>

        <div className={css['toggle-icons']}>
          <a href="#contacts" className={css['button-cta']}>
            {t('cta_booking', 'Book a table')}
          </a>
          <ThemeToggle />
          <LanguageSwitcher />

          {/* Використовуємо компонент замість стандартного тегу button */}
          <MenuToggleButton isOpen={isMenuOpen} onClick={onToggleMenu} />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  onToggleMenu: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
};

export default Header;
