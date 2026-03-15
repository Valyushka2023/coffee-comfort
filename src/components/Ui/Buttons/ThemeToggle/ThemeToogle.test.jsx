import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle', () => {
  // Очищуємо localStorage перед кожним тестом
  beforeEach(() => {
    localStorage.clear();
    document.body.className = '';
    vi.clearAllMocks();
  });

  it('змінює тему при кліку на кнопку', () => {
    render(<ThemeToggle />);

    const button = screen.getByLabelText('Switch topic');

    // Початковий стан (припустимо, світла тема)
    expect(document.body.classList.contains('dark-theme')).toBe(false);

    // Клікаємо
    fireEvent.click(button);

    // Перевіряємо, чи додано клас
    expect(document.body.classList.contains('dark-theme')).toBe(true);
    // Перевіряємо localStorage
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
