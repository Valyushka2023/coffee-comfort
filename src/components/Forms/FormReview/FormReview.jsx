// import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { v4 as uuidv4 } from 'uuid';
// import clsx from 'clsx';
// import useForm from '../../../hooks/useForm.js';
// import Button from '../../Ui/Buttons/BaseButton/Button.jsx';
// import StarRating from '../../StarRating/StarRating.jsx';
// import css from './FormReview.module.css';

// const FormReview = ({ camperId, onReviewAdded }) => {
//   const { t } = useTranslation('form_reviews');
//   const navigate = useNavigate();

//   const initialState = {
//     name: '',
//     email: '',
//     rating: 0,
//     comment: '',
//   };

//   const validationRules = {
//     name: value =>
//       !value.trim()
//         ? t('errors.required')
//         : value.length < 2 || value.length > 20
//           ? t('errors.name_length')
//           : null,
//     email: value =>
//       !value.trim()
//         ? t('errors.required')
//         : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
//           ? t('errors.invalid_email')
//           : value.length > 40
//             ? t('errors.email_tooLong')
//             : null,
//     rating: value => (!value ? t('errors.rating') : null),
//     comment: value =>
//       !value.trim()
//         ? t('errors.required')
//         : value.length > 150
//           ? t('errors.comment_tooLong')
//           : null,
//   };

//   const onSubmit = async formData => {
//     const reviewToSend = {
//       reviewer_name: formData.name.trim(),
//       reviewer_rating: parseInt(formData.rating, 10),
//       comment: formData.comment.trim(),
//       email: formData.email.trim(),
//       id: uuidv4(),
//       camperId,
//       createdAt: new Date().toISOString(),
//     };

//     try {
//       await new Promise(resolve => setTimeout(resolve, 300));
//       await onReviewAdded(reviewToSend);
//       navigate('/thank-you');
//     } catch (err) {
//       console.error('Error sending form:', err);
//     }
//   };

//   const {
//     formData,
//     errors,
//     isSubmitting,
//     hasAttemptedSubmit,
//     submissionError,
//     handleInputChange,
//     handleSubmit,
//   } = useForm(initialState, validationRules, onSubmit);

//   return (
//     <form className={css.form} onSubmit={handleSubmit} noValidate>
//       <div className={css['title-text-form']}>
//         <h3 className={css['title-form']}>{t('title')}</h3>
//         <p className={css['text-form']}>{t('text')}</p>
//       </div>
//       <div className={css['inputs-area-form']}>
//         <div className={css['label-input-wrapper']}>
//           <label htmlFor="user-name-input" className={css.label}>
//             {t('name_label')}*
//           </label>
//           <div className={css['field-input-and-field-error']}>
//             <input
//               id="user-name-input"
//               name="name"
//               type="text"
//               className={clsx(css['field-input'], {
//                 [css['field-error']]: hasAttemptedSubmit && errors.name,
//               })}
//               value={formData.name}
//               onChange={handleInputChange}
//               required
//             />
//             {hasAttemptedSubmit && errors.name && (
//               <p className={css['error-popup']}>{errors.name}</p>
//             )}
//           </div>
//         </div>

//         <div className={css['label-input-wrapper']}>
//           <label htmlFor="user-email-input" className={css.label}>
//             {t('email_label')}*
//           </label>
//           <div className={css['field-input-and-field-error']}>
//             <input
//               id="user-email-input"
//               name="email"
//               type="email"
//               className={clsx(css['field-input'], {
//                 [css['field-error']]: hasAttemptedSubmit && errors.email,
//               })}
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />
//             {hasAttemptedSubmit && errors.email && (
//               <p className={css['error-popup']}>{errors.email}</p>
//             )}
//           </div>
//         </div>

//         <StarRating
//           value={formData.rating}
//           onChange={rating =>
//             handleInputChange({ target: { name: 'rating', value: rating } })
//           }
//           name="rating"
//           error={hasAttemptedSubmit ? errors.rating : null}
//           accessible={true}
//           className={css['rating-field']}
//         />

//         <div className={css['label-area-wrapper']}>
//           <div className={css['label-and-counter-wrapper']}>
//             <label htmlFor="user-comment" className={css.label}>
//               {t('comment_label')}*
//             </label>
//             <p
//               className={clsx(css['char-count'], {
//                 [css['char-count-warning']]: formData.comment.length >= 150,
//               })}
//             >
//               {formData.comment.length} / 150
//             </p>
//           </div>
//           <div className={clsx(css['field-area-and-field-error'])}>
//             <textarea
//               id="user-comment"
//               name="comment"
//               placeholder={t('comment_placeholder')}
//               className={clsx(css['field-area'], {
//                 [css['field-error']]: hasAttemptedSubmit && errors.comment,
//               })}
//               value={formData.comment}
//               onChange={handleInputChange}
//               required
//             />
//             {hasAttemptedSubmit && errors.comment && (
//               <p className={css['error-popup']}>{errors.comment}</p>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className={css['element-submit']}>
//         <Button
//           variant="primary"
//           size="medium"
//           type="submit"
//           disabled={
//             isSubmitting || Object.values(errors).some(error => error !== null)
//           }
//         >
//           {isSubmitting
//             ? t('submiting_button', { ns: 'button' })
//             : t('submit_button', { ns: 'button' })}
//         </Button>
//         {submissionError && (
//           <p className={clsx(css['error-popup'], css['general-error-popup'])}>
//             {submissionError}
//           </p>
//         )}
//       </div>
//     </form>
//   );
// };

// FormReview.propTypes = {
//   camperId: PropTypes.string.isRequired,
//   onReviewAdded: PropTypes.func.isRequired,
// };

// export default FormReview;
