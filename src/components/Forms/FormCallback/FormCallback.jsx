import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import useForm from '../../../hooks/useForm.js';
import { sendCallbackRequest } from '../../../services/api.js';
import Button from '../../Ui/Buttons/BaseButton/BaseButton.jsx';
import { validateName, validatePhone } from '../../../utils/validators.js';

import css from './FormCallback.module.css';

const FormCallback = ({ onSubmitSuccess }) => {
  const { t } = useTranslation(['callback_modal', 'validation']);

  const fields = useMemo(
    () => [
      { name: 'name', type: 'text' },
      { name: 'phone', type: 'tel' },
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
    handleInputChange,
    handleSubmit,
    resetForm,
  } = useForm({ name: '', phone: '' }, validationRules, handleFormSubmit);

  return (
    <form className={css['form']} onSubmit={handleSubmit} noValidate>
      <div className={css['inputs-area-form']}>
        {fields.map(field => (
          <div key={field.name} className={css['field-input-and-field-error']}>
            <input
              type={field.type}
              name={field.name}
              placeholder={t(`${field.name}_placeholder`)}
              className={clsx(css['field-input'], {
                [css['field-error']]: hasAttemptedSubmit && errors[field.name],
              })}
              value={formData[field.name]}
              onChange={handleInputChange}
              /* АВТОМАТИЧНИЙ ПРЕФІКС ПРИ ФОКУСІ */
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
          {isSubmitting ? t('processing') : t('submit_btn')}
        </Button>
      </div>
    </form>
  );
};

FormCallback.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default FormCallback;
