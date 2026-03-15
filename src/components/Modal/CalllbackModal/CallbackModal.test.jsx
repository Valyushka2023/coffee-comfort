import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CallbackModal from './CallbackModal';

describe('CallbackModal Component', () => {
  it('повинен закриватися при натисканні на кнопку закриття', () => {
    const handleClose = vi.fn();

    render(
      <MemoryRouter>
        <CallbackModal isOpen={true} onClose={handleClose} />
      </MemoryRouter>
    );

    // ОСЬ ТУТ МИ ЗАМІНЮЄМО ВАШ СТАРИЙ РЯДОК:
    // Тепер ми шукаємо кнопку за її точним ім'ям 'Close',
    // ігноруючи div-оверлей, який має іншу назву ("Close modal")
    const closeButton = screen.getByRole('button', { name: 'Close' });

    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
