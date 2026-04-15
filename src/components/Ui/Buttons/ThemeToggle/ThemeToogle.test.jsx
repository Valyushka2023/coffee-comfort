import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.className = '';
    vi.clearAllMocks();
  });

  it('змінює тему при кліку на кнопку', () => {
    render(<ThemeToggle />);

    const button = screen.getByLabelText('Switch topic');

    expect(document.body.classList.contains('dark-theme')).toBe(false);

    fireEvent.click(button);

    expect(document.body.classList.contains('dark-theme')).toBe(true);

    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
