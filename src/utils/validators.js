/**
 * Уніфіковані валідатори для всього проєкту
 * Використовують найбільш суворі правила з FormBooking та ReviewModal
 */

export const validateName = (value, t) => {
  const val = value?.trim() || '';
  if (!val) return t('errors.required', 'Поле обов’язкове');
  if (val.length < 2 || val.length > 20) {
    return t('errors.name_length', 'Ім’я має бути від 2 до 20 символів');
  }
  return null;
};

export const validatePhone = (value, t) => {
  const val = value?.trim() || '';
  if (!val) return t('errors.required', 'Поле обов’язкове');

  // Видаляємо все крім цифр для точної перевірки довжини
  const digits = val.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) {
    return t('errors.invalid_phone', 'Некоректний номер (10-15 цифр)');
  }
  return null;
};

export const validateEmail = (value, t) => {
  const val = value?.trim() || '';
  if (!val) return t('errors.required', 'Поле обов’язкове');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(val)) {
    return t('errors.invalid_email', 'Невірний формат email');
  }
  return null;
};

export const validateComment = (value, t, isRequired = true) => {
  const val = value?.trim() || '';

  // Якщо поле обов'язкове (як у відгуках)
  if (isRequired && !val) {
    return t('errors.required', 'Поле обов’язкове');
  }

  // Обмеження 150 символів (як у вашому ReviewModal та FormBooking)
  if (val.length > 150) {
    return t('errors.comment_too_long', 'Коментар має бути до 150 символів');
  }
  return null;
};

export const validateRating = (value, t) => {
  return Number(value) < 1
    ? t('errors.rating_required', 'Будь ласка, оберіть оцінку')
    : null;
};

export const validateRequired = (value, t) => {
  return !value ? t('errors.required', 'Поле обов’язкове') : null;
};
