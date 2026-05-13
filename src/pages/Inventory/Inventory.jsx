// import { useState, useEffect } from 'react';
// // Важливо: використовуємо правильний шлях та малу літеру 'api'
// // import axios from 'axios';
// import css from './Inventory.module.css';

// const Inventory = () => {
//   const [ingredients, setIngredients] = useState([]);

//   // Завантаження даних із сервера
//   const fetchIngredients = async () => {
//     try {
//       const res = await api.get('/ingredients');
//       // Додаємо перевірку на пусті дані, щоб .map не видав помилку
//       setIngredients(res.data || []);
//     } catch (error) {
//       // Використовуємо 'error', щоб задовольнити ESLint
//       console.error('Помилка завантаження складу:', error);
//     }
//   };

//   useEffect(() => {
//     fetchIngredients();
//   }, []);

//   // Оновлення кількості
//   const handleUpdate = async (id, newQuantity) => {
//     try {
//       await api.patch(`/ingredients/${id}`, { quantity: newQuantity });
//       fetchIngredients(); // Перезавантажуємо список після зміни
//     } catch (error) {
//       console.error('Помилка оновлення:', error);
//       alert('Не вдалося оновити склад');
//     }
//   };

//   return (
//     <div className={css.container}>
//       <h2>🥛 Склад та Залишки</h2>
//       {/* Використовуємо квадратні дужки для назв із дефісом */}
//       <table className={css['inventory-table']}>
//         <thead>
//           <tr>
//             <th>Продукт</th>
//             <th>Залишок</th>
//             <th>Дії</th>
//           </tr>
//         </thead>
//         <tbody>
//           {ingredients.map(item => (
//             <tr
//               key={item._id}
//               className={item.quantity <= item.minLimit ? css['low-stock'] : ''}
//             >
//               <td>{item.name}</td>
//               <td>
//                 <span className={css.amount}>
//                   {item.quantity} {item.unit}
//                 </span>
//                 {item.quantity <= item.minLimit && (
//                   <div className={css.warning}>Потрібна закупка!</div>
//                 )}
//               </td>
//               <td>
//                 <button
//                   type="button"
//                   onClick={() => handleUpdate(item._id, item.quantity + 1)}
//                 >
//                   + 1
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => handleUpdate(item._id, item.quantity - 1)}
//                 >
//                   - 1
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Inventory;
/**/
import { useState, useEffect } from 'react';
// import api from '../../api/axiosConfig.js';
import api from '../../services/api.js';
import css from './Inventory.module.css';

const Inventory = () => {
  // 1. Обов'язково оголошуємо стейт
  const [ingredients, setIngredients] = useState([]);

  const fetchIngredients = async () => {
    try {
      const res = await api.get('/ingredients');
      // 2. Додаємо перевірку, щоб завжди був масив
      setIngredients(res.data || []);
    } catch (error) {
      console.error('Помилка завантаження складу:', error);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleUpdate = async (id, newQuantity) => {
    if (newQuantity < 0) return; // Захист від від'ємної кількості
    try {
      await api.patch(`/ingredients/${id}`, { quantity: newQuantity });
      fetchIngredients();
    } catch (error) {
      console.error('Помилка оновлення:', error);
      alert('Не вдалося оновити склад');
    }
  };

  return (
    <div className={css.container}>
      <h2>🥛 Склад та Залишки</h2>
      <table className={css['inventory-table']}>
        <thead>
          <tr>
            <th>Продукт</th>
            <th>Залишок</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {/* 3. Безпечний перебір масиву */}
          {ingredients.length > 0 ? (
            ingredients.map(item => (
              <tr
                key={item._id}
                className={
                  item.quantity <= item.minLimit ? css['low-stock'] : ''
                }
              >
                <td>{item.name}</td>
                <td>
                  <span className={css.amount}>
                    {item.quantity} {item.unit}
                  </span>
                  {item.quantity <= item.minLimit && (
                    <div className={css.warning}>Потрібна закупка!</div>
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleUpdate(item._id, item.quantity + 1)}
                  >
                    + 1
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdate(item._id, item.quantity - 1)}
                  >
                    - 1
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>
                Завантаження...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
