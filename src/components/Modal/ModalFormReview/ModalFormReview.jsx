import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import BaseModal from '../BaseModal/BaseModal.jsx';
import FormReview from '../../Forms/FormReview/FormReview.jsx';

const ModalFormReview = ({ isOpen, onClose, onSuccess }) => {
  const { t } = useTranslation(['reviews', 'validation']);

  const handleFormSubmitSuccess = () => {
    onClose();
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={t('review_form_modal.title')}
    >
      <FormReview onSubmitSuccess={handleFormSubmitSuccess} t={t} />
    </BaseModal>
  );
};

ModalFormReview.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default ModalFormReview;
