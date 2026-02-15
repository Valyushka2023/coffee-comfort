import { useState } from 'react';

const useForm = (initialState, validationRules, onSubmit) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (validationRules[name]) {
      setErrors(prev => ({ ...prev, [name]: validationRules[name](value) }));
    }
  };

  // Метод спеціально для DatePicker
  const handleDateChange = (date, name) => {
    setFormData(prev => ({ ...prev, [name]: date }));

    if (validationRules[name]) {
      setErrors(prev => ({ ...prev, [name]: validationRules[name](date) }));
    }
  };

  const handleSubmit = async e => {
    if (e && e.preventDefault) e.preventDefault();
    setHasAttemptedSubmit(true);

    const newErrors = {};
    Object.keys(validationRules).forEach(key => {
      const error = validationRules[key](formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);
    try {
      await onSubmit(formData);
    } catch (err) {
      setSubmissionError(err.message || 'Something went wrong');
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
  };
};

export default useForm;

/*****/
// import { useState, useCallback } from 'react';

// const useForm = (initialState, validationRules, onSubmit) => {
//   const [formData, setFormData] = useState(initialState);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
//   const [submissionError, setSubmissionError] = useState(null);

//   // Стабільна функція валідації
//   const validate = useCallback(
//     data => {
//       const newErrors = {};
//       Object.keys(validationRules).forEach(field => {
//         const error = validationRules[field](data[field]);
//         if (error) newErrors[field] = error;
//       });
//       return newErrors;
//     },
//     [validationRules]
//   );

//   const handleInputChange = e => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));

//     // Валідуємо тільки якщо вже була спроба відправки
//     if (hasAttemptedSubmit) {
//       const fieldError = validationRules[name](value);
//       setErrors(prev => ({ ...prev, [name]: fieldError }));
//     }
//   };

//   const handleSubmit = async e => {
//     if (e) e.preventDefault();
//     setHasAttemptedSubmit(true);

//     const validationErrors = validate(formData);
//     const hasErrors = Object.values(validationErrors).some(
//       error => error !== null
//     );

//     setErrors(validationErrors);

//     if (!hasErrors) {
//       setIsSubmitting(true);
//       setSubmissionError(null);
//       try {
//         await onSubmit(formData);
//       } catch (err) {
//         setSubmissionError(err.message || 'Помилка при відправці');
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   };

//   return {
//     formData,
//     errors,
//     isSubmitting,
//     hasAttemptedSubmit,
//     submissionError,
//     handleInputChange,
//     handleSubmit,
//   };
// };

// export default useForm;
