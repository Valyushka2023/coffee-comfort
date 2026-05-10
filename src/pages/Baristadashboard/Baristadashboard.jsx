/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback, useRef } from 'react';
import { fetchOrdersRequest, updateOrderStatus } from '../../services/api';
import {
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiPackage,
} from 'react-icons/fi';

import css from './Baristadashboard.module.css';

const BaristaDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFetching = useRef(false);

  const getOrders = useCallback(async (isInitial = false) => {
    if (isFetching.current) return;
    isFetching.current = true;
    try {
      const data = await fetchOrdersRequest();
      setOrders(data || []);
    } catch (error) {
      console.error('Помилка завантаження:', error);
    } finally {
      isFetching.current = false;
      if (isInitial) setLoading(false);
    }
  }, []);

  useEffect(() => {
    getOrders(true);
    const interval = setInterval(() => getOrders(false), 15000);
    return () => clearInterval(interval);
  }, [getOrders]);

  // Крок 1: Замовлення підготовлено (зміна кольору)
  const handleSetReady = async orderId => {
    try {
      await updateOrderStatus(orderId, { status: 'ready' });
      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, status: 'ready' } : order
        )
      );
    } catch (error) {
      console.error(error);
      alert('Не вдалося оновити статус');
    }
  };

  // Крок 2: Замовлення видано клієнту (зникає)
  const handleArchive = async orderId => {
    try {
      await updateOrderStatus(orderId, { status: 'completed' });
      setOrders(prev => prev.filter(order => order._id !== orderId));
    } catch (error) {
      console.error(error);
      alert('Не вдалося видалити замовлення');
    }
  };

  if (loading) return <div className={css.loader}>⏳ Завантаження...</div>;

  return (
    <div className={css['container-style']}>
      <header className={css['header-style']}>
        <h1>☕ Панель бариста</h1>
      </header>
      <div className={css['grid-style']}>
        {orders.map(order => (
          <OrderCard
            key={order._id}
            order={order}
            onReady={handleSetReady}
            onArchive={handleArchive}
          />
        ))}
      </div>
    </div>
  );
};

const OrderCard = ({ order, onReady, onArchive }) => {
  const [minutesWait, setMinutesWait] = useState(0);
  const isReady = order.status === 'ready';

  useEffect(() => {
    const calc = () =>
      setMinutesWait(
        Math.floor((new Date() - new Date(order.createdAt)) / 60000)
      );
    calc();
    const i = setInterval(calc, 60000);
    return () => clearInterval(i);
  }, [order.createdAt]);

  const isUrgent = minutesWait >= 10 && !isReady;

  return (
    <div
      className={`${css['card-style']} ${isUrgent ? css['urgent-card'] : ''} ${isReady ? css['ready-card'] : ''}`}
    >
      <div className={css['header-card-style']}>
        <span className={css['order-number-style']}>
          #{order._id.slice(-4).toUpperCase()}
        </span>
        <span className={css['time-style']}>
          <FiClock /> {minutesWait} хв
        </span>
      </div>

      <div className={order.isPaid ? css['paid-badge'] : css['unpaid-badge']}>
        {order.isPaid ? <FiCheckCircle /> : <FiAlertCircle />}{' '}
        {order.isPaid ? 'ОПЛАЧЕНО' : 'ОПЛАТА ПРИ ОТРИМАННІ'}
      </div>

      <div className={css['customer-info-style']}>
        <p>
          <strong>{order.customerName}</strong>
        </p>
        <p>{order.customerPhone}</p>
      </div>

      <ul className={css['items-list-style']}>
        {order.items.map((item, i) => (
          <li key={i}>
            {item.quantity} x {item.name?.uk || item.name}
          </li>
        ))}
      </ul>

      <div className={css['footer-style']}>
        {!isReady ? (
          <button
            onClick={() => onReady(order._id)}
            className={css['button-style']}
          >
            <FiPackage /> Підготовлено
          </button>
        ) : (
          <button
            onClick={() => onArchive(order._id)}
            className={css['archive-button']}
          >
            ✅ Видано клієнту
          </button>
        )}
      </div>
    </div>
  );
};

export default BaristaDashboard;
