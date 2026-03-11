// import { configureStore } from '@reduxjs/toolkit';
// import campersReducer from './campers/slice';

// const store = configureStore({
//   reducer: {
//     campers: campersReducer,
//   },
//   devTools: process.env.NODE_ENV !== 'production',
// });

// export default store;
import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './campers/slice';

const store = configureStore({
  reducer: {
    campers: campersReducer,
  },
  // devTools: true за замовчуванням, можна взагалі прибрати цей рядок,
  // або написати так для Vite:
  devTools: import.meta.env.MODE !== 'production',
});

export default store;
