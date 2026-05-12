import { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import css from './OrderHistory.module.css';

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
        const [historyRes, statsRes] = await Promise.all([
          API.get('/orders/history'),
          API.get(`/orders/stats?date=${selectedDate}`),
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

  // ОНОВЛЕНА ФУНКЦІЯ ЕКСПОРТУ
  const exportToExcel = () => {
    if (history.length === 0 && stats.length === 0) {
      alert('Немає даних для експорту');
      return;
    }

    const workbook = XLSX.utils.book_new();

    // 1. Формуємо дані для вкладки "Історія чеків"
    const historyData = history.map(order => ({
      'Дата видачі': new Date(order.updatedAt).toLocaleString('uk-UA'),
      '№ чека': order.orderNumber || order._id.slice(-4).toUpperCase(),
      Страви: order.items
        .map(i => `${i.name?.uk || i.name} (${i.quantity} шт)`)
        .join(', '),
      'Сума (грн)': order.totalPrice,
      Статус: order.isPaid ? 'Оплачено' : 'Борг',
    }));

    const historySheet = XLSX.utils.json_to_sheet(historyData);
    // Налаштування ширини колонок для історії
    historySheet['!cols'] = [
      { wch: 20 },
      { wch: 10 },
      { wch: 50 },
      { wch: 12 },
      { wch: 12 },
    ];
    XLSX.utils.book_append_sheet(workbook, historySheet, 'Історія чеків');

    // 2. Формуємо дані для вкладки "Підсумок по стравах"
    const statsData = stats.map(item => ({
      'Назва страви': item._id,
      'Продано (шт)': item.totalQuantity,
      'Загальна сума (грн)': item.totalPrice,
    }));

    // Додаємо фінальний рядок з загальною виручкою
    const totalDayRevenue = stats.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );
    statsData.push({
      'Назва страви': 'РАЗОМ ЗА ДЕНЬ:',
      'Продано (шт)': '',
      'Загальна сума (грн)': totalDayRevenue,
    });

    const statsSheet = XLSX.utils.json_to_sheet(statsData);
    // Налаштування ширини колонок для статистики
    statsSheet['!cols'] = [{ wch: 30 }, { wch: 15 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(workbook, statsSheet, 'Підсумок за день');

    // 3. Генерація файлу
    XLSX.writeFile(workbook, `Coffee_Comfort_Report_${selectedDate}.xlsx`);
  };

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

      {/* СЕКЦІЯ ІСТОРІЇ */}
      <section className={css.historySection}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px',
          }}
        >
          <h2>📜 Останні завершені чеки</h2>
          <button
            onClick={exportToExcel}
            style={{
              backgroundColor: '#2e7d32',
              color: 'white',
              padding: '10px 18px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            💾 Експортувати повний звіт
          </button>
        </div>

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
/**/
// import { useEffect, useState } from 'react';
// import axios from 'axios'; // Використовуємо для запитів
// import css from './OrderHistory.module.css';
// // Використовуємо вашу зміну з .env.
// // Додаємо /api, якщо ваш бекенд очікує цей префікс
// const API_URL =
//   import.meta.env.VITE_API_URL || 'https://coffee-comfort.onrender.com';

// const API = axios.create({
//   baseURL: `${API_URL}/api`,
// });
// const OrderHistory = () => {
//   const [history, setHistory] = useState([]);
//   const [stats, setStats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split('T')[0]
//   );

//   useEffect(() => {
//     const loadAllData = async () => {
//       setLoading(true);
//       try {
//         // Отримуємо і загальну історію, і статистику за вибрану дату одночасно
//         const [historyRes, statsRes] = await Promise.all([
//           API.get('/orders/history'),
//           API.get(`/orders/stats?date=${selectedDate}`),
//         ]);
//         API.get('/orders/history');
//         setHistory(historyRes.data || []);
//         setStats(statsRes.data || []);
//       } catch (error) {
//         console.error('Помилка завантаження даних:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadAllData();
//   }, [selectedDate]);

//   const totalDayRevenue = stats.reduce((sum, item) => sum + item.totalPrice, 0);

//   if (loading && history.length === 0)
//     return <div className={css.loader}>Завантаження...</div>;

//   return (
//     <div className={css.container}>
//       <header className={css.header}>
//         <h1>📊 Звітність та Історія</h1>
//         <div className={css.filterWrapper}>
//           <label htmlFor="datePicker">Аналітика за день: </label>
//           <input
//             id="datePicker"
//             type="date"
//             value={selectedDate}
//             onChange={e => setSelectedDate(e.target.value)}
//             className={css.dateInput}
//           />
//         </div>
//       </header>

//       {/* СЕКЦІЯ АНАЛІТИКИ */}
//       <section className={css.statsSection}>
//         <div className={css.statsSummary}>
//           <h2>
//             Підсумок по стравах (
//             {new Date(selectedDate).toLocaleDateString('uk-UA')})
//           </h2>
//           <div className={css.totalBadge}>
//             Всього за день: {totalDayRevenue} грн
//           </div>
//         </div>

//         <table className={css.statsTable}>
//           <thead>
//             <tr>
//               <th>Страва</th>
//               <th>Продано (шт)</th>
//               <th>Загальна сума</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stats.length > 0 ? (
//               stats.map(item => (
//                 <tr key={item._id}>
//                   <td>{item._id}</td>
//                   <td>
//                     <strong>{item.totalQuantity}</strong>
//                   </td>
//                   <td>{item.totalPrice} грн</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3">Немає виданих замовлень за цю дату</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </section>

//       <hr className={css.divider} />

//       {/* СЕКЦІЯ ІСТОРІЇ (Ваша оригінальна таблиця) */}
//       <section className={css.historySection}>
//         <h2>📜 Останні завершені чеки</h2>
//         <table className={css.table}>
//           <thead>
//             <tr>
//               <th>Дата видачі</th>
//               <th>№</th>
//               <th>Страви</th>
//               <th>Сума</th>
//               <th>Оплата</th>
//             </tr>
//           </thead>
//           <tbody>
//             {history.map(order => (
//               <tr key={order._id}>
//                 <td>{new Date(order.updatedAt).toLocaleString('uk-UA')}</td>
//                 <td>
//                   #{order.orderNumber || order._id.slice(-4).toUpperCase()}
//                 </td>
//                 <td>
//                   <ul className={css.itemList}>
//                     {order.items.map((item, i) => (
//                       <li key={i}>
//                         {item.name?.uk || item.name} — {item.quantity} шт.
//                       </li>
//                     ))}
//                   </ul>
//                 </td>
//                 <td>{order.totalPrice} грн</td>
//                 <td className={order.isPaid ? css.paid : css.unpaid}>
//                   {order.isPaid ? 'Оплачено' : 'Борг'}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>
//     </div>
//   );
// };

// export default OrderHistory;
