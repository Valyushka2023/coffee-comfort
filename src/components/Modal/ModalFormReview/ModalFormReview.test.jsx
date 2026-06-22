import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import ModalFormReview from './ModalFormReview';

// 1. Мокаємо переклади для модалки
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, fallback) => fallback || key,
  }),
}));

// 2. Мокаємо внутрішню форму FormReview, щоб ізолювати тест модалки
vi.mock('../../Forms/FormReview/FormReview.jsx', () => ({
  default: ({ onSubmitSuccess }) => (
    <div data-testid="mock-form">
      <button onClick={onSubmitSuccess} data-testid="trigger-success-btn">
        Submit Form Review
      </button>
    </div>
  ),
}));

describe('ModalFormReview Component', () => {
  const mockOnClose = vi.fn();
  const mockOnSuccess = vi.fn();

  it('повинен рендерити заголовок та форму, коли відкритий', () => {
    render(
      <ModalFormReview
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    // Перевіряємо заголовок модалки (ключ 'title' з перекладів)
    expect(screen.getByText('title')).toBeInTheDocument();
    // Перевіряємо, чи відмалювався наш мок форми
    expect(screen.getByTestId('mock-form')).toBeInTheDocument();
  });

  it('повинен переходити в стан успіху при успішному сабміті форми', async () => {
    render(
      <ModalFormReview
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    // Імітуємо, що форма успішно відправилася, натиснувши на фейкову кнопку всередині моку
    const submitBtn = screen.getByTestId('trigger-success-btn');
    fireEvent.click(submitBtn);

    // Тепер має з'явитися екран успіху (ваші ключі success_title та success_message)
    await waitFor(() => {
      expect(screen.getByText('success_title')).toBeInTheDocument();
      expect(screen.getByText('success_message')).toBeInTheDocument();
      expect(screen.getByText('✓')).toBeInTheDocument();
    });
  });
});
