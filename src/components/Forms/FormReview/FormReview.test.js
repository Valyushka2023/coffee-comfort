import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import FormReview from './FormReview';

// 1. Обов'язково мокаємо i18next, щоб тексти кнопкок та помилок відповідали ключам
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key, // повертає рядок ключа, наприклад: 'submit_btn' або 'errors.required'
  }),
}));

// 2. Мокаємо утиліти валідації, щоб вони повертали конкретні ключі помилок при порожніх значеннях

vi.mock('../../../utils/index.js', () => ({
  validateName: (v, _t) => (!v ? 'errors.required' : null),
  validateComment: (v, _t) => (!v ? 'errors.required' : null),
  validateRating: (v, _t) => (!v ? 'errors.rating_required' : null),
}));

describe('FormReview Component', () => {
  it('має показувати помилки валідації при порожній відправці', async () => {
    const mockOnSubmitSuccess = vi.fn();

    render(<FormReview onSubmitSuccess={mockOnSubmitSuccess} />);

    // Шукаємо кнопку за ключем перекладу 'submit_btn'
    const submitButton = screen.getByRole('button', { name: 'submit_btn' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Перевіряємо помилку рейтингу
      expect(screen.getByText('errors.rating_required')).toBeInTheDocument();

      // Перевіряємо помилку імені всередині його контейнера
      const nameInput = screen.getByPlaceholderText('name_placeholder');
      const nameWrapper = nameInput.parentElement;
      expect(
        within(nameWrapper).getByText('errors.required')
      ).toBeInTheDocument();

      // Перевіряємо помилку тексту (у вашому коді поле називається text, а placeholder — text_placeholder)
      const commentInput = screen.getByPlaceholderText('text_placeholder');
      const commentWrapper = commentInput.parentElement;
      expect(
        within(commentWrapper).getByText('errors.required')
      ).toBeInTheDocument();
    });
  });
});
