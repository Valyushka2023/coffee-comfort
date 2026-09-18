import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import BaseModal from '../BaseModal/BaseModal.jsx';
import FormCallback from '../../Forms/FormCallback/FormCallback.jsx';
import Button from '../../Ui/Buttons/BaseButton/BaseButton.jsx';
import css from './ModalFormCallback.module.css';

const ModalFormCallback = ({ isOpen, onClose, onSuccess, className }) => {
  const { t } = useTranslation(['callback']);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFormSubmitSuccess = () => {
    setIsSuccess(true); // Перемикаємо стан на показ успіху
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleCloseModal = () => {
    setIsSuccess(false); // Скидаємо стан при закритті
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleCloseModal}
      // Якщо це стан успіху, ховаємо стандартний заголовок BaseModal,
      // оскільки ми намалюємо його всередині разом з іконкою
      title={isSuccess ? '' : t('callback_form_modal.title')}
      className={clsx(css['form-callback-modal'], className)}
    >
      {isSuccess ? (
        <div className={css['success-content-wrapper']}>
          <div className={css['success-icon']}>✓</div>
          <h3 className={css['title-success-form']}>
            {t('callback_success_modal.success_title')}
          </h3>
          <p className={css['text-success-form']}>
            {t('callback_success_modal.success_message')}
          </p>
          <div className={css['element-sending']}>
            <Button
              variant="primary"
              onClick={handleCloseModal}
              isFixedWidth={true}
            >
              {t('callback_success_modal.back_button')}
            </Button>
          </div>
        </div>
      ) : (
        <FormCallback onSubmitSuccess={handleFormSubmitSuccess} />
      )}
    </BaseModal>
  );
};

ModalFormCallback.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  className: PropTypes.string,
};

export default ModalFormCallback;
