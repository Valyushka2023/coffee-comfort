/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { FiClock, FiTrash2 } from 'react-icons/fi';
import css from './OrderCard.module.css';

const OrderCard = ({ order, onReady, onArchive, onCancel, t, currentLang }) => {
  const [minutesWait, setMinutesWait] = useState(0);
  const [minutesSinceReady, setMinutesSinceReady] = useState(0);
  const isReady = order.status === 'ready';

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      // Хвилини від моменту створення (для етапу приготування)
      setMinutesWait(Math.floor((now - new Date(order.createdAt)) / 60000));

      // Хвилини від моменту готовності (для етапу видачі)
      if (isReady && order.updatedAt) {
        setMinutesSinceReady(
          Math.floor((now - new Date(order.updatedAt)) / 60000)
        );
      }
    };

    calc();
    const intervalId = setInterval(calc, 60000);
    return () => clearInterval(intervalId);
  }, [order.createdAt, order.updatedAt, isReady]);

  // Чи замовлення готується довше 10 хвилин
  const isUrgent = minutesWait >= 10 && !isReady;

  // Чи замовлення НЕ забрали протягом 20 хвилин після готовності
  const isOverdue = isReady && minutesSinceReady >= 20;

  return (
    <div
      className={`${css['card-style']} 
        ${isUrgent ? css['urgent-card'] : ''} 
        ${isReady ? css['ready-card'] : ''} 
        ${isOverdue ? css['overdue-card'] : ''}`}
    >
      <div className={css['header-card-style']}>
        <div className={css['order-number-wrapper']}>
          <span className={css['order-number-style']}>
            # {order.orderNumber || order._id.slice(-4).toUpperCase()}
          </span>
          {isUrgent && (
            <span className={css['urgent-badge']}>
              {t('urgent', 'Urgent!')}
            </span>
          )}
          {/* {isOverdue && (
            <span className={css['overdue-badge']}>
              ⏰ {t('overdue_badge', 'OVERDUE')}
            </span>
          )} */}
        </div>

        <div className={css['header-actions']}>
          <span
            className={`${css['time-style']} ${isUrgent || isOverdue ? css['urgent-time'] : ''}`}
          >
            <FiClock className={css['clock-icon']} />
            <span>
              {isReady ? minutesSinceReady : minutesWait}{' '}
              {t('minutes_min', 'min')}
            </span>
          </span>
        </div>
        <div>
          <button
            className={css['delete-btn']}
            onClick={e => {
              e.stopPropagation();
              onCancel(order._id);
            }}
            title={t('delete', 'Delete')}
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
        {/* Крок 1: Якщо не готове — кнопка "Підготовлено" */}
        {!isReady && (
          <button
            onClick={() => onReady(order._id)}
            className={css['button-style']}
          >
            {t('btn_ready', 'Ready for Pickup')}
          </button>
        )}

        {/* Крок 2: Якщо готове, але пройшло МЕНШЕ 20 хвилин — вибір оплати */}
        {isReady && !isOverdue && (
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

        {/* Крок 3: Якщо готове і лежить БІЛЬШЕ 20 хвилин — кнопка Анулювання замовлення */}
        {isReady && isOverdue && (
          <button
            onClick={() => onCancel(order._id)} // Викликає анулювання (видалення/архів)
            className={`${css['button-style']} ${css['cancel-order-btn']}`}
          >
            {t('btn_annul', 'Annul Order')}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
