import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import useForm from '../../../hooks/useForm.js';
import { sendReviewRequest } from '../../../services/api.js';
import Button from '../../Ui/Buttons/BaseButton/BaseButton.jsx';
import StarRating from '../../Ui/StarRating/StarRating.jsx';
import {
  validateName,
  validateComment,
  validateRating,
} from '../../../utils/index.js';

import css from './FormReview.module.css';

const FormReview = ({ onSubmitSuccess, t: tParent }) => {
  const { t } = useTranslation('reviews', { keyPrefix: 'review_form_modal' });

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
      name: v => validateName(v, tParent),
      text: v => validateComment(v, tParent, true),
      rating: v => validateRating(v, tParent),
    }),
    [tParent]
  );

  const handleFormSubmit = async formData => {
    try {
      const response = await sendReviewRequest({
        name: { uk: formData.name.trim(), en: formData.name.trim() },
        text: { uk: formData.text.trim(), en: formData.text.trim() },
        rating: Number(formData.rating),
      });

      console.log('📦 Відповідь сервера:', response);

      // Витягуємо чистий об'єкт відгуку з можливих рівнів вкладеності (Axios / Fetch)
      const rawReview =
        response?.data?.data ||
        response?.data?.review ||
        response?.data ||
        response;

      // Формуємо гарантовано коректну структуру відгуку для стану React
      const formattedReview = {
        _id: rawReview?._id || rawReview?.id || Date.now().toString(),
        name: rawReview?.name || {
          uk: formData.name.trim(),
          en: formData.name.trim(),
        },
        text: rawReview?.text ||
          rawReview?.comment || {
            uk: formData.text.trim(),
            en: formData.text.trim(),
          },
        rating: Number(rawReview?.rating || formData.rating),
        createdAt:
          rawReview?.createdAt || rawReview?.date || new Date().toISOString(),
      };

      resetForm();

      // Викликаємо колбек і передаємо відформатований відгук нагору
      if (onSubmitSuccess) {
        onSubmitSuccess(formattedReview);
      }
    } catch (error) {
      console.error('Помилка при відправці відгуку:', error);
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

  return (
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
          <div key={field.name} className={css['field-input-and-field-error']}>
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
  );
};

FormReview.propTypes = {
  onSubmitSuccess: PropTypes.func,
  t: PropTypes.func.isRequired,
};

export default FormReview;
