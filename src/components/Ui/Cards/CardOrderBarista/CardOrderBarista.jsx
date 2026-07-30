/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { FiClock } from 'react-icons/fi';
import css from './CardOrderBarista.module.css';

const CardOrderBarista = ({
  order,
  onReady,
  onArchive,
  onCancel,
  t,
  currentLang,
}) => {
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
        // Запобіжник: 20 хвилин від створення, якщо нічого не вказано
        deadlineDate = new Date(
          new Date(order.createdAt).getTime() + 20 * 60000
        );
      }

      // 2. Розрахунок для статусу "Готується"
      const diffMs = deadlineDate.getTime() - now.getTime();
      setMinutesUntilPickup(Math.floor(diffMs / 60000));

      // 3. Розрахунок для статусу "Готово"
      if (isReady) {
        const diffSinceReadyMs = now.getTime() - deadlineDate.getTime();
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

  // Динамічний вибір класу стану картки
  const getCardStatusClass = () => {
    if (isOverdue) return css['overdue-card'];
    if (isReady) return css['ready-card'];
    return css['new-card'];
  };

  return (
    <article
      className={`${css['card-style']} ${getCardStatusClass()} ${
        isUrgent ? css['urgent-card'] : ''
      }`}
    >
      {/* HEADER */}
      <header className={css['card-header']}>
        <span className={css['order-number-style']}>
          # {order.orderNumber || order._id.slice(-4).toUpperCase()}
        </span>

        <span className={`${css['pickup-tag']} ${css['scheduled']}`}>
          ⏰ На {order.pickupTime || 'найближчий час'}
        </span>
      </header>

      {/*  MAIN */}
      <main className={css['card-main']}>
        {/* Підблок таймера та статусу часу */}
        <div className={css['time-status-block']}>
          <div
            className={`${css['time-style']} ${
              isUrgent || isOverdue ? css['urgent-time'] : ''
            }`}
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
          </div>

          <div
            className={order.isPaid ? css['paid-badge'] : css['unpaid-badge']}
          >
            {order.isPaid
              ? t('paid', 'PAID')
              : t('pay_on_delivery', 'PAY ON DELIVERY')}
          </div>
        </div>

        {/* Підблок даних клієнта */}
        <div className={css['customer-block']}>
          <p className={css['customer-name']}>
            <strong>{order.customerName}</strong>
          </p>
          <p className={css['customer-phone']}>{order.customerPhone}</p>
        </div>

        {/* Підблок списку замовленого */}
        <section className={css['items-block']}>
          <ul className={css['items-list']}>
            {order.items.map((item, i) => {
              const cleanLang = (currentLang || 'uk').substring(0, 2);
              const itemName =
                typeof item.name === 'object'
                  ? item.name[cleanLang] || item.name['uk'] || item.name['en']
                  : item.name;

              return (
                <li key={i} className={css['item-row']}>
                  <span className={css['item-qty']}>{item.quantity} x</span>{' '}
                  <span className={css['item-name']}>{itemName}</span>
                </li>
              );
            })}
          </ul>
        </section>
        {/* 
        <hr className={css['separator']} /> */}

        {/* Підблок суми замовлення */}
        <div className={css['total-price-block']}>
          <span className={css['total-label']}>
            {t('total_price_label', 'To pay')}:
          </span>
          <span className={css['total-amount']}>{order.totalPrice} грн</span>
        </div>
      </main>

      {/*  FOOTER  */}
      <footer className={css['card-footer']}>
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
              className={`${css['payment-btn']} ${css['cash-btn']}`}
            >
              {t('cash', 'Cash')}
            </button>
            <button
              onClick={() => onArchive(order._id, 'card')}
              className={`${css['payment-btn']} ${css['card-btn']}`}
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
      </footer>
    </article>
  );
};

export default CardOrderBarista;
