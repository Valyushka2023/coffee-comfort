// import { useEffect, useState } from 'react';
// import { fetchOrderHistoryRequest } from '../../services/api';
// import css from './OrderHistory.module.css';

// const OrderHistory = () => {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getHistory = async () => {
//       try {
//         const data = await fetchOrderHistoryRequest();
//         console.log('Дані з бази:', data);
//         setHistory(data || []);
//       } catch (error) {
//         console.error('Помилка завантаження історії:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getHistory();
//   }, []);

//   const totalRevenue = history.reduce(
//     (sum, order) => sum + (order.totalPrice || 0),
//     0
//   );

//   if (loading) return <div className={css.loader}>Завантаження історії...</div>;

//   return (
//     <div className={css.container}>
//       <header className={css.header}>
//         <h1>📊 Історія виданих замовлень</h1>
//         <div className={css.stats}>
//           <span>
//             Всього замовлень: <strong>{history.length}</strong>
//           </span>
//           <span>
//             Загальна сума: <strong>{totalRevenue} грн</strong>
//           </span>
//         </div>
//       </header>

//       <table className={css.table}>
//         <thead>
//           <tr>
//             <th>Дата видачі</th>
//             <th>№ Замовлення</th>
//             <th>Страви та кількість</th>
//             <th>Сума</th>
//             <th>Статус оплати</th>
//           </tr>
//         </thead>
//         <tbody>
//           {history.map(order => (
//             <tr key={order._id}>
//               <td>{new Date(order.updatedAt).toLocaleString('uk-UA')}</td>
//               <td>#{order.orderNumber || order._id.slice(-4).toUpperCase()}</td>
//               <td>
//                 <ul className={css.itemList}>
//                   {order.items.map((item, i) => (
//                     <li key={i}>
//                       {item.name?.uk || item.name} —{' '}
//                       <strong>{item.quantity} шт.</strong>
//                     </li>
//                   ))}
//                 </ul>
//               </td>
//               <td>{order.totalPrice} грн</td>
//               <td>
//                 <span
//                   className={
//                     order.isPaid || order.status === 'completed'
//                       ? css.paid
//                       : css.unpaid
//                   }
//                 >
//                   {order.isPaid || order.status === 'completed'
//                     ? 'Оплачено'
//                     : 'Борг'}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OrderHistory;
/**/
import { useEffect, useState } from 'react';
import axios from 'axios'; // Використовуємо для запитів
import css from './OrderHistory.module.css';
// Використовуємо вашу зміну з .env.
// Додаємо /api, якщо ваш бекенд очікує цей префікс
const API_URL =
  import.meta.env.VITE_API_URL || 'https://coffee-comfort.onrender.com';

const API = axios.create({
  baseURL: `${API_URL}/api`,
});
const OrderHistory = () => {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      try {
        // Отримуємо і загальну історію, і статистику за вибрану дату одночасно
        const [historyRes, statsRes] = await Promise.all([
          API.get('/api/orders/history'),
          API.get(`/api/orders/stats?date=${selectedDate}`),
        ]);

        setHistory(historyRes.data || []);
        setStats(statsRes.data || []);
      } catch (error) {
        console.error('Помилка завантаження даних:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [selectedDate]);

  const totalDayRevenue = stats.reduce((sum, item) => sum + item.totalPrice, 0);

  if (loading && history.length === 0)
    return <div className={css.loader}>Завантаження...</div>;

  return (
    <div className={css.container}>
      <header className={css.header}>
        <h1>📊 Звітність та Історія</h1>
        <div className={css.filterWrapper}>
          <label htmlFor="datePicker">Аналітика за день: </label>
          <input
            id="datePicker"
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className={css.dateInput}
          />
        </div>
      </header>

      {/* СЕКЦІЯ АНАЛІТИКИ */}
      <section className={css.statsSection}>
        <div className={css.statsSummary}>
          <h2>
            Підсумок по стравах (
            {new Date(selectedDate).toLocaleDateString('uk-UA')})
          </h2>
          <div className={css.totalBadge}>
            Всього за день: {totalDayRevenue} грн
          </div>
        </div>

        <table className={css.statsTable}>
          <thead>
            <tr>
              <th>Страва</th>
              <th>Продано (шт)</th>
              <th>Загальна сума</th>
            </tr>
          </thead>
          <tbody>
            {stats.length > 0 ? (
              stats.map(item => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>
                    <strong>{item.totalQuantity}</strong>
                  </td>
                  <td>{item.totalPrice} грн</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Немає виданих замовлень за цю дату</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <hr className={css.divider} />

      {/* СЕКЦІЯ ІСТОРІЇ (Ваша оригінальна таблиця) */}
      <section className={css.historySection}>
        <h2>📜 Останні завершені чеки</h2>
        <table className={css.table}>
          <thead>
            <tr>
              <th>Дата видачі</th>
              <th>№</th>
              <th>Страви</th>
              <th>Сума</th>
              <th>Оплата</th>
            </tr>
          </thead>
          <tbody>
            {history.map(order => (
              <tr key={order._id}>
                <td>{new Date(order.updatedAt).toLocaleString('uk-UA')}</td>
                <td>
                  #{order.orderNumber || order._id.slice(-4).toUpperCase()}
                </td>
                <td>
                  <ul className={css.itemList}>
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.name?.uk || item.name} — {item.quantity} шт.
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{order.totalPrice} грн</td>
                <td className={order.isPaid ? css.paid : css.unpaid}>
                  {order.isPaid ? 'Оплачено' : 'Борг'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default OrderHistory;
