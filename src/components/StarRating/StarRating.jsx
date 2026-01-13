// import { useTranslation } from 'react-i18next';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import css from './StarRating.module.css';

// const StarRating = ({
//   value,
//   onChange,
//   name = 'rating',
//   totalStars = 5,
//   size = 20,
//   colorActive = '#ffc107',
//   colorInactive = '#948f8fff',
//   error,
//   accessible = true,
//   readOnly = false,
// }) => {
//   const { t } = useTranslation('star_rating');

//   const handleKeyDown = event => {
//     if (!onChange || readOnly) return;

//     if (event.key === 'ArrowRight' && value < totalStars) {
//       event.preventDefault();
//       onChange(value + 1);
//     } else if (event.key === 'ArrowLeft' && value > 0) {
//       event.preventDefault();
//       onChange(value - 1);
//     } else if (event.key === 'Backspace' || event.key === 'Delete') {
//       event.preventDefault();
//       onChange(0);
//     }
//   };

//   const handleClick = starValue => {
//     if (readOnly || !onChange) return;
//     if (starValue === value) {
//       onChange(0);
//     } else {
//       onChange(starValue);
//     }
//   };

//   return (
//     <div className={css['label-input-wrapper']}>
//       <label htmlFor={name} className={css.label}>
//         {t('rating')}*
//       </label>

//       {/* Головний контейнер для поля та помилки */}
//       <div className={css['field-input-and-field-error']}>
//         {/* Контейнер для інпуту (зірок). Всі атрибути доступності та стилі перенесено сюди. */}
//         <div
//           id={name}
//           className={clsx(css['field-input'], {
//             [css['field-error']]: error,
//           })}
//           role={accessible ? 'radiogroup' : undefined}
//           aria-label={accessible ? t('rating') : undefined}
//           tabIndex={accessible ? 0 : undefined}
//           onKeyDown={accessible ? handleKeyDown : undefined}
//           style={{
//             '--active-star-color': colorActive,
//             '--inactive-star-color': colorInactive,
//           }}
//         >
//           {/* Контейнер самих зірок */}
//           <div className={css.stars}>
//             {[...Array(totalStars)].map((_, i) => {
//               const starValue = i + 1;
//               const isFilled = starValue <= value;

//               return (
//                 <span
//                   key={starValue}
//                   className={clsx(css.star, {
//                     [css.filled]: isFilled,
//                     [css.empty]: !isFilled,
//                   })}
//                   style={{
//                     fontSize: `${size}px`,
//                     cursor: readOnly ? 'default' : 'pointer',
//                   }}
//                   role={accessible ? 'radio' : undefined}
//                   aria-checked={accessible ? starValue === value : undefined}
//                   onClick={() => handleClick(starValue)}
//                   onKeyDown={e => {
//                     if (accessible && (e.key === 'Enter' || e.key === ' ')) {
//                       e.preventDefault();
//                       handleClick(starValue);
//                     }
//                   }}
//                 >
//                   ★
//                 </span>
//               );
//             })}
//           </div>
//         </div>

//         {/* Приховане поле та повідомлення про помилку */}
//         {!readOnly && <input type="hidden" name={name} value={value} />}
//         {error && <p className={css['error-popup']}>{error}</p>}
//       </div>
//     </div>
//   );
// };

// StarRating.propTypes = {
//   value: PropTypes.number.isRequired,
//   onChange: PropTypes.func,
//   name: PropTypes.string,
//   totalStars: PropTypes.number,
//   size: PropTypes.number,
//   colorActive: PropTypes.string,
//   colorInactive: PropTypes.string,
//   error: PropTypes.string,
//   accessible: PropTypes.bool,
//   readOnly: PropTypes.bool,
// };

// export default StarRating;
