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
// import {
//   render,
//   screen,
//   fireEvent,
//   waitFor,
//   within,
// } from '@testing-library/react';
// import { expect, it, describe, vi } from 'vitest';
// import { MemoryRouter } from 'react-router-dom';
// import ReviewModal from './ReviewModal';

// describe('ReviewModal Component', () => {
//   it('має показувати помилки валідації при порожній відправці', async () => {
//     const mockOnClose = vi.fn();
//     const mockOnSuccess = vi.fn();

//     render(
//       <MemoryRouter
//         future={{
//           v7_startTransition: true,
//           v7_relativeSplatPath: true,
//         }}
//       >
//         <ReviewModal
//           isOpen={true}
//           onClose={mockOnClose}
//           onSuccess={mockOnSuccess}
//         />
//       </MemoryRouter>
//     );

//     // Шукаємо кнопку за текстом 'Send', який повертає наш мок із setupTests.js
//     const submitButton = screen.getByRole('button', { name: /Send/i });
//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       // Ключі помилок
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
