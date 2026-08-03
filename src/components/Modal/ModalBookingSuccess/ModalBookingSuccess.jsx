import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import BaseButton from '../../Ui/Buttons/BaseButton/BaseButton.jsx';
import css from './ModalBookingSuccess.module.css';

const ModalBookingSuccess = ({ isOpen, onClose }) => {
  const { t } = useTranslation('form_booking');

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={css['modal-overlay']}
      onClick={handleOverlayClick}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') handleOverlayClick(e);
      }}
      role="button"
      tabIndex={0}
    >
      <div className={css['success-container']} role="dialog" aria-modal="true">
        <div className={css['success-icon']}>✓</div>
        <h3 className={css['title-success-form']}>{t('success_title')}</h3>
        <p className={css['text-success-form']}>{t('success_message')}</p>
        <BaseButton variant="primary" onClick={onClose}>
          {t('back_button')}
        </BaseButton>
      </div>
    </div>
  );
};

ModalBookingSuccess.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalBookingSuccess;
