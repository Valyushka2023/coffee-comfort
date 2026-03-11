import PropTypes from 'prop-types';
import { ArrowUpIcon } from '../../../../components/Icons/index.js';
import css from './ScrollToTopButton.module.css';

const ScrollToTopButton = ({ visible, onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${css['scroll-to-top-button']} ${visible ? css.visible : ''} ${className || ''}`}
      aria-label="Підняти вверх"
    >
      <ArrowUpIcon className={css.icon} aria-hidden="true" />
    </button>
  );
};

// Це прибере жовті попередження "missing in props validation"
ScrollToTopButton.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

// ЦЕ НАЙВАЖЛИВІШЕ: додаємо експорт, щоб прибрати помилку "never used"
export default ScrollToTopButton;
