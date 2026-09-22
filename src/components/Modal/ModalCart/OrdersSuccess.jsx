import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { CheckCircle } from '../../Icons';
import css from './OrdersSuccess.module.css';

const OrdersSuccess = ({ orderNum, pickupTime, onClose }) => {
  const { t } = useTranslation('cart_modal');

  return (
    <div className={css['success-container']}>
      <CheckCircle size={80} className={css['success-icon']} />
      <h2 className={css['success-title']}>{t('thank_you')}</h2>
      <p className={css['order-number-label']}>{t('order_number')}</p>
      <div className={css['order-number-badge']}>
        {'# '}
        {orderNum}
      </div>
      <div className={css['pickup-time-info']}>
        <span className={css['pickup-time-text']}>
          {t('pickup_time_info_label', 'Time of receipt:')}{' '}
          <strong className={css['pickup-time-value']}>
            {pickupTime || t('closest_time', 'In the near future')}
          </strong>
        </span>
      </div>
      <p className={css['warning-text']}>{t('warning_hold')}</p>
      <button
        type="button"
        className={css['order-btn']}
        onClick={onClose}
        aria-label={t('understood')}
      >
        {t('understood')}
      </button>
    </div>
  );
};

OrdersSuccess.propTypes = {
  orderNum: PropTypes.string,
  pickupTime: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OrdersSuccess;
