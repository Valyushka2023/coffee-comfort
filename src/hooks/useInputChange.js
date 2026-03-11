export const handleInputChange =
  (setter, fieldName, setErrors, setSubmissionError) => event => {
    const value = event.target.value;
    setter(value);

    // Видалення помилки для конкретного поля
    setErrors(prevErrors => {
      const { [fieldName]: _, ...rest } = prevErrors;
      return rest;
    });

    // Скидання загальної помилки
    setSubmissionError(null);
  };
