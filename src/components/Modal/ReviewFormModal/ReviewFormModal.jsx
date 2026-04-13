import { useCallback, useMemo } from 'react';
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

  const fields = useMemo(
    () => [
      {
        name: 'name',
        placeholder: t('name_placeholder'),
        component: 'input',
      },
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
      // Використовуємо validateComment, бо вона повертає null при успіху
      text: v => validateComment(v, t, true),
      rating: v => validateRating(v, t),
    }),
    [t]
  );

  const handleFormSubmit = async formData => {
    try {
      await sendReviewRequest({
        name: {
          uk: formData.name.trim(),
          en: formData.name.trim(),
        },
        // ПЕРЕЙМЕНУЙТЕ КЛЮЧ ТУТ: з text на comment
        comment: {
          uk: formData.text.trim(),
          en: formData.text.trim(),
        },
        rating: formData.rating,
      });
      resetForm();
      onSuccess();
    } catch (error) {
      console.error("Backend still wants 'comment':", error);
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
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title={t('title', 'ВАША ДУМКА')}
    >
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
              {/* ВИПРАВЛЕНО: перевіряємо component, а не text */}
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
              {/* Відображення тексту помилки */}
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
            isFixedWidth={true} // Кнопка завжди буде гарного розміру
          >
            {isSubmitting ? t('processing') : t('submit_btn')}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};

ReviewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
export default ReviewModal;
