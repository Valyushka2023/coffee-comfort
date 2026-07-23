// import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
// import css from './ActiveOrderSuccess.module.css';

// const OrderSuccess = ({ orderNum, pickupTime, onClose }) => {
//   const { t } = useTranslation('cart_modal');

//   return (
//     <div className={css['success-screen']}>
//       <div className={css['success-icon']}>✓</div>
//       <h3 className={css['success-title']}>
//         {t('order_placed_title') || 'Замовлення прийнято!'}
//       </h3>
//       <p className={css['success-text']}>
//         {t('order_number_label') || 'Номер замовлення:'}{' '}
//         <strong>#{orderNum}</strong>
//       </p>
//       {pickupTime && (
//         <p className={css['success-text']}>
//           {t('pickup_time_confirm') || 'Час видачі:'}{' '}
//           <strong>{pickupTime}</strong>
//         </p>
//       )}
//       <button type="button" className={css['close-btn']} onClick={onClose}>
//         {t('close_btn') || 'Зрозуміло'}
//       </button>
//     </div>
//   );
// };

// OrderSuccess.propTypes = {
//   orderNum: PropTypes.string,
//   pickupTime: PropTypes.string,
//   onClose: PropTypes.func.isRequired,
// };

// export default OrderSuccess;
