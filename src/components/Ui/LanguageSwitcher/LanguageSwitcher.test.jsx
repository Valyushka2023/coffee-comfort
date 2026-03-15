import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import LanguageSwitcher from './LanguageSwitcher';

// Створюємо "шпигуна" (mock-функцію), щоб відстежити виклики
const mockChangeLanguage = vi.fn();

// Підміняємо модуль react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en',
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

describe('LanguageSwitcher', () => {
  it('викликає зміну мови на "uk" при натисканні на кнопку UK', () => {
    // Рендеримо компонент
    render(<LanguageSwitcher />);

    // Знаходимо кнопку за її текстом
    const ukButton = screen.getByText('UK');

    // Імітуємо клік на кнопку
    fireEvent.click(ukButton);

    // Перевіряємо, чи була функція changeLanguage викликана з аргументом 'uk'
    expect(mockChangeLanguage).toHaveBeenCalledWith('uk');
  });

  it('викликає зміну мови на "en" при натисканні на кнопку EN', () => {
    render(<LanguageSwitcher />);

    // Знаходимо кнопку для англійської мови
    const enButton = screen.getByText('EN');

    // Імітуємо клік
    fireEvent.click(enButton);

    // Перевіряємо, чи була функція changeLanguage викликана з аргументом 'en'
    expect(mockChangeLanguage).toHaveBeenCalledWith('en');
  });
});
