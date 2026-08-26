import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import BaseModal from '../BaseModal/BaseModal.jsx';
import FormReview from '../../Forms/FormReview/FormReview.jsx';
import css from './ModalFormReview.module.css';

const ModalFormReview = ({ isOpen, onClose, onSuccess, className }) => {
  const { t } = useTranslation('reviews');

  const handleFormSubmitSuccess = newReviewData => {
    if (onSuccess) {
      onSuccess(newReviewData);
    }
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className={clsx(css['form-review-modal'], className)}
      title={t('review_form_modal.title')}
    >
      <FormReview onSubmitSuccess={handleFormSubmitSuccess} />
    </BaseModal>
  );
};

ModalFormReview.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  className: PropTypes.string,
};

export default ModalFormReview;
