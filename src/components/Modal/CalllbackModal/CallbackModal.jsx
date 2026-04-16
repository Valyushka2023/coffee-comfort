import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import BaseModal from '../BaseModal/BaseModal.jsx';
import useForm from '../../../hooks/useForm.js';
import { sendCallbackRequest } from '../../../services/api.js';
import Button from '../../Ui/Buttons/BaseButton/Button.jsx';
import { validateName, validatePhone } from '../../../utils/validators.js';

import css from './CallbackModal.module.css';

const CallbackModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation(['callback_modal', 'validation']);

  const fields = useMemo(
    () => [
      {
        name: 'name',
        type: 'text',
      },
      {
        name: 'phone',
        type: 'tel',
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
    await sendCallbackRequest({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      requestedAt: new Date().toISOString(),
    });
    resetForm();
    onClose();
    window.alert(t('success_message', 'We will call you!'));
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

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title={t('title', 'Request a call')}
    >
      <form className={css['form']} onSubmit={handleSubmit} noValidate>
        <div className={css['inputs-area-form']}>
          {fields.map(field => (
            <div
              key={field.name}
              className={css['field-input-and-field-error']}
            >
              <input
                type={field.type}
                name={field.name}
                placeholder={t(`${field.name}_placeholder`)}
                className={clsx(css['field-input'], {
                  [css['field-error']]:
                    hasAttemptedSubmit && errors[field.name],
                })}
                value={formData[field.name]}
                onChange={handleInputChange}
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
    </BaseModal>
  );
};

CallbackModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CallbackModal;
