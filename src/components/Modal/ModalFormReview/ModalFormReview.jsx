import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import BaseModal from '../BaseModal/BaseModal.jsx';
import FormReview from '../../Forms/FormReview/FormReview.jsx'; // Імпортуємо форму
import Button from '../../Ui/Buttons/BaseButton/BaseButton.jsx';

import css from './ModalFormReview.module.css';

const ModalFormReview = ({ isOpen, onClose, onSuccess }) => {
  // Робимо хук точно таким, як у першому коді. Додаємо файл валідації в масив, щоб він був доступний.
  const { t } = useTranslation(['reviews', 'validation']);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFormSubmitSuccess = () => {
    setIsSuccess(true);
  };

  const handleClose = useCallback(() => {
    onClose();

    if (isSuccess) {
      setTimeout(() => {
        const reviewsSection = document.getElementById('reviews');
        if (reviewsSection) {
          const yOffset = -100;
          const y =
            reviewsSection.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;

          window.scrollTo({ top: y, behavior: 'smooth' });
        }

        if (onSuccess) onSuccess();
        setIsSuccess(false);
      }, 350);
    } else {
      setTimeout(() => {
        setIsSuccess(false);
      }, 300);
    }
  }, [onClose, isSuccess, onSuccess]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      // Оскільки префікса немає, пишемо повний шлях до ключів через крапку
      title={isSuccess ? null : t('review_form_modal.title')}
      className={clsx(isSuccess && css['is-success-state'])}
      showCloseButton={!isSuccess}
    >
      {isSuccess ? (
        <div className={css['success-container']}>
          <div className={css['success-icon']}>✓</div>
          {/* Вказуємо повні ключі для стану успіху */}
          <h3 className={css['title-success-form']}>
            {t('review_form_modal.success_title')}
          </h3>
          <p className={css['text-success-form']}>
            {t('review_form_modal.success_message')}
          </p>
          <div className={css['element-sending']}>
            <Button variant="primary" onClick={handleClose} isFixedWidth={true}>
              {t('review_form_modal.back_button')}
            </Button>
          </div>
        </div>
      ) : (
        /* Прокидаємо наш чистий 't' у форму */
        <FormReview onSubmitSuccess={handleFormSubmitSuccess} t={t} />
      )}
    </BaseModal>
  );
};

ModalFormReview.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default ModalFormReview;
