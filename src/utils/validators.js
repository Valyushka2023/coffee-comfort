// export const validateName = (value, t) => {
//   const val = value?.trim() || '';
//   if (!val)
//     return t('errors.required', 'This field is required', {
//       ns: 'validation',
//     });
//   if (val.length < 2 || val.length > 20) {
//     return t('errors.name_length', 'Name must be between 2 and 20 characters', {
//       ns: 'validation',
//     });
//   }
//   return null;
// };

// export const validatePhone = (value, t) => {
//   const val = value?.trim() || '';
//   if (!val)
//     return t('errors.required', 'This field is required', {
//       ns: 'validation',
//     });

//   // Видаляємо все крім цифр для перевірки довжини
//   const digits = val.replace(/\D/g, '');
//   if (digits.length < 10 || digits.length > 15) {
//     return t('errors.invalid_phone', 'Invalid phone number format', {
//       ns: 'validation',
//     });
//   }
//   return null;
// };

// export const validateEmail = (value, t) => {
//   const val = value?.trim() || '';
//   if (!val)
//     return t('errors.required', 'This field is required', {
//       ns: 'validation',
//     });
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(val)) {
//     return t('errors.invalid_email', 'Invalid email format', {
//       ns: 'validation',
//     });
//   }
//   return null;
// };

// export const validateDateRange = (startDate, endDate, t) => {
//   if (!startDate || !endDate) return null;

//   const start = new Date(startDate);
//   const end = new Date(endDate);

//   if (end <= start) {
//     return t(
//       'errors.invalid_end_date',
//       'End date must be later than start date',
//       { ns: 'validation' }
//     );
//   }
//   return null;
// };

// export const validateComment = (value, t, isRequired = true) => {
//   const val = value?.trim() || '';

//   if (isRequired && !val) {
//     return t('errors.required', 'This field is required', {
//       ns: 'validation',
//     });
//   }

//   if (val.length > 150) {
//     return t(
//       'errors.comment_too_long',
//       'Comment must be no more than 150 characters',
//       {
//         ns: 'validation',
//       }
//     );
//   }
//   return null;
// };

// export const validateRating = (value, t) => {
//   return Number(value) < 1
//     ? t('errors.rating_required', 'Please provide a star rating', {
//         ns: 'validation',
//       })
//     : null;
// };

// export const validateRequired = (value, t) => {
//   return !value
//     ? t('errors.required', 'This field is required', {
//         ns: 'validation',
//       })
//     : null;
// };
export const validateName = (value, t) => {
  const val = value?.trim() || '';
  if (!val)
    return t('errors.required', 'This field is required', {
      ns: 'validation',
    });
  if (val.length < 2 || val.length > 20) {
    return t('errors.name_length', 'Name must be between 2 and 20 characters', {
      ns: 'validation',
    });
  }
  return null;
};

export const validatePhone = (value, t) => {
  const val = value?.trim() || '';
  if (!val)
    return t('errors.required', 'This field is required', {
      ns: 'validation',
    });

  // ПЕРЕВІРКА: Обов'язкова наявність плюса на початку
  if (!val.startsWith('+')) {
    return t('errors.phone_plus_required', 'Phone number must start with "+"', {
      ns: 'validation',
    });
  }

  // Видаляємо все крім цифр для перевірки довжини (після перевірки на плюс)
  const digits = val.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) {
    return t('errors.invalid_phone', 'Invalid phone number format', {
      ns: 'validation',
    });
  }
  return null;
};

export const validateEmail = (value, t) => {
  const val = value?.trim() || '';
  if (!val)
    return t('errors.required', 'This field is required', {
      ns: 'validation',
    });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(val)) {
    return t('errors.invalid_email', 'Invalid email format', {
      ns: 'validation',
    });
  }
  return null;
};

// НОВА ФУНКЦІЯ: Валідація дати бронювання (не в минулому)
export const validateBookingDate = (value, t) => {
  if (!value) {
    return t('errors.required', 'This field is required', {
      ns: 'validation',
    });
  }

  const selectedDate = new Date(value);
  const now = new Date();

  // Перевіряємо, чи дата не в минулому (порівнюємо таймстемпи)
  if (selectedDate < now) {
    return t('errors.date_in_past', 'Date and time cannot be in the past', {
      ns: 'validation',
    });
  }
  return null;
};

export const validateDateRange = (startDate, endDate, t) => {
  if (!startDate || !endDate) return null;

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (end <= start) {
    return t(
      'errors.invalid_end_date',
      'End date must be later than start date',
      { ns: 'validation' }
    );
  }
  return null;
};

export const validateComment = (value, t, isRequired = true) => {
  const val = value?.trim() || '';

  if (isRequired && !val) {
    return t('errors.required', 'This field is required', {
      ns: 'validation',
    });
  }

  if (val.length > 150) {
    return t(
      'errors.comment_too_long',
      'Comment must be no more than 150 characters',
      {
        ns: 'validation',
      }
    );
  }
  return null;
};

export const validateRating = (value, t) => {
  return Number(value) < 1
    ? t('errors.rating_required', 'Please provide a star rating', {
        ns: 'validation',
      })
    : null;
};

export const validateRequired = (value, t) => {
  // Для дат перевіряємо на null, для рядків - на порожнечу після trim
  const isEmpty =
    value === null || (typeof value === 'string' && value.trim() === '');

  return isEmpty
    ? t('errors.required', 'This field is required', {
        ns: 'validation',
      })
    : null;
};
