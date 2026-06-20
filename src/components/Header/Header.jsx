import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiClock } from 'react-icons/fi';

import Logo from '../../components/Ui/Logo/Logo.jsx';
import ThemeToggle from '../../components/Ui/Buttons/ThemeToggle/ThemeToggle.jsx';
import LanguageSwitcher from '../../components/Ui/LanguageSwitcher/LanguageSwitcher.jsx';
import MenuToggleButton from '../../components/Ui/Buttons/MenuToggleButton/MenuToggleButton.jsx';
import CartIcon from '../../components/Ui/CartIcon/CartIcon.jsx';
import CartModal from '../../components/Modal/CartModal/CartModal.jsx';

import css from './Header.module.css';

const Header = ({ onToggleMenu, isMenuOpen }) => {
  const { t } = useTranslation('header');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeOrderNum, setActiveOrderNum] = useState(null);

  // Перевіряємо наявність замовлення в браузері при завантаженні та при закритті модалки кошика
  useEffect(() => {
    const checkActiveOrder = () => {
      const stored = localStorage.getItem('lastOrder');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Замовлення вважається активним, якщо з моменту створення минуло менше 2 годин
          if (Date.now() - parsed.timestamp < 2 * 60 * 60 * 1000) {
            setActiveOrderNum(parsed.number);
            return;
          }
        } catch (e) {
          console.error('Error parsing lastOrder from localStorage', e);
        }
      }
      setActiveOrderNum(null);
    };

    checkActiveOrder();

    // Слухаємо кастомну подію оновлення замовлення, щоб миттєво реагувати на зміни
    window.addEventListener('orderUpdated', checkActiveOrder);
    return () => window.removeEventListener('orderUpdated', checkActiveOrder);
  }, [isCartOpen]);

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
            {/* Кнопка-плашка «Моє замовлення» для забудькуватих клієнтів */}
            {activeOrderNum && (
              <button
                type="button"
                className={css['active-order-badge']}
                onClick={() => setIsCartOpen(true)}
                title="Переглянути моє активне замовлення"
              >
                <FiClock size={16} />
                <span>Замовлення #{activeOrderNum}</span>
              </button>
            )}

            <a href="#contacts" className={css['header-cta-link']}>
              {t('cta_booking')}
            </a>

            <div className={css['settings-group']}>
              <ThemeToggle />
              <LanguageSwitcher />

              {/* Іконка кошика тепер живе в хедері */}
              <CartIcon onClick={() => setIsCartOpen(true)} />

              <MenuToggleButton isOpen={isMenuOpen} onClick={onToggleMenu} />
            </div>
          </div>
        </div>
      </header>

      {/* Модальне вікно кошика рендериться тут, щоб працювати глобально */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

Header.propTypes = {
  onToggleMenu: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
};

export default Header;
