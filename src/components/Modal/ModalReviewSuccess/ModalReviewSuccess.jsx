import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import BaseModal from '../BaseModal/BaseModal.jsx';
import Button from '../../Ui/Buttons/BaseButton/BaseButton.jsx';
import clsx from 'clsx';
import css from './ModalReviewSuccess.module.css';

const ModalReviewSuccess = ({ isOpen, onClose, className }) => {
  const { t } = useTranslation('reviews');

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      className={clsx(css['success-modal'], className)}
    >
      <div className={css['success-icon']}>✓</div>
      <h3 className={css['title-success-form']}>
        {t('review_success_modal.success_title')}
      </h3>
      <p className={css['text-success-form']}>
        {t('review_success_modal.success_message')}
      </p>
      <div className={css['element-sending']}>
        <Button variant="primary" onClick={onClose} isFixedWidth={true}>
          {t('review_success_modal.back_button', 'CLOSE')}
        </Button>
      </div>
    </BaseModal>
  );
};

ModalReviewSuccess.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ModalReviewSuccess;
