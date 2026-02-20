// import PropTypes from 'prop-types';
// import css from './Avatar.module.css';

// const Avatar = ({ name }) => {
//   const initial = name?.charAt(0).toUpperCase() || '?';

//   return (
//     <div
//       className={css.avatar} // Застосовуємо клас .avatar через об'єкт css
//       title={name}
//     >
//       {initial}
//     </div>
//   );
// };

// Avatar.propTypes = {
//   name: PropTypes.string.isRequired,
// };

// export default Avatar;
import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Avatar.module.css';

const Avatar = ({ name, src, lang = 'en' }) => {
  const [isError, setIsError] = useState(false);

  // Визначаємо ім'я (враховуємо, що з бази може прийти об'єкт {en, ua})
  const displayName = typeof name === 'object' ? name[lang] || name.en : name;
  const initial = displayName?.charAt(0).toUpperCase() || '?';

  return (
    <div className={css.avatar} title={displayName}>
      {/* Якщо є посилання і не було помилки — показуємо фото */}
      {src && !isError ? (
        <img
          src={src}
          alt={displayName}
          className={css.avatarImage}
          onError={() => setIsError(true)} // Якщо фото "бите", покажемо літеру
        />
      ) : (
        <span className={css.initial}>{initial}</span>
      )}
    </div>
  );
};

// Оновлюємо PropTypes
Avatar.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  src: PropTypes.string,
  lang: PropTypes.string,
};

export default Avatar;
