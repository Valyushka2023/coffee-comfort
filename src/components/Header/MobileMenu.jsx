// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import css from './MobileMenu.module.css';

// const MobileMenu = ({ isOpen, onClose, navItems, t }) => {
//   const handleKeyDown = event => {
//     if (event.key === 'Enter' || event.key === 'Escape') {
//       onClose();
//     }
//   };

//   return (
//     <>
//       <div className={clsx(css.menu, isOpen && css['is-open'])}>
//         <nav className={css['mobile-nav']}>
//           {navItems.map(item => (
//             <a
//               key={item.href}
//               href={item.href}
//               className={css['mobile-link']}
//               onClick={onClose}
//             >
//               {t(item.labelKey, item.defaultLabel)}
//             </a>
//           ))}
//         </nav>
//       </div>

//       <div
//         className={clsx(css['menu-backdrop'], isOpen && css['is-visible'])}
//         onClick={onClose}
//         onKeyDown={handleKeyDown}
//         role="button"
//         tabIndex={0}
//         aria-label="Close menu"
//       />
//     </>
//   );
// };

// MobileMenu.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   navItems: PropTypes.arrayOf(
//     PropTypes.shape({
//       href: PropTypes.string.isRequired,
//       labelKey: PropTypes.string.isRequired,
//       defaultLabel: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   t: PropTypes.func.isRequired,
// };

// export default MobileMenu;
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import css from './MobileMenu.module.css';

const MobileMenu = ({ isOpen, onClose, navItems, t }) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    let timerId;

    if (isOpen) {
      timerId = setTimeout(() => {
        setIsAnimated(true);
      }, 600); // час анімації меню
    } else {
      setIsAnimated(false);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isOpen]);

  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      onClose();
    }
  };

  return (
    <>
      <div
        className={clsx(
          css.menu,
          isOpen && css['is-open'],
          isAnimated && css['is-animated']
        )}
      >
        <nav className={css['mobile-nav']}>
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className={css['mobile-link']}
              onClick={onClose}
            >
              {t(item.labelKey, item.defaultLabel)}
            </a>
          ))}
        </nav>
      </div>

      <div
        className={clsx(css['menu-backdrop'], isOpen && css['is-visible'])}
        onClick={onClose}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Close menu"
      />
    </>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      labelKey: PropTypes.string.isRequired,
      defaultLabel: PropTypes.string.isRequired,
    })
  ).isRequired,
  t: PropTypes.func.isRequired,
};

export default MobileMenu;
