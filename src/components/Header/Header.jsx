import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Logo from '../../components/Ui/Logo/Logo.jsx';
import SwitcherTheme from '../Ui/Switchers/SwitcherTheme/SwitcherTheme.jsx';
import SwitcherLanguage from '../Ui/Switchers/SwitcherLanguage/SwitcherLanguage.jsx';
import MenuToggleButton from '../../components/Ui/Buttons/MenuToggleButton/MenuToggleButton.jsx';
import CartIcon from '../../components/Ui/CartIcon/CartIcon.jsx';
import ModalCart from '../Modal/ModalCart/ModalCart.jsx';

import css from './Header.module.css';

const Header = ({ onToggleMenu, isMenuOpen }) => {
  const { t } = useTranslation('header');
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className={css['header-section']}>
        <div className={css['header-container']}>
          <Link to="/" className={css['header-logo']}>
            <Logo />
          </Link>

          <nav className={css['header-links']}>
            <a href="#menu" className={css['header-link']}>
              {t('menu')}
            </a>
            <a href="#about" className={css['header-link']}>
              {t('about')}
            </a>
            <a href="#gallery" className={css['header-link']}>
              {t('gallery')}
            </a>
            <a href="#contacts" className={css['header-link']}>
              {t('contacts')}
            </a>
          </nav>

          <div className={css['actions-wrapper']}>
            <a href="#contacts" className={css['header-cta-link']}>
              {t('cta_booking')}
            </a>

            <div className={css['settings-group']}>
              <SwitcherTheme />
              <SwitcherLanguage />

              {/* Іконка кошика */}
              <CartIcon onClick={() => setIsCartOpen(true)} />

              <MenuToggleButton isOpen={isMenuOpen} onClick={onToggleMenu} />
            </div>
          </div>
        </div>
      </header>

      {/* Модальне вікно кошика рендериться тут */}
      <ModalCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

Header.propTypes = {
  onToggleMenu: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
};

export default Header;
