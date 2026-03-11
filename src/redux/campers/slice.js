import { createSlice } from '@reduxjs/toolkit';
import { getCampers } from './operations';

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    loading: false,
    error: null,
    currentCamper: null, // Додаємо currentCamper
  },
  reducers: {
    setCamper: (state, action) => {
      state.currentCamper = action.payload; // Додаємо редюсер setCamper
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCampers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCamper } = campersSlice.actions; // Експортуємо setCamper
export const selectCampers = state => state.campers.items;
export const selectCurrentCamper = state => state.campers.currentCamper; // Додаємо селектор для currentCamper

export default campersSlice.reducer;
