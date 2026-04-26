// import { useCallback, useMemo, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';

// import BaseModal from '../BaseModal/BaseModal.jsx';
// import useForm from '../../../hooks/useForm.js';
// import { sendReviewRequest } from '../../../services/api.js';
// import Button from '../../Ui/Buttons/BaseButton/Button.jsx';
// import StarRating from '../../StarRating/StarRating.jsx';
// import {
//   validateName,
//   validateComment,
//   validateRating,
// } from '../../../utils/index.js';

// import css from './ReviewFormModal.module.css';

// const ReviewFormModal = ({ isOpen, onClose, onSuccess }) => {
//   const { t } = useTranslation(['review_form_modal', 'validation']);
//   const [isSuccess, setIsSuccess] = useState(false);

//   const fields = useMemo(
//     () => [
//       { name: 'name', placeholder: t('name_placeholder'), component: 'input' },
//       {
//         name: 'text',
//         placeholder: t('text_placeholder'),
//         component: 'textarea',
//       },
//     ],
//     [t]
//   );

//   const validationRules = useMemo(
//     () => ({
//       name: v => validateName(v, t),
//       text: v => validateComment(v, t, true),
//       rating: v => validateRating(v, t),
//     }),
//     [t]
//   );

//   const handleFormSubmit = async formData => {
//     try {
//       await sendReviewRequest({
//         name: { uk: formData.name.trim(), en: formData.name.trim() },
//         text: { uk: formData.text.trim(), en: formData.text.trim() },
//         rating: formData.rating,
//       });

//       setIsSuccess(true);
//       resetForm();
//     } catch (error) {
//       console.error('❌ Error sending review:', error);
//     }
//   };

//   const {
//     formData,
//     errors,
//     isSubmitting,
//     hasAttemptedSubmit,
//     handleInputChange,
//     handleDateChange,
//     handleSubmit,
//     resetForm,
//   } = useForm(
//     { name: '', text: '', rating: 0 },
//     validationRules,
//     handleFormSubmit
//   );

//   const handleClose = useCallback(() => {
//     onClose();

//     if (isSuccess) {
//       // Даємо модалці повністю закритися (скинути overflow: hidden)
//       setTimeout(() => {
//         const reviewsSection = document.getElementById('reviews');
//         if (reviewsSection) {
//           // Використовуємо scrollTo для більшої точності
//           const yOffset = -100; // Відступ зверху, щоб заголовок не ховався під хедер
//           const y =
//             reviewsSection.getBoundingClientRect().top +
//             window.pageYOffset +
//             yOffset;

//           window.scrollTo({ top: y, behavior: 'smooth' });
//         }

//         if (onSuccess) onSuccess();
//         setIsSuccess(false);
//         resetForm();
//       }, 350); // Трохи більша затримка, щоб BaseModal встиг очистити body
//     } else {
//       setTimeout(() => {
//         setIsSuccess(false);
//         resetForm();
//       }, 300);
//     }
//   }, [onClose, isSuccess, onSuccess, resetForm]);

//   return (
//     <BaseModal
//       isOpen={isOpen}
//       onClose={handleClose}
//       title={isSuccess ? null : t('title', 'YOUR OPINION')}
//       className={clsx(isSuccess && css['is-success-state'])}
//       showCloseButton={!isSuccess}
//     >
//       {isSuccess ? (
//         <div className={css['success-container']}>
//           <div className={css['success-icon']}>✓</div>
//           <h3 className={css['title-success-form']}>
//             {t('review_form_modal.success_title', 'Thank you!')}
//           </h3>
//           <p className={css['text-success-form']}>
//             {t(
//               'review_form_modal.success_message',
//               'Your feedback is very important to us.'
//             )}
//           </p>
//           <div className={css['element-sending']}>
//             <Button variant="primary" onClick={handleClose} isFixedWidth={true}>
//               {t('review_form_modal.back_button', 'CLOSE')}
//             </Button>
//           </div>
//         </div>
//       ) : (
//         <form className={css['form']} onSubmit={handleSubmit} noValidate>
//           <div className={css['rating-field-container']}>
//             <StarRating
//               value={Number(formData.rating)}
//               onChange={value => handleDateChange(value, 'rating')}
//               error={hasAttemptedSubmit && errors.rating}
//             />
//           </div>
//           <div className={css['inputs-area-form']}>
//             {fields.map(field => (
//               <div
//                 key={field.name}
//                 className={css['field-input-and-field-error']}
//               >
//                 {field.component === 'textarea' ? (
//                   <textarea
//                     name={field.name}
//                     placeholder={field.placeholder}
//                     className={clsx(css['field-area'], {
//                       [css['field-error']]:
//                         hasAttemptedSubmit && errors[field.name],
//                     })}
//                     value={formData[field.name]}
//                     onChange={handleInputChange}
//                   />
//                 ) : (
//                   <input
//                     name={field.name}
//                     placeholder={field.placeholder}
//                     className={clsx(css['field-input'], {
//                       [css['field-error']]:
//                         hasAttemptedSubmit && errors[field.name],
//                     })}
//                     value={formData[field.name]}
//                     onChange={handleInputChange}
//                   />
//                 )}
//                 {hasAttemptedSubmit && errors[field.name] && (
//                   <p className={css['error-popup']}>{errors[field.name]}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className={css['element-sending']}>
//             <Button
//               variant="primary"
//               type="submit"
//               disabled={isSubmitting}
//               isFixedWidth={true}
//             >
//               {isSubmitting
//                 ? t('review_form_modal.processing')
//                 : t('review_form_modal.submit_btn')}
//             </Button>
//           </div>
//         </form>
//       )}
//     </BaseModal>
//   );
// };

