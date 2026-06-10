/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
// import { useDispatch } from 'react-redux';
import {
  fetchOrdersRequest,
  updateOrderStatus,
  deleteOrderRequest,
} from '../../services/api';
// import { FiClock, FiTrash2, FiSearch } from 'react-icons/fi';
import { FiClock, FiTrash2 } from 'react-icons/fi';
import { Search } from '../../components/Icons/Search.jsx';

import css from './Baristadashboard.module.css';

const Baristadashboard = () => {
  // ПРИМУСОВО фіксуємо українську мову для панелі баристи
  const { t } = useTranslation('baristadashboard', {
    lng: 'uk',
    useSuspense: true,
  });

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const isFetching = useRef(false);

  const getOrders = useCallback(async (isInitial = false) => {
    if (isFetching.current) return;
    isFetching.current = true;
    try {
      const data = await fetchOrdersRequest();
      setOrders(data || []);
    } catch (error) {
      console.error('Fetch error:', error);
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
      alert(t('error_update_status', 'Failed to update status'));
    }
  };

  const handleArchive = async (orderId, paymentMethod) => {
    try {
      await updateOrderStatus(orderId, {
        status: 'completed',
        isPaid: true,
        paymentMethod,
      });
      setOrders(prev => prev.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Archive error:', error);
      alert(t('error_update_status', 'Failed to update status'));
    }
  };

  const handleCancelOrder = async orderId => {
    if (
      !window.confirm(
        t('confirm_cancel', 'Are you sure you want to cancel this order?')
      )
    )
      return;
    try {
      await deleteOrderRequest(orderId);
      setOrders(prev => prev.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Cancel error:', error);
      alert(t('error_cancel', 'Failed to cancel order'));
    }
  };

  const filteredOrders = useMemo(() => {
    const cleanQuery = searchQuery.trim().toLowerCase().replace('#', '');
    if (!cleanQuery) return orders;

    const digitsQuery = cleanQuery.replace(/\D/g, '');

    return orders.filter(order => {
      const orderNum = String(order.orderNumber || '').toLowerCase();
      const orderIdTail = order._id ? order._id.slice(-4).toLowerCase() : '';
      if (orderNum.includes(cleanQuery) || orderIdTail.includes(cleanQuery)) {
        return true;
      }

      const customerName = String(order.customerName || '').toLowerCase();
      if (customerName.includes(cleanQuery)) {
        return true;
      }

      const customerPhone = String(order.customerPhone || '');
      const cleanPhone = customerPhone.replace(/\D/g, '');
      if (digitsQuery && cleanPhone.includes(digitsQuery)) {
        return true;
      }

      return false;
    });
  }, [orders, searchQuery]);

  if (loading)
    return <div className={css['loader']}>⏳ {t('loading', 'Loading...')}</div>;

  return (
    <div className={css['container-style']}>
      <header className={css['header-style']}>
        <h1>☕ {t('title', 'Barista Dashboard')}</h1>

        <div className={css['search-wrapper']}>
          {/* <FiSearch className={css['search-icon']} /> */}
          <Search className={css['search-icon']} />
          <input
            type="text"
            className={css['field-input-search']}
            placeholder={t('search_placeholder')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className={css['clear-search']}
              onClick={() => setSearchQuery('')}
            >
              ×
            </button>
          )}
        </div>
      </header>

      {filteredOrders.length === 0 && searchQuery && (
        <div className={css['no-results']}>
          🔍 {t('no_results', 'No orders found')}
        </div>
      )}

      <div className={css['grid-style']}>
        {filteredOrders.map(order => (
          <OrderCard
            key={order._id}
            order={order}
            onReady={handleSetReady}
            onArchive={handleArchive}
            onCancel={handleCancelOrder}
            t={t}
            currentLang="uk" // Фіксуємо українську мову для картки замовлення
          />
        ))}
      </div>
    </div>
  );
};

const OrderCard = ({ order, onReady, onArchive, onCancel, t, currentLang }) => {
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
          #{order.orderNumber || order._id.slice(-4).toUpperCase()}
        </span>
        <div className={css['header-actions']}>
          {isUrgent && (
            <span
              className={css['urgent-text']}
              style={{ fontSize: '0.85rem', textTransform: 'uppercase' }}
            >
              ⚠️ {t('urgent', 'Urgent!')}
            </span>
          )}
          <span
            className={`${css['time-style']} ${isUrgent ? css['urgent-text'] : ''}`}
          >
            <FiClock /> {minutesWait} {t('minutes_min', 'min')}
          </span>
          <button
            className={css['cancel-btn']}
            onClick={e => {
              e.stopPropagation();
              onCancel(order._id);
            }}
            title={t('cancel', 'Cancel')}
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      <div className={order.isPaid ? css['paid-badge'] : css['unpaid-badge']}>
        {order.isPaid
          ? t('paid', 'PAID')
          : t('pay_on_delivery', 'PAY ON DELIVERY')}
      </div>

      <div className={css['customer-info-style']}>
        <p>
          <strong>{order.customerName}</strong>
        </p>
        <p>{order.customerPhone}</p>
      </div>

      <ul className={css['items-list-style']}>
        {order.items.map((item, i) => {
          // Завжди використовуємо 'uk', оскільки панель адміністрування локальна
          const cleanLang = (currentLang || 'uk').substring(0, 2);
          const itemName =
            typeof item.name === 'object'
              ? item.name[cleanLang] || item.name['uk'] || item.name['en']
              : item.name;

          return (
            <li key={i}>
              {item.quantity} x {itemName}
            </li>
          );
        })}
      </ul>

      <hr className={css['separator']} />
      <div className={css['total-price-block']}>
        <span className={css['total-label']}>
          {t('total_price_label', 'To pay')}:
        </span>
        <span className={css['total-amount']}>{order.totalPrice} грн</span>
      </div>

      <div className={css['footer-style']}>
        {!isReady ? (
          <button
            onClick={() => onReady(order._id)}
            className={css['button-style']}
          >
            {t('btn_ready', 'Ready for Pickup')}
          </button>
        ) : (
          <div className={css['payment-buttons-group']}>
            <button
              onClick={() => onArchive(order._id, 'cash')}
              className={`${css['archive-button']} ${css['cash-btn']}`}
            >
              {t('cash', 'Cash')}
            </button>
            <button
              onClick={() => onArchive(order._id, 'card')}
              className={`${css['archive-button']} ${css['card-btn']}`}
            >
              {t('card', 'Terminal')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Baristadashboard;
