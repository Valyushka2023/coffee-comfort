// import { render, screen, fireEvent } from '@testing-library/react';
// import { expect, it, describe, vi } from 'vitest';
// import { MemoryRouter } from 'react-router-dom'; // Додайте цей імпорт
// import FormReview from './FormReview';

// describe('FormReview Component', () => {
//   it('коректно обробляє введення тексту в поле імені', async () => {
//     const mockOnClose = vi.fn();

//     render(
//       <MemoryRouter
//         future={{
//           v7_startTransition: true,
//           v7_relativeSplatPath: true,
//         }}
//       >
//         {' '}
//         {/* Обгортка для розв'язання проблеми з useNavigate */}
//         <FormReview isOpen={true} onClose={mockOnClose} />
//       </MemoryRouter>
//     );

//     const nameInput = screen.getByLabelText(/ім'я \(UA\)/i);

//     fireEvent.change(nameInput, { target: { value: 'Олександр' } });

//     expect(nameInput.value).toBe('Олександр');
//   });
// });
