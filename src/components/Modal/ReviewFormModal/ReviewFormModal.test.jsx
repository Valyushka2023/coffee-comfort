// import {
//   render,
//   screen,
//   fireEvent,
//   waitFor,
//   within,
// } from '@testing-library/react';
// import { expect, it, describe, vi } from 'vitest';
// import { MemoryRouter } from 'react-router-dom'; // 1. Додайте цей імпорт
// import ReviewModal from './ReviewModal';

// describe('ReviewModal Component', () => {
//   it('має показувати помилки валідації при порожній відправці', async () => {
//     const mockOnClose = vi.fn();
//     const mockOnSuccess = vi.fn();

//     render(
//       <MemoryRouter>
//         {' '}
//         {/* 2. Обгорніть компонент у MemoryRouter */}
//         <ReviewModal
//           isOpen={true}
//           onClose={mockOnClose}
//           onSuccess={mockOnSuccess}
//         />
//       </MemoryRouter>
//     );

//     const submitButton = screen.getByRole('button', { name: /Send/i });
//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       expect(screen.getByText('errors.rating_required')).toBeInTheDocument();

//       const nameInput = screen.getByPlaceholderText('name_placeholder');
//       const nameWrapper = nameInput.parentElement;
//       expect(
//         within(nameWrapper).getByText('errors.required')
//       ).toBeInTheDocument();

//       const commentInput = screen.getByPlaceholderText('comment_placeholder');
//       const commentWrapper = commentInput.parentElement;
//       expect(
//         within(commentWrapper).getByText('errors.required')
//       ).toBeInTheDocument();
//     });
//   });
// });
/**/
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import BaseModal from '../BaseModal/BaseModal.jsx';
import useForm from '../../../hooks/useForm.js';
import { sendReviewRequest } from '../../../services/api.js';
import Button from '../../Ui/Buttons/BaseButton/Button.jsx';
import StarRating from '../../StarRating/StarRating.jsx';
import {
  validateName,
  validateComment,
  validateRating,
} from '../../../utils/index.js';

import css from './ReviewFormModal.module.css';

const ReviewModal = ({ isOpen, onClose, onSuccess }) => {
  const { t } = useTranslation(['review_form_modal', 'validation']);

  // Стан для перемикання між формою та повідомленням про успіх
  const [isSuccess, setIsSuccess] = useState(false);

  const fields = useMemo(
    () => [
      { name: 'name', placeholder: t('name_placeholder'), component: 'input' },
      {
        name: 'text',
        placeholder: t('text_placeholder'),
        component: 'textarea',
      },
    ],
    [t]
  );

  const validationRules = useMemo(
    () => ({
      name: v => validateName(v, t),
      text: v => validateComment(v, t, true),
      rating: v => validateRating(v, t),
    }),
    [t]
  );

  const handleFormSubmit = async formData => {
    try {
      await sendReviewRequest({
        name: { uk: formData.name.trim(), en: formData.name.trim() },
        text: { uk: formData.text.trim(), en: formData.text.trim() },
        rating: formData.rating,
      });

      setIsSuccess(true);
      resetForm();
    } catch (error) {
      console.error('❌ Error sending review:', error);
    }
  };

  const {
    formData,
    errors,
    isSubmitting,
    hasAttemptedSubmit,
    handleInputChange,
    handleDateChange,
    handleSubmit,
    resetForm,
  } = useForm(
    { name: '', text: '', rating: 0 },
    validationRules,
    handleFormSubmit
  );

  const handleClose = useCallback(() => {
    onClose();
    // Використовуємо таймаут, щоб скинути стан успіху тільки після того,
    // як анімація закриття модалки завершиться
    setTimeout(() => {
      if (isSuccess && onSuccess) onSuccess();
      setIsSuccess(false);
      resetForm();
    }, 300);
  }, [onClose, isSuccess, onSuccess, resetForm]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      // Якщо успіх — прибираємо заголовок "ВАША ДУМКА"
      title={!isSuccess ? t('title', 'ВАША ДУМКА') : null}
    >
      {isSuccess ? (
        /* Рендеримо контент успіху всередині BaseModal */
        <div className={css['success-container']}>
          <div className={css['success-icon']}>✓</div>
          <h3 className={css['title-success-form']}>
            {t('success_title', 'Дякуємо!')}
          </h3>
          <p className={css['text-success-form']}>
            {t('success_message', 'Ваш відгук дуже важливий для нас.')}
          </p>
          <div className={css['element-sending']}>
            <Button variant="primary" onClick={handleClose} isFixedWidth={true}>
              {t('back_button', 'ЗАКРИТИ')}
            </Button>
          </div>
        </div>
      ) : (
        /* Рендеримо форму, якщо ще не надіслано */
        <form className={css['form']} onSubmit={handleSubmit} noValidate>
          <div className={css['rating-field-container']}>
            <StarRating
              value={Number(formData.rating)}
              onChange={value => handleDateChange(value, 'rating')}
              error={hasAttemptedSubmit && errors.rating}
            />
          </div>
          <div className={css['inputs-area-form']}>
            {fields.map(field => (
              <div
                key={field.name}
                className={css['field-input-and-field-error']}
              >
                {field.component === 'textarea' ? (
                  <textarea
                    name={field.name}
                    placeholder={field.placeholder}
                    className={clsx(css['field-area'], {
                      [css['field-error']]:
                        hasAttemptedSubmit && errors[field.name],
                    })}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                  />
                ) : (
                  <input
                    name={field.name}
                    placeholder={field.placeholder}
                    className={clsx(css['field-input'], {
                      [css['field-error']]:
                        hasAttemptedSubmit && errors[field.name],
                    })}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                  />
                )}
                {hasAttemptedSubmit && errors[field.name] && (
                  <p className={css['error-popup']}>{errors[field.name]}</p>
                )}
              </div>
            ))}
          </div>
          <div className={css['element-sending']}>
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              isFixedWidth={true}
            >
              {isSubmitting ? t('processing') : t('submit_btn')}
            </Button>
          </div>
        </form>
      )}
    </BaseModal>
  );
};

ReviewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default ReviewModal;
