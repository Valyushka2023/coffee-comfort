import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './campers/slice';

const store = configureStore({
  reducer: {
    campers: campersReducer,
  },

  devTools: import.meta.env.MODE !== 'production',
});

export default store;
