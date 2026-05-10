/* eslint-disable react/prop-types */
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
        if (!isInitial && data.length > orders.length) {
          notificationSound.play().catch(() => {});
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
      await updateOrderStatus(orderId, { status: 'completed' });
      setOrders(prev => prev.filter(order => order._id !== orderId));
    } catch (error) {
      console.error(error);
      alert('Не вдалося оновити статус');
    }
  };

  if (loading) return <div className={css.loader}>⏳ Завантаження...</div>;

  return (
    <div className={css['container-style']}>
      <header className={css['header-style']}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logo.png" alt="logo" style={{ width: '40px' }} />{' '}
          {/* Приклад використання лого */}
          <h1>Панель бариста</h1>
        </div>
        <p>Останнє оновлення: {lastUpdate?.toLocaleTimeString()}</p>
      </header>

      <div className={css['grid-style']}>
        {orders.length === 0 ? (
          <div className={css['empty-state']}>
            <h3>Активних замовлень немає 😴</h3>
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

const OrderCard = ({ order, onComplete }) => {
  const [minutesWait, setMinutesWait] = useState(0);

  useEffect(() => {
    const calc = () => {
      setMinutesWait(
        Math.floor((new Date() - new Date(order.createdAt)) / 60000)
      );
    };
    calc();
    const i = setInterval(calc, 60000);
    return () => clearInterval(i);
  }, [order.createdAt]);

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
          <FiClock /> {minutesWait} хв
        </span>
      </div>

      <div className={order.isPaid ? css['paid-badge'] : css['unpaid-badge']}>
        {order.isPaid ? (
          <>
            <FiCreditCard /> ОПЛАЧЕНО
          </> // Тепер FiCreditCard використовується!
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
        {order.items.map((item, i) => (
          <li key={i} className={css['item-style']}>
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
          <FiCheckCircle /> ГОТОВО
        </button>
      </div>
    </div>
  );
};

export default BaristaDashboard;
