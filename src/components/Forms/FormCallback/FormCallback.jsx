import { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import useForm from '../../../hooks/useForm.js';
import { sendCallbackRequest } from '../../../services/api.js';
import Button from '../../Ui/Buttons/BaseButton/BaseButton.jsx';
import { validateName, validatePhone } from '../../../utils/validators.js';

import css from './FormCallback.module.css';

const capitalizeWords = str => {
  return str.replace(/(?:^|\s)\p{L}/gu, match => match.toUpperCase());
};

const FormCallback = ({ onSubmitSuccess }) => {
  const { t } = useTranslation(['callback', 'validation']);

  const fields = useMemo(
    () => [
      {
        name: 'name',
        type: 'text',
        autoCapitalize: 'words',
        autoComplete: 'new-password',
      },
      {
        name: 'phone',
        type: 'tel',
        autoCapitalize: 'none',
        autoComplete: 'new-password',
      },
    ],
    []
  );

  const validationRules = useMemo(
    () => ({
      name: v => validateName(v, t),
      phone: v => validatePhone(v, t),
    }),
    [t]
  );

  const handleFormSubmit = async formData => {
    try {
      await sendCallbackRequest({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        requestedAt: new Date().toISOString(),
      });

      resetForm();
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error('❌ Error sending callback request:', error);
    }
  };

  const {
    formData,
    errors,
    isSubmitting,
    hasAttemptedSubmit,
    handleInputChange: customHandleInputChange,
    handleSubmit,
    resetForm,
  } = useForm({ name: '', phone: '' }, validationRules, handleFormSubmit);

  // Універсальний обробник введення
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
      <div className={css['inputs-area-form']}>
        {fields.map(field => (
          <div key={field.name} className={css['field-input-and-field-error']}>
            <input
              type={field.type}
              name={field.name}
              autoCapitalize={field.autoCapitalize}
              autoComplete={field.autoComplete}
              placeholder={t(`callback_form_modal.${field.name}_placeholder`)}
              className={clsx(css['field-input'], {
                [css['field-error']]: hasAttemptedSubmit && errors[field.name],
              })}
              value={formData[field.name]}
              onChange={handleInputChange}
              onFocus={() => {
                if (field.name === 'phone' && !formData.phone) {
                  handleInputChange({
                    target: { name: 'phone', value: '+380' },
                  });
                }
              }}
            />
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
          {isSubmitting
            ? t('callback_form_modal.processing')
            : t('callback_form_modal.submit_btn')}
        </Button>
      </div>
    </form>
  );
};

FormCallback.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default FormCallback;
