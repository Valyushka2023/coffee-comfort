import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Clock } from '../../Icons';
import css from './ActiveOrdersList.module.css';

const ActiveOrdersList = ({ activeOrders, currentLang }) => {
  const { t } = useTranslation('cart_modal');

  if (!activeOrders || activeOrders.length === 0) return null;

  return (
    <div className={css['active-orders-container']}>
      <h3 className={css['active-orders-title']}>
        <Clock className={css['banner-icon']} size={18} />
        {t('active_orders_heading', 'Ваші поточні замовлення:')}
      </h3>
      <ul className={css['active-orders-list']}>
        {activeOrders.map(order => (
          <li
            key={order.id || order.number}
            className={css['active-order-item']}
          >
            <div className={css['active-order-header']}>
              <div className={css['active-order-info-block']}>
                <div className={css['active-order-top-row']}>
                  <span className={css['active-order-number']}>
                    {t('title', 'Замовлення')}{' '}
                    <strong className={css['order-value']}>
                      {'# '}
                      {order.number}
                    </strong>
                  </span>
                  <span className={css['active-order-time']}>{order.time}</span>
                </div>

                {order.customerName && (
                  <span className={css['active-order-customer']}>
                    {order.customerName}
                  </span>
                )}
              </div>
            </div>
            <ul className={css['active-order-subitems']}>
              {order.items.map((item, idx) => {
                const itemTitle =
                  typeof item.name === 'object'
                    ? item.name?.[currentLang] || item.name?.uk || item.name?.en
                    : item.title || item.name || 'Item';

                return (
                  <li key={idx}>
                    {itemTitle} —{' '}
                    <strong>
                      {item.quantity} {t('pcs', 'шт.')}
                    </strong>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

ActiveOrdersList.propTypes = {
  activeOrders: PropTypes.array.isRequired,
  currentLang: PropTypes.string.isRequired,
};

export default ActiveOrdersList;
