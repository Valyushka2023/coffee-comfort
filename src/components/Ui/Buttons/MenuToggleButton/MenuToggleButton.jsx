import PropTypes from 'prop-types';
import { MenuIcon, CloseIcon } from '../../../Icons/index.js';
import useWindowWidth from '../../../../hooks/useWindowWiidth.js';
import clsx from 'clsx';
import css from './MenuToggleButton.module.css';

const MenuToggleButton = ({ isOpen, onClick, ariaLabel = 'Toggle menu' }) => {
  const windowWidth = useWindowWidth();

  if (windowWidth > 767) return null;

  return (
    <button
      type="button"
      className={clsx(css['burger-button'], isOpen && css['is-active'])}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close menu' : ariaLabel}
    >
      {isOpen ? (
        <CloseIcon className={css['icon']} aria-hidden="true" />
      ) : (
        <MenuIcon className={css['icon']} aria-hidden="true" />
      )}
    </button>
  );
};

MenuToggleButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
};

export default MenuToggleButton;
