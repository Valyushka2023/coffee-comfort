// import { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import Logo from '../Ui/Logo/Logo.jsx';
// import CloseButton from '../Ui/Buttons/CloseButton/CloseButton.jsx';
// import css from './Modal.module.css';

// function Modal({ title, titleClassName, children, onClose }) {
//   useEffect(() => {
//     // Логіка блокування скрола та закриття по Escape
//     const originalOverflow = document.body.style.overflow;
//     document.body.style.overflow = 'hidden';

//     const handleEscape = e => {
//       if (e.key === 'Escape') onClose();
//     };
//     window.addEventListener('keydown', handleEscape);

//     return () => {
//       document.body.style.overflow = originalOverflow;
//       window.removeEventListener('keydown', handleEscape);
//     };
//   }, [onClose]);

//   // Обробник, що зупиняє спливання кліка (onClick)
//   const handleModalContentClick = e => e.stopPropagation();

//   // Обробник, що зупиняє спливання клавіатурних подій (onKeyDown)
//   const handleModalContentKeyDown = e => {
//     if (e.key === 'Enter' || e.key === ' ') {
//       e.stopPropagation();
//     }
//   };

//   return (
//     // Backdrop: повна доступність для кликабельного div (роль, tabIndex, onKeyDown)
//     <div
//       className={css.backdrop}
//       role="button"
//       tabIndex="0"
//       onClick={onClose}
//       onKeyDown={e => {
//         if (e.key === 'Enter' || e.key === ' ') {
//           onClose();
//         }
//       }}
//       aria-label="Закрити модальне вікно, клікнувши на фон"
//     >
//       {/* ПРИДУШЕННЯ ПОМИЛОК: Вимикаємо два правила для цього елемента,
//         оскільки він є технічним контейнером-діалогом, а не елементом керування.
//       */}
//       {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
//       <div
//         className={css.modal}
//         onClick={handleModalContentClick}
//         onKeyDown={handleModalContentKeyDown}
//         role="dialog" // ARIA: Позначає діалогове вікно
//         aria-modal="true" // ARIA: Блокує доступність до контенту поза модалкою
//         tabIndex="-1" // Дозволяє програмно фокусувати елемент (важливо для Focus Trap)
//       >
//         <div className={css['modal-header-container']}>
//           <Logo className={css['logo-in-modal']} />
//           <CloseButton
//             onClick={onClose}
//             className={css['close-btn']}
//             ariaLabel="Close modal window"
//           />
//         </div>
//         <h2 className={`${css['modal-title']} ${titleClassName || ''}`}>
//           {title}
//         </h2>
//         <div className={css['modal-body']}>{children}</div>
//       </div>
//     </div>
//   );
// }

// Modal.propTypes = {
//   title: PropTypes.string.isRequired,
//   titleClassName: PropTypes.string,
//   children: PropTypes.node.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default Modal;
