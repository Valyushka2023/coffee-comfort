import PropTypes from 'prop-types';
import css from './Avatar.module.css';

const Avatar = ({ name, lang = 'en' }) => {
  const displayName = typeof name === 'object' ? name[lang] || name.en : name;
  const initial = displayName?.charAt(0).toUpperCase() || '?';

  return (
    <div className={css['avatar']} title={displayName}>
      <span className={css['initial']}>{initial}</span>
    </div>
  );
};

Avatar.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  lang: PropTypes.string,
};

export default Avatar;
