// import { useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
// import Button from '../../Ui/Buttons/BaseButton/BaseButton.jsx';
// import css from './ModalCallbackSuccess.module.css';

// const ModalCallbackSuccess = ({ isOpen, onClose }) => {
//   const { t } = useTranslation('callback_modal');

//   useEffect(() => {
//     const handleKeyDown = e => {
//       if (e.key === 'Escape') onClose();
//     };

//     if (isOpen) {
//       window.addEventListener('keydown', handleKeyDown);
//       document.body.style.overflow = 'hidden';
//     }

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   const handleOverlayClick = e => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   return createPortal(
//     <div
//       className={css['modal-overlay']}
//       onClick={handleOverlayClick}
//       onKeyDown={e => {
//         if (e.key === 'Enter' || e.key === ' ') handleOverlayClick(e);
//       }}
//       role="button"
//       tabIndex={0}
//     >
//       <div className={css['success-container']} role="dialog" aria-modal="true">
//         <div className={css['success-icon']}>✓</div>
//         <h3 className={css['title-success-form']}>
//           {t('success_title', 'Дякуємо!')}
//         </h3>
//         <p className={css['text-success-form']}>
//           {t('success_message', 'Ми перетелефонуємо вам найближчим часом!')}
//         </p>
//         <div className={css['element-sending']}>
//           <Button variant="primary" onClick={onClose} isFixedWidth={true}>
//             {t('back_button', 'Зрозуміло')}
//           </Button>
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// };

// ModalCallbackSuccess.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default ModalCallbackSuccess;
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import BaseModal from '../BaseModal/BaseModal.jsx'; // Перевірте правильність шляху до BaseModal
import Button from '../../Ui/Buttons/BaseButton/BaseButton.jsx';
import clsx from 'clsx';
import css from './ModalCallbackSuccess.module.css';

const ModalCallbackSuccess = ({ isOpen, onClose, className }) => {
  const { t } = useTranslation('callback_modal');

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      className={clsx(css['success-modal-override'], className)}
    >
      {/* <div className={css['success-container']}></div> */}
      <div className={css['success-icon']}>✓</div>
      <h3 className={css['title-success-form']}>
        {t('success_title', 'Дякуємо!')}
      </h3>
      <p className={css['text-success-form']}>
        {t('success_message', 'Ми перетелефонуємо вам найближчим часом!')}
      </p>
      <div className={css['element-sending']}>
        <Button variant="primary" onClick={onClose} isFixedWidth={true}>
          {t('back_button', 'Зрозуміло')}
        </Button>
      </div>
    </BaseModal>
  );
};

ModalCallbackSuccess.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ModalCallbackSuccess;
