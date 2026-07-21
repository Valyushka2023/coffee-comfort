import PropTypes from 'prop-types';
import css from './CloseButton.module.css';

const CloseButton = ({ onClick, ariaLabel = 'Close', className = '' }) => {
  // Формуємо чистий рядок класів без зайвих пробілів
  const combinedClasses = [css['base-close-button'], className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={combinedClasses}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {/* Приховуємо символ від Screen Readers, оскільки вже є aria-label */}
      <span aria-hidden="true">&times;</span>
    </button>
  );
};

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
};

export default CloseButton;
