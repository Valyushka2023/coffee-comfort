import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Список товарів у кошику
  totalAmount: 0, // Загальна сума замовлення
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Додавання товару в кошик
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (!existingItem) {
        // Якщо товару ще немає в кошику, додаємо його
        state.items.push({
          id: newItem.id,
          name: newItem.name, // Об'єкт з перекладами {uk, en}
          price: newItem.price,
          img: newItem.img,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        // Якщо товар вже є, збільшуємо кількість
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }

      // Оновлюємо загальну суму кошика
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    // Видалення однієї одиниці товару або всього рядка
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }

      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    // Повне очищення кошика (наприклад, після успішного замовлення)
    clearCart: state => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
