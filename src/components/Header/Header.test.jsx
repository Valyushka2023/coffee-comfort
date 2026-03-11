// import { describe, it, expect, vi } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import Header from './Header.jsx';

// // =================================================================
// // 1. МОКУВАННЯ: Налаштування i18next
// // ... (залишається без змін)
// vi.mock('react-i18next', () => ({
//   useTranslation: () => ({
//     t: key => key,
//     i18n: {
//       changeLanguage: vi.fn(),
//       language: 'en',
//     },
//   }),
// }));
// // =================================================================

// describe('Header Component', () => {
//   // Функція-обгортка для рендерингу
//   const renderHeader = () => {
//     return render(
//       <BrowserRouter>
//         <Header />
//       </BrowserRouter>
//     );
//   };

//   // --- ТЕСТИ ---

//   it('1. should render the main logo text "TravelTrucks"', () => {
//     renderHeader();

//     // ФІНАЛЬНЕ ВИПРАВЛЕННЯ:
//     // Оскільки getByText знайшов кілька батьківських елементів, використовуємо
//     // queryAllByText і обираємо найменший за текстовим вмістом (це буде сам логотип).
//     const matchingElements = screen.queryAllByText((content, element) => {
//       // Перевіряємо наявність обох слів.
//       return (
//         element.textContent.includes('Travel') &&
//         element.textContent.includes('Trucks')
//       );
//     });

//     // Відфільтровуємо лише елементи DIV, оскільки логотип знаходиться у DIV
//     const logoDivs = matchingElements.filter(el => el.tagName === 'DIV');

//     // Обираємо елемент, який має найкоротший текстовий вміст (це має бути найменший DIV-контейнер, тобто сам логотип)
//     // Якщо логотип має бути посиланням, слід використовувати getByRole('link', ...)
//     expect(logoDivs.length).toBeGreaterThan(0); // Перевірка, чи знайдено хоча б один DIV

//     // Вибираємо елемент з мінімальною довжиною тексту
//     const logoElement = logoDivs.reduce((prev, current) => {
//       return prev.textContent.length < current.textContent.length
//         ? prev
//         : current;
//     });

//     expect(logoElement).toBeInTheDocument();
//   });

//   it('2. should render the main navigation links (nav_home and nav_catalog)', () => {
//     renderHeader();

//     const homeLink = screen.getByText('nav_home');
//     expect(homeLink).toBeInTheDocument();

//     const catalogLink = screen.getByText('nav_catalog');
//     expect(catalogLink).toBeInTheDocument();

//     expect(homeLink.tagName).toBe('A');
//   });
// });
