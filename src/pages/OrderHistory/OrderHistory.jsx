import { useEffect, useState } from 'react';
import { fetchOrderHistoryRequest } from '../../services/api';
import css from './OrderHistory.module.css';

const OrderHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const data = await fetchOrderHistoryRequest();
        console.log('Дані з бази:', data);
        setHistory(data || []);
      } catch (error) {
        console.error('Помилка завантаження історії:', error);
      } finally {
        setLoading(false);
      }
    };
    getHistory();
  }, []);

  const totalRevenue = history.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0
  );

  if (loading) return <div className={css.loader}>Завантаження історії...</div>;

  return (
    <div className={css.container}>
      <header className={css.header}>
        <h1>📊 Історія виданих замовлень</h1>
        <div className={css.stats}>
          <span>
            Всього замовлень: <strong>{history.length}</strong>
          </span>
          <span>
            Загальна сума: <strong>{totalRevenue} грн</strong>
          </span>
        </div>
      </header>

      <table className={css.table}>
        <thead>
          <tr>
            <th>Дата видачі</th>
            <th>№ Замовлення</th>
            <th>Страви та кількість</th>
            <th>Сума</th>
            <th>Статус оплати</th>
          </tr>
        </thead>
        <tbody>
          {history.map(order => (
            <tr key={order._id}>
              <td>{new Date(order.updatedAt).toLocaleString('uk-UA')}</td>
              <td>#{order.orderNumber || order._id.slice(-4).toUpperCase()}</td>
              <td>
                <ul className={css.itemList}>
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.name?.uk || item.name} —{' '}
                      <strong>{item.quantity} шт.</strong>
                    </li>
                  ))}
                </ul>
              </td>
              <td>{order.totalPrice} грн</td>
              <td>
                <span
                  className={
                    order.isPaid || order.status === 'completed'
                      ? css.paid
                      : css.unpaid
                  }
                >
                  {order.isPaid || order.status === 'completed'
                    ? 'Оплачено'
                    : 'Борг'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
