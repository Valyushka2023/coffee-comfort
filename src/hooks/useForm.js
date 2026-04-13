// import { useState } from 'react';

// const useForm = (initialState, validationRules, onSubmit) => {
//   const [formData, setFormData] = useState(initialState);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
//   const [submissionError, setSubmissionError] = useState(null);

//   const resetForm = () => {
//     setFormData(initialState);
//     setErrors({});
//     setHasAttemptedSubmit(false);
//     setSubmissionError(null);
//   };

//   const handleInputChange = e => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));

//     if (validationRules[name]) {
//       setErrors(prev => ({ ...prev, [name]: validationRules[name](value) }));
//     }
//   };

//   const handleDateChange = (date, name) => {
//     setFormData(prev => ({ ...prev, [name]: date }));

//     if (validationRules[name]) {
//       setErrors(prev => ({ ...prev, [name]: validationRules[name](date) }));
//     }
//   };

//   const handleSubmit = async e => {
//     if (e && e.preventDefault) e.preventDefault();
//     setHasAttemptedSubmit(true);

//     const newErrors = {};
//     Object.keys(validationRules).forEach(key => {
//       const error = validationRules[key](formData[key]);
//       if (error) newErrors[key] = error;
//     });

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmissionError(null);
//     try {
//       await onSubmit(formData);
//     } catch (err) {
//       setSubmissionError(err.message || 'Something went wrong');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return {
//     formData,
//     errors,
//     isSubmitting,
//     hasAttemptedSubmit,
//     submissionError,
//     handleInputChange,
//     handleDateChange,
//     handleSubmit,
//     resetForm,
//   };
// };

// export default useForm;

/*****/
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
    const { name, value } = e.target;
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
