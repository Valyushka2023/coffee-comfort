// import { vi } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import { describe, it, expect } from 'vitest';
// import { MemoryRouter } from 'react-router-dom';
// import FormBooking from './FormBooking';

// // Мок для i18next
// vi.mock('react-i18next', () => ({
//   useTranslation: () => ({
//     t: key => key,
//     i18n: {
//       language: 'uk',
//     },
//   }),
// }));

// describe('FormBooking Component', () => {
//   it('відображає заголовок форми', () => {
//     render(
//       <MemoryRouter>
//         <FormBooking />
//       </MemoryRouter>
//     );

//     const title = screen.getByRole('heading', {
//       level: 2,
//       name: /title|Coffee Comfort/i,
//     });
//     expect(title).toBeInTheDocument();
//   });
// });
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import FormBooking from './FormBooking';

describe('FormBooking Component', () => {
  it('відображає заголовок форми', () => {
    render(
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <FormBooking />
      </MemoryRouter>
    );

    // Тепер t('title') повертає 'Coffee Comfort' завдяки setupTests.js
    const title = screen.getByRole('heading', {
      level: 2,
      name: /Coffee Comfort/i,
    });

    expect(title).toBeInTheDocument();
  });
});
