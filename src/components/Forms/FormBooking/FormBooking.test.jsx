import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import FormBooking from './FormBooking';

// Мок для i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
    i18n: {
      language: 'uk',
    },
  }),
}));

describe('FormBooking Component', () => {
  it('відображає заголовок форми', () => {
    render(
      <MemoryRouter>
        <FormBooking />
      </MemoryRouter>
    );

    const title = screen.getByRole('heading', { level: 3, name: /title/i });
    expect(title).toBeInTheDocument();
  });
});
