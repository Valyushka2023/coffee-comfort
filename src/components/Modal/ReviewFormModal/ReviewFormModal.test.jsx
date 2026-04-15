// import {
//   render,
//   screen,
//   fireEvent,
//   waitFor,
//   within,
// } from '@testing-library/react';
// import { expect, it, describe, vi } from 'vitest';
// import { MemoryRouter } from 'react-router-dom'; // 1. Додайте цей імпорт
// import ReviewModal from './ReviewModal';

// describe('ReviewModal Component', () => {
//   it('має показувати помилки валідації при порожній відправці', async () => {
//     const mockOnClose = vi.fn();
//     const mockOnSuccess = vi.fn();

//     render(
//       <MemoryRouter>
//         {' '}
//         {/* 2. Обгорніть компонент у MemoryRouter */}
//         <ReviewModal
//           isOpen={true}
//           onClose={mockOnClose}
//           onSuccess={mockOnSuccess}
//         />
//       </MemoryRouter>
//     );

//     const submitButton = screen.getByRole('button', { name: /Send/i });
//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       expect(screen.getByText('errors.rating_required')).toBeInTheDocument();

//       const nameInput = screen.getByPlaceholderText('name_placeholder');
//       const nameWrapper = nameInput.parentElement;
//       expect(
//         within(nameWrapper).getByText('errors.required')
//       ).toBeInTheDocument();

//       const commentInput = screen.getByPlaceholderText('comment_placeholder');
//       const commentWrapper = commentInput.parentElement;
//       expect(
//         within(commentWrapper).getByText('errors.required')
//       ).toBeInTheDocument();
//     });
//   });
// });
/**/
import { render, screen, fireEvent, within } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ReviewFormModal from './ReviewFormModal';

describe('ReviewFormModal Component', () => {
  it('має показувати помилки валідації при порожній відправці', async () => {
    const mockOnClose = vi.fn();
    const mockOnSuccess = vi.fn();

    render(
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ReviewFormModal
          isOpen={true}
          onClose={mockOnClose}
          onSuccess={mockOnSuccess}
        />
      </MemoryRouter>
    );

    // Знаходимо кнопку відправки за текстом, який повертає i18n мок
    const submitButton = screen.getByRole('button', { name: /Send/i });

    // Імітуємо клік для виклику валідації
    fireEvent.click(submitButton);

    // 1. Чекаємо на появу помилки рейтингу (findByText повертає Promise і чекає появи елемента)
    const ratingError = await screen.findByText('errors.rating_required');
    expect(ratingError).toBeInTheDocument();

    // 2. Перевіряємо помилку для поля "Ім'я"
    const nameInput = screen.getByPlaceholderText('name_placeholder');
    // Знаходимо найближчий div-контейнер, в якому лежить цей інпут та його помилка
    const nameContainer = nameInput.closest('div');
    expect(
      within(nameContainer).getByText('errors.required')
    ).toBeInTheDocument();

    // 3. Перевіряємо помилку для поля "Коментар"
    // Використовуємо "text_placeholder", бо саме він відображається у вашому логу помилок
    const commentInput = screen.getByPlaceholderText('text_placeholder');
    const commentContainer = commentInput.closest('div');
    expect(
      within(commentContainer).getByText('errors.required')
    ).toBeInTheDocument();
  });
});
