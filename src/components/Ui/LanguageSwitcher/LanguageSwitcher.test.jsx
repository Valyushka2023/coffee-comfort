import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import LanguageSwitcher from './LanguageSwitcher';

const mockChangeLanguage = vi.fn();

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
    render(<LanguageSwitcher />);

    const ukButton = screen.getByText('UK');

    fireEvent.click(ukButton);

    expect(mockChangeLanguage).toHaveBeenCalledWith('uk');
  });

  it('викликає зміну мови на "en" при натисканні на кнопку EN', () => {
    render(<LanguageSwitcher />);

    const enButton = screen.getByText('EN');

    fireEvent.click(enButton);

    expect(mockChangeLanguage).toHaveBeenCalledWith('en');
  });
});
