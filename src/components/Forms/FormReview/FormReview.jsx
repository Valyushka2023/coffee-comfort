import { useMemo, useCallback } from 'react';
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

// Допоміжна функція для капіталізації першої літери кожного слова
const capitalizeWords = str => {
  return str.replace(/(?:^|\s)\p{L}/gu, match => match.toUpperCase());
};

const FormReview = ({ onSubmitSuccess }) => {
  // Переклад для елементів інтерфейсу форми (плейсхолдери, кнопки)
  const { t } = useTranslation('reviews', { keyPrefix: 'review_form_modal' });

  // Окремий перекладач для валідації, щоб вона чітко брала тексти з validation.json
  const { t: tValidation } = useTranslation('validation');

  const fields = useMemo(
    () => [
      {
        name: 'name',
        placeholder: t('name_placeholder'),
        component: 'input',
        autoCapitalize: 'words',
        autoComplete: 'new-password',
      },
      {
        name: 'text',
        placeholder: t('text_placeholder'),
        component: 'textarea',
        autoCapitalize: 'sentences',
        autoComplete: 'off',
      },
    ],
    [t]
  );

  const validationRules = useMemo(
    () => ({
      name: v => validateName(v, tValidation),
      text: v => validateComment(v, tValidation, true),
      rating: v => validateRating(v, tValidation),
    }),
    [tValidation]
  );

  const handleFormSubmit = async formData => {
    try {
      const response = await sendReviewRequest({
        name: { uk: formData.name.trim(), en: formData.name.trim() },
        text: { uk: formData.text.trim(), en: formData.text.trim() },
        rating: Number(formData.rating),
      });

      const rawReview =
        response?.data?.data ||
        response?.data?.review ||
        response?.data ||
        response;

      const createdDate =
        rawReview?.createdAt || rawReview?.date || new Date().toISOString();

      const formattedReview = {
        _id: String(rawReview?._id || rawReview?.id || Date.now()),
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
        createdAt: createdDate,
        date: createdDate,
      };

      resetForm();

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
    handleInputChange: customHandleInputChange,
    handleDateChange,
    handleSubmit,
    resetForm,
  } = useForm(
    { name: '', text: '', rating: 0 },
    validationRules,
    handleFormSubmit
  );

  // Кастомний обробник введення з капіталізацією першої літери імені
  const handleInputChange = useCallback(
    e => {
      const target = e.target || e;
      const { name, value, selectionStart } = target;

      if (name === 'name') {
        const formattedValue = capitalizeWords(value);

        customHandleInputChange({
          target: { name, value: formattedValue },
        });

        if (e.target && selectionStart !== undefined) {
          requestAnimationFrame(() => {
            if (e.target) {
              e.target.setSelectionRange(selectionStart, selectionStart);
            }
          });
        }
      } else {
        customHandleInputChange({
          target: { name, value },
        });
      }
    },
    [customHandleInputChange]
  );

  return (
    <form
      className={css['form']}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
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
                autoCapitalize={field.autoCapitalize}
                autoComplete={field.autoComplete}
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
                autoCapitalize={field.autoCapitalize}
                autoComplete={field.autoComplete}
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
};

export default FormReview;
