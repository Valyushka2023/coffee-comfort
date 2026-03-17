import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import css from './Button.module.css';

const Button = ({
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

  const combinedClasses = [
    css.button,
    css[variant],
    css[size],
    isFixedWidth ? css['fixed-width'] : '',
    className,
  ]
    .join(' ')
    .trim();

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

Button.propTypes = {
  variant: PropTypes.oneOf(['default', 'primary', 'active']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  isFixedWidth: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
