import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useForm from '../../../hooks/useForm.js';
import clsx from 'clsx';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import uk from 'date-fns/locale/uk';
import en from 'date-fns/locale/en-US';
import { sendBookingRequest } from '../../../services/api.js';
import Button from '../../Ui/Buttons/BaseButton/Button.jsx';
import {
  validateName,
  validateEmail,
  validatePhone,
  validateRequired,
  validateComment,
} from '../../../utils/index.js';
import css from './FormBooking.module.css';

registerLocale('uk', uk);
registerLocale('en', en);

const initialState = {
  name: '',
  email: '',
  phone: '',
  bookingStartDate: null,
  comment: '',
};

const FormBooking = () => {
  // const { t, i18n } = useTranslation();
  const { t, i18n } = useTranslation('form_booking');
  const [isSuccess, setIsSuccess] = useState(false);

  // Описуємо правила валідації всередині компонента, щоб мати доступ до 't'
  const validationRules = useMemo(
    () => ({
      name: v => validateName(v, t),
      email: v => validateEmail(v, t),
      phone: v => validatePhone(v, t),
      bookingStartDate: v => validateRequired(v, t),
      comment: v => validateComment(v, t, true),
    }),
    [t]
  );

  const onSubmit = async formData => {
    const bookingData = {
      camperId: '64f1a2b3c4d5e6f7a8b9c0d1', // Замініть на реальний ID, якщо потрібно
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      comment: formData.comment.trim(),
      bookingStartDate: formData.bookingStartDate
        ? formData.bookingStartDate.toISOString()
        : null,
    };

    try {
      const response = await sendBookingRequest(bookingData);
      if (response) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error(
        'Деталі помилки від сервера:',
        error.response?.data || error.message
      );
      throw error; // Передаємо помилку в useForm для відображення submissionError
    }
  };

  const {
    formData,
    errors,
    isSubmitting,
    hasAttemptedSubmit,
    submissionError,
    handleInputChange,
    handleDateChange,
    handleSubmit,
  } = useForm(initialState, validationRules, onSubmit);

  // --- ЛОГІКА ОБМЕЖЕННЯ ЧАСУ ---
  const getMinTime = selectedDate => {
    const date = selectedDate || new Date();
    const min = new Date(date);
    if (date.toDateString() === new Date().toDateString()) {
      const now = new Date();
      if (now.getHours() < 9) {
        min.setHours(9, 0, 0);
      } else {
        min.setHours(now.getHours(), now.getMinutes(), 0);
      }
    } else {
      min.setHours(9, 0, 0);
    }
    return min;
  };

  const getMaxTime = selectedDate => {
    const date = selectedDate || new Date();
    const max = new Date(date);
    max.setHours(23, 0, 0);
    return max;
  };

  const handleCloseSuccess = () => {
    setIsSuccess(false);
    window.location.reload();
  };

  if (isSuccess) {
    return (
      <div className={css['success-container']}>
        <div className={css['success-icon']}>✓</div>
        <h3 className={css['title-form']}>{t('success_title', 'Success!')}</h3>
        <p className={css['text-form']}>
          {t(
            'success_message',
            'Your table has been booked. We will call you back soon.'
          )}
        </p>
        <Button variant="primary" onClick={handleCloseSuccess}>
          {t('back_button', 'Close')}
        </Button>
      </div>
    );
  }

  return (
    <form
      id="booking-form"
      className={css['form']}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={css['title-text-form']}>
        <h3 className={css['title-form']}>{t('title', 'Book a table now')}</h3>
        <p className={css['text-form']}>
          {t('text', 'We are always in touch, ready to help you!')}
        </p>
      </div>

      <div className={css['inputs-area-form']}>
        {[
          {
            id: 'user-name-input',
            name: 'name',
            label: 'name_label',
            type: 'text',
          },
          {
            id: 'user-email-input',
            name: 'email',
            label: 'email_label',
            type: 'email',
          },
          {
            id: 'user-phone-input',
            name: 'phone',
            label: 'phone_label',
            type: 'tel',
          },
        ].map(field => (
          <div key={field.name} className={css['label-input-wrapper']}>
            <label htmlFor={field.id} className={css['label']}>
              {t(field.label)}*
            </label>
            <div className={css['field-input-and-field-error']}>
              <input
                id={field.id}
                name={field.name}
                type={field.type}
                placeholder={t(`${field.name}_placeholder`)}
                className={clsx(css['field-input'], {
                  [css['field-error']]:
                    hasAttemptedSubmit && errors[field.name],
                })}
                value={formData[field.name]}
                onChange={handleInputChange}
              />
              {hasAttemptedSubmit && errors[field.name] && (
                <p className={css['error-popup']}>{errors[field.name]}</p>
              )}
            </div>
          </div>
        ))}

        <div className={css['label-input-wrapper']}>
          <label htmlFor="booking-start-date" className={css['label']}>
            {t('date_label')}*
          </label>
          <div
            className={clsx(
              css['field-input-and-field-error'],
              css['datepicker-wrapper']
            )}
          >
            <DatePicker
              id="booking-start-date"
              selected={formData.bookingStartDate}
              onChange={date => handleDateChange(date, 'bookingStartDate')}
              locale={
                i18n.language === 'ua' || i18n.language === 'uk' ? 'uk' : 'en'
              }
              showTimeSelect
              minTime={getMinTime(formData.bookingStartDate)}
              maxTime={getMaxTime(formData.bookingStartDate)}
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption={t('time_label', 'Time')}
              dateFormat="yyyy-MM-dd HH:mm"
              time24hr={true}
              popperPlacement="top-end"
              minDate={new Date()}
              placeholderText={t('booking_start_date_placeholder')}
              className={clsx(css['field-input'], {
                [css['field-error']]:
                  hasAttemptedSubmit && errors.bookingStartDate,
              })}
            />
            {hasAttemptedSubmit && errors.bookingStartDate && (
              <p className={css['error-popup']}>{errors.bookingStartDate}</p>
            )}
          </div>
        </div>

        <div className={css['label-area-wrapper']}>
          <div className={css['label-and-counter-wrapper']}>
            <label htmlFor="user-comment" className={css['label']}>
              {t('comment_label')}*
            </label>
            <p
              className={clsx(
                css['char-count'],
                formData.comment.length >= 150 && css['char-count-warning']
              )}
            >
              {formData.comment.length} / 150
            </p>
          </div>
          <div className={css['field-area-and-field-error']}>
            <textarea
              id="user-comment"
              name="comment"
              spellCheck="false"
              placeholder={t('comment_placeholder')}
              className={clsx(css['field-area'], {
                [css['field-error']]: hasAttemptedSubmit && errors.comment,
              })}
              value={formData.comment}
              onChange={handleInputChange}
            />
            {hasAttemptedSubmit && errors.comment && (
              <p className={css['error-popup']}>{errors.comment}</p>
            )}
          </div>
        </div>
      </div>

      <div className={css['element-sending']}>
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('sending', 'Sending...') : t('send_button', 'Send')}
        </Button>
        {submissionError && (
          <p className={clsx(css['error-popup'], css['general-error-popup'])}>
            {submissionError}
          </p>
        )}
      </div>
    </form>
  );
};

export default FormBooking;
