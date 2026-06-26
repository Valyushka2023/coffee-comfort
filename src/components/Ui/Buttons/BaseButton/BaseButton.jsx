import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import css from './BaseButton.module.css';

const BaseButton = ({
  variant = 'default',
  onClick,
  size = 'medium',
  isFixedWidth = false,
  disabled = false,
  children,
  to,
  className = '',
  ...rest
}) => {
  const navigate = useNavigate();

  const handleClick = e => {
    if (disabled) return;
    if (onClick) onClick(e);
    if (to) navigate(to);
  };

  // Оновлено: очищаємо масив від порожніх рядків через filter(Boolean)
  const combinedClasses = [
    css.button,
    css[variant],
    css[size],
    isFixedWidth ? css['fixed-width'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={combinedClasses}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

BaseButton.propTypes = {
  variant: PropTypes.oneOf(['default', 'primary', 'active', 'secondary']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  isFixedWidth: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  className: PropTypes.string,
};

export default BaseButton;
