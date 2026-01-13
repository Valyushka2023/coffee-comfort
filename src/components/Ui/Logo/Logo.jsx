import PropTypes from 'prop-types';
import css from './Logo.module.css';

function Logo({ className = '' }) {
  return (
    <div className={`${css.logo} ${className}`}>
      Coffee
      <span className={css['logo-coffee-cap']}>
        <img src="/coffee-cap.png" alt="coffee cap" />
      </span>
      <span className={css['logo-secondary']}>Comfort</span>
    </div>
  );
}

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
