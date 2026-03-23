import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CallbackModal from './CallbackModal';

// 1. Мокаємо переклади, щоб замість ключів (name_placeholder)
// в тестах можна було використовувати самі ключі
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
  }),
}));

describe('CallbackModal Component', () => {
  const handleClose = vi.fn();

  it('повинен закриватися при натисканні на кнопку закриття', () => {
    render(
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <CallbackModal isOpen={true} onClose={handleClose} />
      </MemoryRouter>
    );

    // Шукаємо кнопку за точним aria-label або назвою
    const closeButton = screen.getByRole('button', {
      name: 'Close',
      exact: true,
    });
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('має дозволяти введення імені та телефону', () => {
    render(
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <CallbackModal isOpen={true} onClose={handleClose} />
      </MemoryRouter>
    );

    // Використовуємо плейсхолдери, які бачить тест у вашому DOM-дереві
    const nameInput = screen.getByPlaceholderText('name_placeholder');
    const phoneInput = screen.getByPlaceholderText('+380...');

    // Імітуємо введення
    fireEvent.change(nameInput, { target: { value: 'Олександр' } });
    fireEvent.change(phoneInput, { target: { value: '+380991234567' } });

    // Перевіряємо результат
    expect(nameInput.value).toBe('Олександр');
    expect(phoneInput.value).toBe('+380991234567');
  });
});
