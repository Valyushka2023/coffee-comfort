import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Імпортуємо змінну оточення
const BACKEND_BASE_URL = import.meta.env.VITE_API_URL;

// =========================================================================
// ✅ ОНОВЛЕННЯ: Додано прийом та використання параметра 'lang'
// =========================================================================
export const getCampers = createAsyncThunk(
  'campers/getCampers',
  // 💥 ЗМІНА: Асинхронна функція тепер приймає 'lang' як аргумент
  async (lang = 'en', { rejectWithValue }) => {
    try {
      // Формуємо URL запиту з параметром мови
      const requestUrl = `${BACKEND_BASE_URL}/campers?lang=${lang}`;

      // 💥 ЗМІНА: Використовуємо URL з параметром мови
      const response = await axios.get(requestUrl);
      const campersData = response.data;

      if (Array.isArray(campersData)) {
        return campersData;
      } else {
        return rejectWithValue('Incorrect data format from API');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
