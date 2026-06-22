import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import BaseModal from '../BaseModal/BaseModal.jsx';
import FormCallback from '../../Forms/FormCallback/FormCallback.jsx';

const ModalFormCallback = ({ isOpen, onClose }) => {
  const { t } = useTranslation(['callback_modal']);

  const handleFormSubmitSuccess = () => {
    onClose();
    // Тут залишаємо ваш alert (або згодом замінимо на красиве success-вікно, як у відгуках)
    window.alert(t('success_message', 'We will call you!'));
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={t('title', 'Request a call')}
    >
      <FormCallback onSubmitSuccess={handleFormSubmitSuccess} />
    </BaseModal>
  );
};

ModalFormCallback.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalFormCallback;
