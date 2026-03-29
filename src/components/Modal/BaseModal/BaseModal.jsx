// import { useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import CloseButton from '../../Ui/Buttons/CloseButton/CloseButton.jsx';
// import css from './BaseModal.module.css';

// const BaseModal = ({
//   isOpen,
//   onClose,
//   children,
//   title,
//   className,
//   showCloseButton = true, // Додали цей пропс із значенням true за замовчуванням
// }) => {
//   useEffect(() => {
//     const handleKeyDown = e => {
//       if (e.key === 'Escape') onClose();
//     };
//     if (isOpen) document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [isOpen, onClose]);

//   useEffect(() => {
//     document.body.style.overflow = isOpen ? 'hidden' : '';
//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return createPortal(
//     <div className={css['wrapper']}>
//       <div
//         className={css['overlay']}
//         onClick={onClose}
//         role="button"
//         tabIndex={0}
//         onKeyDown={e => e.key === 'Enter' && onClose()}
//         aria-label="Close modal"
//       />
//       <div
//         className={clsx(css['modal'], className)}
//         role="dialog"
//         aria-modal="true"
//       >
//         {/* Хрестик відмалюється лише тоді, коли showCloseButton дорівнює true */}
//         {showCloseButton && (
//           <div
//             className={clsx(
//               css['close-btn'],
//               className && css['gallery-close-btn']
//             )}
//           >
//             <CloseButton onClick={onClose} />
//           </div>
//         )}

//         {/* {showCloseButton && (
//           <div className={css['modal-header']}>
//             <CloseButton onClick={onClose} />
//           </div>
//         )} */}
//         {title && <h3 className={css['modal-title']}>{title}</h3>}
//         {children}
//       </div>
//     </div>,
//     document.body
//   );
// };

// BaseModal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   children: PropTypes.node.isRequired,
//   title: PropTypes.string,
//   className: PropTypes.string,
//   showCloseButton: PropTypes.bool, // Додали валідацію для нового пропса
// };

// export default BaseModal;
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CloseButton from '../../Ui/Buttons/CloseButton/CloseButton.jsx';
import css from './BaseModal.module.css';

const BaseModal = ({
  isOpen,
  onClose,
  children,
  title,
  className,
  showCloseButton = true,
}) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className={css['wrapper']}>
      {/* Overlay тепер просто фон, що закриває все під собою */}
      <div
        className={css['overlay']}
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && onClose()}
        aria-label="Close modal"
      />

      {/* Контейнер модалки тепер центрується флексом у wrapper */}
      <div
        className={clsx(css['modal'], className)}
        role="dialog"
        aria-modal="true"
      >
        {showCloseButton && (
          <div
            className={clsx(
              css['close-btn'],
              className && css['gallery-close-btn']
            )}
          >
            <CloseButton onClick={onClose} />
          </div>
        )}

        {title && <h3 className={css['modal-title']}>{title}</h3>}

        {/* Контент модалки */}
        <div className={css['modal-content']}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

BaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  showCloseButton: PropTypes.bool,
};

export default BaseModal;
