import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useForm from '../../../hooks/useForm.js';
import clsx from 'clsx';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import uk from 'date-fns/locale/uk';
import en from 'date-fns/locale/en-US';
import { sendBookingRequest } from '../../../services/api.js';
import Button from '../../Ui/Buttons/BaseButton/Button.jsx';
import AtmosphereSelector from '../../../components/AtmosphereSelector/AtmosphereSelector.jsx';
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
  selectedZone: '',
};

const FORM_FIELDS = [
  { id: 'user-name-input', name: 'name', label: 'name_label', type: 'text' },
  {
    id: 'user-email-input',
    name: 'email',
    label: 'email_label',
    type: 'email',
  },
  { id: 'user-phone-input', name: 'phone', label: 'phone_label', type: 'tel' },
];

const FormBooking = () => {
  const { t, i18n } = useTranslation(['form_booking', 'validation']);
  const [isSuccess, setIsSuccess] = useState(false);

  const currentLocale = i18n.language.startsWith('uk') ? 'uk' : 'en';

  const validationRules = useMemo(
    () => ({
      name: v => validateName(v, t),
      email: v => validateEmail(v, t),
      phone: v => validatePhone(v, t),
      bookingStartDate: v => validateRequired(v, t),
      comment: v => validateComment(v, t, true),
      selectedZone: () => null,
    }),
    [t]
  );

  const onSubmit = async currentFormData => {
    const zoneLabels = {
      window: t('zones.window', 'Біля вікна'),
      lounge: t('zones.lounge', 'Лаунж-зона'),
      work: t('zones.work', 'Робоча зона'),
    };

    const bookingData = {
      camperId: '64f1a2b3c4d5e6f7a8b9c0d1',
      name: currentFormData.name.trim(),
      email: currentFormData.email.trim(),
      phone: currentFormData.phone.trim(),
      selectedZone:
        zoneLabels[currentFormData.selectedZone] ||
        t('zones.not_selected', 'Не обрано'),
      comment: currentFormData.comment.trim(),
      bookingStartDate:
        currentFormData.bookingStartDate?.toLocaleString() || null,
    };

    try {
      const response = await sendBookingRequest(bookingData);
      if (response) setIsSuccess(true);
    } catch (error) {
      console.error('Submission error:', error.response?.data || error.message);
      throw error;
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
    setFormData,
  } = useForm(initialState, validationRules, onSubmit);

  const handleCloseSuccess = () => {
    if (typeof setFormData === 'function') {
      setFormData(initialState);
    }
    setIsSuccess(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleZoneSelect = useCallback(
    zoneId => {
      if (typeof setFormData === 'function') {
        setFormData(prev => ({ ...prev, selectedZone: zoneId }));
      }
    },
    [setFormData]
  );

  if (isSuccess) {
    return (
      <div className={css['success-wrapper']}>
        <div className={css['success-container']}>
          <div className={css['success-icon']}>✓</div>
          <h3 className={css['title-success-form']}>
            {t('success_title', 'Успіх!')}
          </h3>
          <p className={css['text-success-form']}>
            {t(
              'success_message',
              'Ваш столик заброньовано. Ми зателефонуємо вам найближчим часом.'
            )}
          </p>
          <Button variant="primary" onClick={handleCloseSuccess}>
            {t('back_button', 'Close')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className={css['form']} onSubmit={handleSubmit} noValidate>
      <h3 className={css['title-form']}>{t('title')}</h3>

      <AtmosphereSelector
        selectedZone={formData.selectedZone}
        onSelect={handleZoneSelect}
      />

      <div className={css['inputs-area-form']}>
        {FORM_FIELDS.map(field => (
          <div key={field.name} className={css['label-input-wrapper']}>
            <label htmlFor={field.id} className={css['label']}>
              {t(field.label)}*
            </label>

            <div className={css['field-input-and-field-error']}>
              <input
                id={field.id}
                name={field.name}
                type={field.type}
                className={clsx(
                  css['field-input'],
                  hasAttemptedSubmit && errors[field.name] && css['field-error']
                )}
                value={formData[field.name]}
                onChange={handleInputChange}
                placeholder={t(`${field.name}_placeholder`)}
              />
              {hasAttemptedSubmit && errors[field.name] && (
                <p className={css['error-popup']}>{errors[field.name]}</p>
              )}
            </div>
          </div>
        ))}

        <div className={css['label-input-wrapper']}>
          <label className={css['label']}>{t('date_label')}*</label>
          <div className={css['field-input-and-field-error']}>
            <DatePicker
              selected={formData.bookingStartDate}
              onChange={date => handleDateChange(date, 'bookingStartDate')}
              locale={currentLocale}
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm"
              placeholderText={t('date_placeholder', 'Оберіть дату та час')}
              className={clsx(
                css['field-input'],
                hasAttemptedSubmit &&
                  errors.bookingStartDate &&
                  css['field-error']
              )}
            />
            {hasAttemptedSubmit && errors.bookingStartDate && (
              <p className={css['error-popup']}>{errors.bookingStartDate}</p>
            )}
          </div>
        </div>

        <div className={css['label-area-wrapper']}>
          <label className={css['label']}>{t('comment_label')}*</label>
          <div className={css['field-area-and-field-error']}>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              placeholder={t('comment_placeholder', 'Ваш коментар')}
              className={clsx(
                css['field-area'],
                hasAttemptedSubmit && errors.comment && css['field-error']
              )}
            />
            {hasAttemptedSubmit && errors.comment && (
              <p className={css['error-popup']}>{errors.comment}</p>
            )}
          </div>
        </div>
      </div>

      <div className={css['element-sending']}>
        {submissionError && (
          <p className={css['general-error-popup']}>
            {t('submit_error', 'Помилка відправки. Спробуйте ще раз.')}
          </p>
        )}
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('sending') : t('send')}
        </Button>
      </div>
    </form>
  );
};

export default FormBooking;
