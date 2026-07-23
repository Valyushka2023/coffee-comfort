// import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
// import css from './ActiveOrdersList.module.css';

// const ActiveOrdersList = ({ orders, currentLang, className = '' }) => {
//   const { t } = useTranslation('cart_modal');

//   if (!orders || orders.length === 0) return null;

//   return (
//     <div className={`${css['active-orders-container']} ${className}`.trim()}>
//       <h3 className={css['active-orders-title']}>
//         {t('active_orders_heading') || 'Ваші поточні замовлення'}
//       </h3>
//       <ul className={css['active-orders-list']}>
//         {orders.map(order => (
//           <li key={order.id} className={css['active-order-item']}>
//             <div className={css['active-order-header']}>
//               <span>#{order.number}</span>
//               <span className={css['active-order-time']}>{order.time}</span>
//             </div>
//             <ul className={css['active-order-items-sublist']}>
//               {order.items?.map((item, idx) => {
//                 const itemName =
//                   item.name?.[currentLang] || item.name?.uk || item.name || '';
//                 return (
//                   <li key={idx}>
//                     {itemName} x {item.quantity}
//                   </li>
//                 );
//               })}
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// ActiveOrdersList.propTypes = {
//   orders: PropTypes.array.isRequired,
//   currentLang: PropTypes.string.isRequired,
//   className: PropTypes.string,
// };

// export default ActiveOrdersList;
