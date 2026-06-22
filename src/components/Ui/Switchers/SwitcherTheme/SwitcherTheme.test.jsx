import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import SwitcherTheme from './SwitcherTheme.jsx';

describe('SwitcherTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.className = '';
    vi.clearAllMocks();
  });

  it('змінює тему при кліку на кнопку', () => {
    render(<SwitcherTheme />);

    const button = screen.getByLabelText('Switch topic');

    expect(document.body.classList.contains('dark-theme')).toBe(false);

    fireEvent.click(button);

    expect(document.body.classList.contains('dark-theme')).toBe(true);

    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
