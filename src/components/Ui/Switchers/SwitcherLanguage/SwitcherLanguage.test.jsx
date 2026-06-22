import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import SwitcherLanguage from './SwitcherLanguage';

const mockChangeLanguage = vi.fn();

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en',
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

describe('SwitcherLanguage', () => {
  it('викликає зміну мови на "uk" при натисканні на кнопку UK', () => {
    render(<SwitcherLanguage />);

    const ukButton = screen.getByText('UK');

    fireEvent.click(ukButton);

    expect(mockChangeLanguage).toHaveBeenCalledWith('uk');
  });

  it('викликає зміну мови на "en" при натисканні на кнопку EN', () => {
    render(<SwitcherLanguage />);

    const enButton = screen.getByText('EN');

    fireEvent.click(enButton);

    expect(mockChangeLanguage).toHaveBeenCalledWith('en');
  });
});
