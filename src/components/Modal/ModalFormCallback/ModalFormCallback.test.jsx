import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ModalFormCallback from './ModalFormCallback';

// Мокаємо переклади
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, fallback) => fallback || key,
  }),
}));

// Мокаємо внутрішню форму, щоб не залежити від її інпутів та валідації в тесті модалки
vi.mock('../../Forms/FormCallback/FormCallback.jsx', () => ({
  default: ({ onSubmitSuccess }) => (
    <div data-testid="mock-form">
      <button onClick={onSubmitSuccess} data-testid="submit-form-btn">
        Submit Form
      </button>
    </div>
  ),
}));

describe('ModalFormCallback Component', () => {
  const handleClose = vi.fn();

  it('повинен рендерити заголовок та форму, коли відкритий', () => {
    render(<ModalFormCallback isOpen={true} onClose={handleClose} />);

    // Перевіряємо заголовок (fallback значення в t() функцій вашої модалки)
    expect(screen.getByText('Request a call')).toBeInTheDocument();
    // Перевіряємо чи відмалювалася форма
    expect(screen.getByTestId('mock-form')).toBeInTheDocument();
  });

  // Цей тест може залежати від того, як реалізовано BaseModal.
  // Якщо кнопка "Close" або "хрестик" є всередині BaseModal, тест пройде.
  it('повинен викликати onClose при натисканні на кнопку закриття', () => {
    render(<ModalFormCallback isOpen={true} onClose={handleClose} />);

    const closeButton = screen.getByRole('button', {
      name: /close/i, // використовуємо регулярний вираз для ігнорування регістру
    });
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('повинен викликати window.alert та onClose при успішній відправці форми', () => {
    // Мокаємо window.alert, щоб він не вискакував під час тестів у консолі
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<ModalFormCallback isOpen={true} onClose={handleClose} />);

    // Імітуємо успішну відправку форми через наш клік по фейковій кнопці моку
    const submitBtn = screen.getByTestId('submit-form-btn');
    fireEvent.click(submitBtn);

    expect(handleClose).toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith('We will call you!');

    alertMock.mockRestore(); // відновлюємо оригінальний alert
  });
});
