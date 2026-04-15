import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CallbackModal from './CallbackModal';

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

    const nameInput = screen.getByPlaceholderText('name_placeholder');
    // const phoneInput = screen.getByPlaceholderText('+380...');
    const phoneInput = screen.getByPlaceholderText('phone_placeholder');
    fireEvent.change(nameInput, { target: { value: 'Олександр' } });
    fireEvent.change(phoneInput, { target: { value: '+380991234567' } });

    expect(nameInput.value).toBe('Олександр');
    expect(phoneInput.value).toBe('+380991234567');
  });
});
