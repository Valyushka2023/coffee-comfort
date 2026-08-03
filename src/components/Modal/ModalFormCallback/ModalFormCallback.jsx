import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import BaseModal from '../BaseModal/BaseModal.jsx';
import FormCallback from '../../Forms/FormCallback/FormCallback.jsx';

const ModalFormCallback = ({ isOpen, onClose, onSuccess }) => {
  const { t } = useTranslation(['callback_modal', 'validation']);

  const handleFormSubmitSuccess = () => {
    if (onSuccess) {
      onSuccess();
    } else {
      onClose();
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={t('title', 'Request a call')}
    >
      <FormCallback onSubmitSuccess={handleFormSubmitSuccess} t={t} />
    </BaseModal>
  );
};

ModalFormCallback.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default ModalFormCallback;
