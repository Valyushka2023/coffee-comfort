import PropTypes from 'prop-types';
import css from './CloseButton.module.css';

const CloseButton = ({ onClick, ariaLabel = 'Close', className }) => {
  return (
    <button
      type="button"
      className={`${css['base-close-button']} ${className || ''}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      ✕ {/* Always display the cross symbol */}
    </button>
  );
};

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
};

export default CloseButton;
