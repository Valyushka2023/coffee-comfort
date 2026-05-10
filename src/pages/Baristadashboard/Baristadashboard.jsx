import { useEffect, useState, useCallback, useRef } from 'react';
import { fetchOrdersRequest, updateOrderStatus } from '../../services/api';
import {
  FiClock,
  FiUser,
  FiPhone,
  FiCheckCircle,
  FiAlertCircle,
  FiCreditCard,
} from 'react-icons/fi';
import css from './Baristadashboard.module.css';

// Звук сповіщення (файл має бути в public/sounds/notification.mp3)
const notificationSound = new Audio('/sounds/notification.mp3');

const BaristaDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const isFetching = useRef(false);

  const getOrders = useCallback(
    async (isInitial = false) => {
      if (isFetching.current) return;
      isFetching.current = true;
      try {
        const data = await fetchOrdersRequest();

        // Звукове сповіщення, якщо з'явилися НОВІ замовлення
        if (!isInitial && data.length > orders.length) {
          notificationSound
            .play()
            .catch(() => console.log('Звук заблоковано браузером'));
        }

        setOrders(data || []);
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Помилка завантаження:', error);
      } finally {
        isFetching.current = false;
        if (isInitial) setLoading(false);
      }
    },
    [orders.length]
  );

  useEffect(() => {
    getOrders(true);
    const interval = setInterval(() => getOrders(false), 15000);
    return () => clearInterval(interval);
  }, [getOrders]);

  const handleCompleteOrder = async orderId => {
    try {
      // 1. Оновлюємо статус у базі на 'completed'
      await updateOrderStatus(orderId, { status: 'completed' });

      // 2. Видаляємо локально зі списку активних
      setOrders(prev => prev.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Помилка при завершенні замовлення:', error);
      alert('Не вдалося оновити статус у базі даних');
    }
  };

  if (loading) {
    return <div className={css.loader}>⏳ Завантаження замовлень...</div>;
  }

  return (
    <div className={css['container-style']}>
      <header className={css['header-style']}>
        <h1>☕ Панель бариста</h1>
        <p>
          Останнє оновлення:{' '}
          {lastUpdate ? lastUpdate.toLocaleTimeString() : '—'}
        </p>
      </header>

      <div className={css['grid-style']}>
        {orders.length === 0 ? (
          <div className={css['empty-state']}>
            <h3>Активних замовлень поки немає 😴</h3>
          </div>
        ) : (
          orders.map(order => (
            <OrderCard
              key={order._id}
              order={order}
              onComplete={handleCompleteOrder}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Окремий компонент для картки, щоб таймер оновлювався незалежно
const OrderCard = ({ order, onComplete }) => {
  const [minutesWait, setMinutesWait] = useState(0);

  useEffect(() => {
    const calcTime = () => {
      const start = new Date(order.createdAt);
      const now = new Date();
      setMinutesWait(Math.floor((now - start) / 60000));
    };
    calcTime();
    const interval = setInterval(calcTime, 60000);
    return () => clearInterval(interval);
  }, [order.createdAt]);

  // Якщо замовлення висить понад 10 хв — воно стає "терміновим"
  const isUrgent = minutesWait >= 10;

  return (
    <div
      className={`${css['card-style']} ${isUrgent ? css['urgent-card'] : ''}`}
    >
      <div className={css['header-card-style']}>
        <span className={css['order-number-style']}>
          #{order.orderNumber || order._id.slice(-4).toUpperCase()}
        </span>
        <span
          className={`${css['time-style']} ${isUrgent ? css['urgent-text'] : ''}`}
        >
          <FiClock /> {minutesWait} хв очікування
        </span>
      </div>

      {/* СТАТУС ОПЛАТИ */}
      <div className={order.isPaid ? css['paid-badge'] : css['unpaid-badge']}>
        {order.isPaid ? (
          <>
            <FiCheckCircle /> ОПЛАЧЕНО
          </>
        ) : (
          <>
            <FiAlertCircle /> ОПЛАТА ПРИ ОТРИМАННІ
          </>
        )}
      </div>

      <div className={css['customer-info-style']}>
        <p>
          <FiUser /> <strong>{order.customerName}</strong>
        </p>
        <p>
          <FiPhone /> {order.customerPhone}
        </p>
      </div>

      <ul className={css['items-list-style']}>
        {order.items.map((item, index) => (
          <li key={index} className={css['item-style']}>
            <span className={css['quantity-style']}>{item.quantity} x</span>
            <span>{item.name?.uk || item.name}</span>
          </li>
        ))}
      </ul>

      <div className={css['footer-style']}>
        <span className={css['total-style']}>
          Сума: {order.totalAmount} грн
        </span>
        <button
          onClick={() => onComplete(order._id)}
          className={css['button-style']}
        >
          <FiCheckCircle /> Готово
        </button>
      </div>
    </div>
  );
};

export default BaristaDashboard;
