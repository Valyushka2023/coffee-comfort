import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '../../Ui/Buttons/BaseButton/BaseButton.jsx';
import css from './ModalReviewSuccess.module.css';

const ModalReviewSuccess = ({ isOpen, onClose }) => {
  const { t } = useTranslation('reviews');

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
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
        <h3 className={css['title-success-form']}>
          {t('review_form_modal.success_title')}
        </h3>
        <p className={css['text-success-form']}>
          {t('review_form_modal.success_message')}
        </p>
        <div className={css['element-sending']}>
          <Button variant="primary" onClick={onClose} isFixedWidth={true}>
            {t('review_form_modal.back_button')}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

ModalReviewSuccess.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalReviewSuccess;
