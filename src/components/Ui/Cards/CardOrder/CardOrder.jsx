/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { FiClock, FiTrash2 } from 'react-icons/fi';
import css from './CardOrder.module.css';

const CardOrder = ({ order, onReady, onArchive, onCancel, t, currentLang }) => {
  const [minutesUntilPickup, setMinutesUntilPickup] = useState(0);
  const [minutesSinceReady, setMinutesSinceReady] = useState(0);

  const isReady = order.status === 'ready';

  useEffect(() => {
    const calc = () => {
      const now = new Date();

      // 1. Отримуємо точну дату, на яку клієнт замовив (дедлайн)
      let deadlineDate;

      if (order.expirationDeadline) {
        deadlineDate = new Date(order.expirationDeadline);
      } else if (order.pickupTime && order.pickupTime.trim() !== '') {
        const [hours, minutes] = order.pickupTime.split(':').map(Number);
        deadlineDate = new Date(order.createdAt);
        deadlineDate.setHours(hours, minutes, 0, 0);
      } else {
        // ЗАПОБІЖНИК: 20 хвилин від створення, якщо нічого не вказано
        deadlineDate = new Date(
          new Date(order.createdAt).getTime() + 20 * 60000
        );
      }

      // 2. Розрахунок для СТАТУСУ "ГОТУЄТЬСЯ" (скільки хвилин залишилось до дедлайну)
      const diffMs = deadlineDate.getTime() - now.getTime();
      setMinutesUntilPickup(Math.floor(diffMs / 60000));

      // 3. Розрахунок для СТАТУСУ "ГОТОВО" (скільки замовлення вже чекає клієнта від часу дедлайну)
      if (isReady) {
        const diffSinceReadyMs = now.getTime() - deadlineDate.getTime();
        // Math.max(0, ...), щоб не показувати від'ємні хвилини, якщо приготували раніше часу
        setMinutesSinceReady(Math.max(0, Math.floor(diffSinceReadyMs / 60000)));
      }
    };

    calc();
    const intervalId = setInterval(calc, 60000);
    return () => clearInterval(intervalId);
  }, [order.createdAt, order.pickupTime, order.expirationDeadline, isReady]);

  // --- СТАТУСИ ---
  const isUrgent = !isReady && minutesUntilPickup <= 15;
  const isOverdue = isReady && minutesSinceReady >= 20;

  return (
    <div
      className={`${css['card-style']} 
        ${isUrgent ? css['urgent-card'] : ''} 
        ${isReady ? css['ready-card'] : ''} 
        ${isOverdue ? css['overdue-card'] : ''}`}
    >
      <div className={css['header-card-style']}>
        <div className={css['blok1']}>
          <div className={css['order-number-wrapper']}>
            <span className={css['order-number-style']}>
              # {order.orderNumber || order._id.slice(-4).toUpperCase()}
            </span>
            {/* {isUrgent && (
            <span className={css['urgent-badge']}>
              {t('urgent', 'Urgent!')}
            </span>
          )} */}
          </div>

          <div className={css['pickup-time-badge-container']}>
            <span className={`${css['pickup-tag']} ${css['scheduled']}`}>
              ⏰ На {order.pickupTime || 'найближчий час'}
            </span>
          </div>
        </div>
        <div className={css['blok2']}>
          <div className={css['header-actions']}>
            <span
              className={`${css['time-style']} ${isUrgent || isOverdue ? css['urgent-time'] : ''}`}
            >
              <FiClock className={css['clock-icon']} />
              <span>
                {isReady ? (
                  <>
                    {minutesSinceReady} {t('minutes_min', 'min')}{' '}
                    <span className={css['waiting-text']}>(чекаємо 20 хв)</span>
                  </>
                ) : minutesUntilPickup > 0 ? (
                  `готовність через ${minutesUntilPickup} хв`
                ) : (
                  `запізнення ${Math.abs(minutesUntilPickup)} хв`
                )}
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
        {!isReady && (
          <button
            onClick={() => onReady(order._id)}
            className={css['button-style']}
          >
            {t('btn_ready', 'Ready for Pickup')}
          </button>
        )}

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

        {isReady && isOverdue && (
          <button
            onClick={() => onCancel(order._id)}
            className={`${css['button-style']} ${css['cancel-order-btn']}`}
          >
            {t('btn_annul', 'Annul Order')}
          </button>
        )}
      </div>
    </div>
  );
};

export default CardOrder;
