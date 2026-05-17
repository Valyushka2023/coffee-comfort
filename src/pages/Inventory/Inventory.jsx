import { useState, useEffect } from 'react';
import api from '../../services/api.js';
import css from './Inventory.module.css';

const Inventory = () => {
  const [ingredients, setIngredients] = useState([]);

  const fetchIngredients = async () => {
    try {
      const res = await api.get('/ingredients');
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

    // Округляємо нове значення до 3 знаків, щоб уникнути системних помилок JS при ручному редагуванні
    const roundedQuantity = Number(newQuantity.toFixed(3));

    try {
      await api.patch(`/ingredients/${id}`, { quantity: roundedQuantity });
      fetchIngredients();
    } catch (error) {
      console.error('Помилка оновлення:', error);
      alert('Не вдалося оновити склад');
    }
  };

  // Функція для красивого відображення чисел (без зайвих нулів та хвостів розрахунків)
  const formatQuantity = val => {
    if (typeof val !== 'number') return val;
    // Округляємо максимум до 3 знаків (для кг/л) і перетворюємо назад у число, щоб прибрати нулі в кінці (наприклад, 5.000 -> 5)
    return Number(val.toFixed(3));
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
                    {/* Використовуємо функцію форматування замість чистого item.quantity */}
                    {formatQuantity(item.quantity)} {item.unit}
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