// ReviewFormModal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onSuccess: PropTypes.func.isRequired,
// };

// export default ReviewFormModal;
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import BaseModal from '../BaseModal/BaseModal.jsx';
import useForm from '../../../hooks/useForm.js';
import { sendReviewRequest } from '../../../services/api.js';
import Button from '../../Ui/Buttons/BaseButton/Button.jsx';
import StarRating from '../../StarRating/StarRating.jsx';
import {
  validateName,
  validateComment,
  validateRating,
} from '../../../utils/index.js';

import css from './ReviewFormModal.module.css';

const ReviewFormModal = ({ isOpen, onClose, onSuccess }) => {
  // Використовуємо файл 'reviews', і вказуємо keyPrefix, щоб не писати довгі шляхи
  const { t } = useTranslation('reviews', { keyPrefix: 'review_form_modal' });

  const [isSuccess, setIsSuccess] = useState(false);

  const fields = useMemo(
    () => [
      { name: 'name', placeholder: t('name_placeholder'), component: 'input' },
      {
        name: 'text',
        placeholder: t('text_placeholder'),
        component: 'textarea',
      },
    ],
    [t]
  );

  const validationRules = useMemo(
    () => ({
      name: v => validateName(v, t),
      text: v => validateComment(v, t, true),
      rating: v => validateRating(v, t),
    }),
    [t]
  );

  const handleFormSubmit = async formData => {
    try {
      await sendReviewRequest({
        name: { uk: formData.name.trim(), en: formData.name.trim() },
        text: { uk: formData.text.trim(), en: formData.text.trim() },
        rating: formData.rating,
      });

      setIsSuccess(true);
      resetForm();
    } catch (error) {
      console.error('❌ Error sending review:', error);
    }
  };

  const {
    formData,
    errors,
    isSubmitting,
    hasAttemptedSubmit,
    handleInputChange,
    handleDateChange,
    handleSubmit,
    resetForm,
  } = useForm(
    { name: '', text: '', rating: 0 },
    validationRules,
    handleFormSubmit
  );

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
        resetForm();
      }, 350);
    } else {
      setTimeout(() => {
        setIsSuccess(false);
        resetForm();
      }, 300);
    }
  }, [onClose, isSuccess, onSuccess, resetForm]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title={isSuccess ? null : t('title')}
      className={clsx(isSuccess && css['is-success-state'])}
      showCloseButton={!isSuccess}
    >
      {isSuccess ? (
        <div className={css['success-container']}>
          <div className={css['success-icon']}>✓</div>
          <h3 className={css['title-success-form']}>{t('success_title')}</h3>
          <p className={css['text-success-form']}>{t('success_message')}</p>
          <div className={css['element-sending']}>
            <Button variant="primary" onClick={handleClose} isFixedWidth={true}>
              {t('back_button')}
            </Button>
          </div>
        </div>
      ) : (
        <form className={css['form']} onSubmit={handleSubmit} noValidate>
          <div className={css['rating-field-container']}>
            <StarRating
              value={Number(formData.rating)}
              onChange={value => handleDateChange(value, 'rating')}
              error={hasAttemptedSubmit && errors.rating}
            />
          </div>
          <div className={css['inputs-area-form']}>
            {fields.map(field => (
              <div
                key={field.name}
                className={css['field-input-and-field-error']}
              >
                {field.component === 'textarea' ? (
                  <textarea
                    name={field.name}
                    placeholder={field.placeholder}
                    className={clsx(css['field-area'], {
                      [css['field-error']]:
                        hasAttemptedSubmit && errors[field.name],
                    })}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                  />
                ) : (
                  <input
                    name={field.name}
                    placeholder={field.placeholder}
                    className={clsx(css['field-input'], {
                      [css['field-error']]:
                        hasAttemptedSubmit && errors[field.name],
                    })}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                  />
                )}
                {hasAttemptedSubmit && errors[field.name] && (
                  <p className={css['error-popup']}>{errors[field.name]}</p>
                )}
              </div>
            ))}
          </div>
          <div className={css['element-sending']}>
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              isFixedWidth={true}
            >
              {isSubmitting ? t('processing') : t('submit_btn')}
            </Button>
          </div>
        </form>
      )}
    </BaseModal>
  );
};

ReviewFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default ReviewFormModal;
