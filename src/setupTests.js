import 'vitest-dom/extend-expect';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key, // просто повертає ключ як переклад
  }),
}));
