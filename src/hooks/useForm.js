import { useState, useCallback } from 'react';

const useForm = (initialState, validationRules, onSubmit) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  // Використовуємо useCallback, щоб посилання на функцію не змінювалося
  const resetForm = useCallback(() => {
    setFormData(initialState);
    setErrors({});
    setHasAttemptedSubmit(false);
    setSubmissionError(null);
  }, [initialState]);

  const updateErrors = (name, value) => {
    if (validationRules[name]) {
      const error = validationRules[name](value);
      setErrors(prev => {
        const newErrors = { ...prev };
        if (error) {
          newErrors[name] = error;
        } else {
          delete newErrors[name];
        }
        return newErrors;
      });
    }
  };

  const handleInputChange = e => {
    let { name, value } = e.target;

    // Маска для автоматичного формування українського номера (+380)
    if (name === 'phone') {
      if (value === '' || value === '+380') {
        // Дозволяємо стерти поле повністю або залишити лише префікс
      } else if (!value.startsWith('+380')) {
        const digits = value.replace(/\D/g, '');
        if (digits.startsWith('380')) {
          value = '+' + digits;
        } else {
          value = '+380' + digits.replace(/^0+/, '');
        }
      }

      // Залишаємо лише 9 цифр після +380 (всього 13 символів)
      const prefix = '+380';
      const dynamicPart = value.slice(4).replace(/\D/g, '').slice(0, 9);
      value = prefix + dynamicPart;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    updateErrors(name, value);
  };

  const handleDateChange = (date, name) => {
    setFormData(prev => ({ ...prev, [name]: date }));
    updateErrors(name, date);
  };

  const handleSubmit = async e => {
    if (e && e.preventDefault) e.preventDefault();
    setHasAttemptedSubmit(true);

    const validationErrors = {};
    Object.keys(validationRules).forEach(key => {
      const error = validationRules[key](formData[key]);
      if (error) validationErrors[key] = error;
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      await onSubmit(formData);
      // Якщо форма ще існує (не закрита модалка), чистимо її
      resetForm();
    } catch (err) {
      // Обробляємо помилку з Axios або Fetch
      const errorMsg = err.response?.data?.message || err.message || 'Error';
      setSubmissionError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    hasAttemptedSubmit,
    submissionError,
    handleInputChange,
    handleDateChange,
    handleSubmit,
    resetForm,
  };
};

export default useForm;
