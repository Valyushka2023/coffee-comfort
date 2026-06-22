import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  fetchOrdersRequest,
  updateOrderStatus,
  deleteOrderRequest,
} from '../../services/api';
import { Search } from '../../components/Icons/Search.jsx';
import CardOrder from '../../components/Ui/Cards/CardOrder/CardOrder.jsx';

import css from './Baristadashboard.module.css';

const Baristadashboard = () => {
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
    return () => clearInterval(interval); // Тепер назви однакові
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
          <CardOrder
            key={order._id}
            order={order}
            onReady={handleSetReady}
            onArchive={handleArchive}
            onCancel={handleCancelOrder}
            t={t}
            currentLang="uk"
          />
        ))}
      </div>
    </div>
  );
};

export default Baristadashboard;
