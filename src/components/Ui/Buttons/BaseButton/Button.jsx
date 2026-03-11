import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import css from './Button.module.css';

const Button = ({
  variant = 'default',
  onClick,
  size = 'medium',
  disabled = false,
  children,
  to,
  className = '',
  ...rest
}) => {
  const navigate = useNavigate();

  const handleClick = e => {
    if (onClick) {
      onClick(e);
    }
    if (to) {
      navigate(to);
    }
  };

  return (
    <button
      className={`${css['button']} ${css[variant]} ${css[size]} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
