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

    const title = screen.getByRole('heading', {
      level: 3,
      name: /Coffee Comfort/i,
    });

    expect(title).toBeInTheDocument();
  });
});
