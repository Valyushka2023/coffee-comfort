import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import BaseModal from '../BaseModal/BaseModal.jsx';
import Button from '../../Ui/Buttons/BaseButton/BaseButton.jsx';
import clsx from 'clsx';
import css from './ModalCallbackSuccess.module.css';

const ModalCallbackSuccess = ({ isOpen, onClose, className }) => {
  const { t } = useTranslation('callback_modal');

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      className={clsx(css['success-modal'], className)}
    >
      <div className={css['success-icon']}>✓</div>
      <h3 className={css['title-success-form']}>
        {t('success_title', 'Дякуємо!')}
      </h3>
      <p className={css['text-success-form']}>
        {t('success_message', 'Ми перетелефонуємо вам найближчим часом!')}
      </p>
      <div className={css['element-sending']}>
        <Button variant="primary" onClick={onClose} isFixedWidth={true}>
          {t('back_button', 'Зрозуміло')}
        </Button>
      </div>
    </BaseModal>
  );
};

ModalCallbackSuccess.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ModalCallbackSuccess;
