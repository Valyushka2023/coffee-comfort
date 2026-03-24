import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../../components/Ui/Logo/Logo.jsx';
import ThemeToggle from '../../components/Ui/Buttons/ThemeToggle/ThemeToggle.jsx';
import LanguageSwitcher from '../../components/Ui/LanguageSwitcher/LanguageSwitcher.jsx';
import MenuToggleButton from '../../components/Ui/Buttons/MenuToggleButton/MenuToggleButton.jsx';
import css from './Header.module.css';

const Header = ({ onToggleMenu, isMenuOpen }) => {
  const { t } = useTranslation('header');

  return (
    <header className={css['header-section']}>
      <div className={css['header-container']}>
        <Link to="/" className={css['header-logo']}>
          <Logo />
        </Link>

        <nav className={css['header-links']}>
          <a href="#menu" className={css['header-link']}>
            {t('menu_header-link', 'Menu')}
          </a>
          <a href="#about" className={css['header-link']}>
            {t('about_header_link', 'About us')}
          </a>
          <a href="#gallery" className={css['header-link']}>
            {t('gallery_header_link', 'Gallery')}
          </a>
          <a href="#contacts" className={css['header-link']}>
            {t('contacts_header_link', 'Contacts')}
          </a>
        </nav>

        <div className={css['actions-wrapper']}>
          <a href="#contacts" className={css['header-cta-link']}>
            {t('cta_booking', 'Book a table')}
          </a>
          <div className={css['settings-group']}>
            <ThemeToggle />
            <LanguageSwitcher />
            <MenuToggleButton isOpen={isMenuOpen} onClick={onToggleMenu} />
          </div>
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
