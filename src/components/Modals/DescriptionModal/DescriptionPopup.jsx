// import PropTypes from 'prop-types';
// import CloseButton from '../../Ui/Buttons/CloseButton/CloseButton.jsx';
// import css from './DescriptionPopup.module.css';

// const DescriptionPopup = ({ description, onClose }) => {
//   const handleKeyDown = e => {
//     if (e.key === 'Escape') {
//       onClose();
//     }
//     if (e.key === 'Enter' || e.key === ' ') {
//       e.preventDefault();
//       onClose();
//     }
//   };

//   const handlePopupContentKeyDown = e => {
//     if (e.key === 'Enter' || e.key === ' ') {
//       e.stopPropagation();
//     }
//   };

//   return (
//     <div
//       className={css['backdrop-in-card']}
//       onClick={onClose}
//       onKeyDown={handleKeyDown}
//       role="button"
//       tabIndex={0}
//       aria-label="Закрити опис, клікнувши на фон"
//     >
//       {/* ПРИДУШЕННЯ ПОМИЛОК: Вимикаємо два правила для цього елемента:
//         1. jsx-a11y/no-noninteractive-element-interactions (для onClick)
//         2. jsx-a11y/no-noninteractive-tabindex (якщо раптом тут є tabIndex="-1")
//       */}
//       {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
//       <div
//         className={css['popup-content']}
//         onClick={e => e.stopPropagation()}
//         onKeyDown={handlePopupContentKeyDown}
//         role="dialog"
//         aria-modal="true"
//       >
//         <CloseButton
//           onClick={onClose}
//           className={css['popup-close-button']}
//           ariaLabel="Close description"
//         />
//         <p className={css['description-text']}>{description}</p>
//       </div>
//     </div>
//   );
// };

// DescriptionPopup.propTypes = {
//   description: PropTypes.string.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default DescriptionPopup;
