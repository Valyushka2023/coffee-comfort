import { useEffect, useState } from 'react';
import {
  fetchOrderHistoryRequest,
  fetchOrderStatsRequest,
} from '../../services/api'; // Перевірте шлях до файлу api.js
import * as XLSX from 'xlsx';
import css from './OrderHistory.module.css';

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
        // Використовуємо ваші функції з api.js
        const historyData = await fetchOrderHistoryRequest();
        const statsData = await fetchOrderStatsRequest(selectedDate);

        setHistory(historyData || []);
        setStats(statsData || []);
      } catch (error) {
        console.error('Помилка завантаження даних:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [selectedDate]);

  // ОНОВЛЕНА ФУНКЦІЯ ЕКСПОРТУ: ГЕНЕРУЄ ДВІ ВКЛАДКИ
  const exportToExcel = () => {
    if (history.length === 0 && stats.length === 0) {
      alert('Немає даних для експорту');
      return;
    }

    // Створюємо нову робочу книгу Excel
    const workbook = XLSX.utils.book_new();

    // ==========================================
    // 1. ФОРМУЄМО ВКЛАДКУ "Історія чеків"
    // ==========================================
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

    // Налаштування гарної ширини колонок для першої вкладки
    historySheet['!cols'] = [
      { wch: 20 }, // Дата видачі
      { wch: 12 }, // № чека
      { wch: 50 }, // Страви
      { wch: 12 }, // Сума (грн)
      { wch: 12 }, // Статус
    ];
    XLSX.utils.book_append_sheet(workbook, historySheet, 'Історія чеків');

    // ==========================================
    // 2. ФОРМУЄМО ВКЛАДКУ "Підсумок за день"
    // ==========================================
    const statsData = stats.map(item => ({
      'Назва страви': item._id,
      'Продано (шт)': item.totalQuantity,
      'Загальна сума (грн)': item.totalPrice,
    }));

    // Рахуємо фінальну編曲у за масивом статистики
    const totalDayRevenueCalculated = stats.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    // Додаємо підсумковий рядок в самий кінець таблиці
    statsData.push({
      'Назва страви': 'РАЗОМ ЗА ДЕНЬ:',
      'Продано (шт)': '',
      'Загальна сума (грн)': totalDayRevenueCalculated,
    });

    const statsSheet = XLSX.utils.json_to_sheet(statsData);

    // Налаштування ширини колонок для другої вкладки
    statsSheet['!cols'] = [
      { wch: 30 }, // Назва страви
      { wch: 15 }, // Продано (шт)
      { wch: 20 }, // Загальна сума (грн)
    ];
    XLSX.utils.book_append_sheet(workbook, statsSheet, 'Підсумок за день');

    // ==========================================
    // 3. ЗБЕРЕЖЕННЯ ГОТОВОГО ФАЙЛУ
    // ==========================================
    XLSX.writeFile(workbook, `Coffee_Comfort_Report_${selectedDate}.xlsx`);
  };

  const totalDayRevenue = stats.reduce((sum, item) => sum + item.totalPrice, 0);

  if (loading && history.length === 0)
    return <div className={css.loader}>Завантаження...</div>;

  return (
    <div className={css.container}>
      <header className={css.header}>
        <h1>📊 Звітність та Історія</h1>

        {/* ВИПРАВЛЕНИЙ БЛОК ДЛЯ ОРГАНІЗАЦІЇ ДУЖЕ СУВОРОГО ESLINT */}
        <div className={css.filterWrapper}>
          <label htmlFor="history-date-picker">
            Аналітика за день:
            <input
              id="history-date-picker"
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className={css.dateInput}
            />
          </label>
        </div>
      </header>

      <section className={css.statsSection}>
        <div className={css.statsSummary}>
          <h2>
            Підсумок по стравах (
            {new Date(selectedDate).toLocaleDateString('uk-UA')})
          </h2>
          <div className={css.totalBadge}>Всього: {totalDayRevenue} грн</div>
        </div>
        <table className={css.statsTable}>
          <thead>
            <tr>
              <th>Страва</th>
              <th>Продано</th>
              <th>Сума</th>
            </tr>
          </thead>
          <tbody>
            {stats.length > 0 ? (
              stats.map(item => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.totalQuantity}</td>
                  <td>{item.totalPrice} грн</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Дані відсутні</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section className={css.historySection}>
        <div className={css.flexHeader}>
          <h2>📜 Останні завершені чеки</h2>
          <button onClick={exportToExcel} className={css.exportBtn}>
            💾 Експорт Excel
          </button>
        </div>
        <table className={css.table}>
          <thead>
            <tr>
              <th>Дата</th>
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
                  {order.items.map((item, i) => (
                    <div key={i}>
                      {item.name?.uk || item.name} — {item.quantity} шт.
                    </div>
                  ))}
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
