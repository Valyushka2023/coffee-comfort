import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormCallback from './FormCallback';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
  }),
}));

// Мокаємо сервіс api, щоб тести не робили реальних запитів на бекенд
vi.mock('../../../services/api.js', () => ({
  sendCallbackRequest: vi.fn(() => Promise.resolve()),
}));

describe('FormCallback Component', () => {
  const handleSubmitSuccess = vi.fn();

  it('має дозволяти введення імені та телефону', () => {
    render(<FormCallback onSubmitSuccess={handleSubmitSuccess} />);

    // Шукаємо інпути за плейсхолдерами, які повертає наш мок i18next (просто ключ перекладу)
    const nameInput = screen.getByPlaceholderText('name_placeholder');
    const phoneInput = screen.getByPlaceholderText('phone_placeholder');

    fireEvent.change(nameInput, { target: { value: 'Олександр' } });
    fireEvent.change(phoneInput, { target: { value: '+380991234567' } });

    expect(nameInput.value).toBe('Олександр');
    expect(phoneInput.value).toBe('+380991234567');
  });
});
