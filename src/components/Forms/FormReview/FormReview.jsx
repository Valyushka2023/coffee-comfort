// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import css from './FormReview.module.css';

// const FormReview = ({ isOpen, onClose, onReviewAdded }) => {
//   const [formData, setFormData] = useState({
//     name_uk: '',
//     name_en: '',
//     text_uk: '',
//     text_en: '',
//     rating: 5,
//   });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       // ... ваша логіка fetch ...
//       window.alert('Відгук додано!');
//       if (onReviewAdded) onReviewAdded();
//       onClose();
//     } catch (err) {
//       window.alert(err.message);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       className={css.overlay}
//       onClick={onClose}
//       onKeyDown={e => e.key === 'Escape' && onClose()}
//       role="button"
//       tabIndex={0}
//       aria-label="Закрити модальне вікно"
//     >
//       <div
//         className={css.modal}
//         onClick={e => e.stopPropagation()}
//         role="presentation"
//       >
//         <form onSubmit={handleSubmit}>
//           <div className={css.field}>
//             <label htmlFor="review-name-uk">Ім&apos;я (UK)</label>
//             <input
//               id="review-name-uk"
//               type="text"
//               required
//               onChange={e =>
//                 setFormData({ ...formData, name_uk: e.target.value })
//               }
//             />
//           </div>
//           {/* Аналогічно для всіх інших полів: обов'язково id та htmlFor */}
//           <button type="submit">Надіслати</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// FormReview.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onReviewAdded: PropTypes.func,
// };

// export default FormReview;
import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import css from './FormReview.module.css';

const FormReview = ({ isOpen, onClose, onReviewAdded }) => {
  const [formData, setFormData] = useState({
    name_uk: '',
    name_en: '',
    text_uk: '',
    text_en: '',
    rating: 5,
  });

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleEsc = e => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log('Дані відгуку:', formData);
      window.alert('Дякуємо за відгук!');
      if (onReviewAdded) onReviewAdded();
      handleClose();
    } catch (err) {
      window.alert('Помилка: ' + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={css.overlay}>
      {/* Кнопка-невидимка на весь екран для закриття. 
          Це 100% валідний спосіб для ESLint.
      */}
      <button
        type="button"
        className={css.backdropButton}
        onClick={handleClose}
        aria-label="Закрити модальне вікно"
      />

      <div
        className={css.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
      >
        <h2 id="review-modal-title" className={css.title}>
          Залишити відгук
        </h2>

        <form onSubmit={handleSubmit} className={css.form}>
          <div className={css.field}>
            <label htmlFor="review-name-uk">Ім&apos;я (UA)</label>
            <input
              id="review-name-uk"
              type="text"
              required
              value={formData.name_uk}
              onChange={e =>
                setFormData({ ...formData, name_uk: e.target.value })
              }
            />
          </div>

          <div className={css.field}>
            <label htmlFor="review-text-uk">Ваш відгук (UA)</label>
            <textarea
              id="review-text-uk"
              required
              rows="4"
              value={formData.text_uk}
              onChange={e =>
                setFormData({ ...formData, text_uk: e.target.value })
              }
            />
          </div>

          <div className={css.ratingField}>
            <label htmlFor="review-rating-select">Оцінка: </label>
            <select
              id="review-rating-select"
              value={formData.rating}
              onChange={e =>
                setFormData({ ...formData, rating: Number(e.target.value) })
              }
            >
              {[5, 4, 3, 2, 1].map(num => (
                <option key={num} value={num}>
                  {num} ★
                </option>
              ))}
            </select>
          </div>

          <div className={css.actions}>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Скасувати
            </Button>
            <Button type="submit" variant="primary">
              Надіслати
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

FormReview.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onReviewAdded: PropTypes.func,
};

export default FormReview;
