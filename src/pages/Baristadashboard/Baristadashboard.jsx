// import { useEffect, useState, useCallback, useRef } from 'react';
// import { fetchOrdersRequest } from '../../services/api';
// import { FiClock, FiUser, FiPhone, FiCheckCircle } from 'react-icons/fi';
// import css from './Baristadashboard.module.css';

// const BaristaDashboard = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [lastUpdate, setLastUpdate] = useState(null);
//   const isFetching = useRef(false);

//   const getOrders = useCallback(async (isInitial = false) => {
//     if (isFetching.current) return;

//     isFetching.current = true;
//     try {
//       const data = await fetchOrdersRequest();
//       setOrders(data || []);
//       setLastUpdate(new Date());
//     } catch (error) {
//       console.error('Помилка завантаження замовлень:', error);
//     } finally {
//       isFetching.current = false;
//       if (isInitial) setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     getOrders(true);

//     const interval = setInterval(() => {
//       getOrders(false);
//     }, 15000);

//     return () => clearInterval(interval);
//   }, [getOrders]);

//   const handleCompleteOrder = async orderId => {
//     try {
//       // Тут ми фільтруємо список локально
//       setOrders(prev => prev.filter(order => order._id !== orderId));
//       console.log(`Замовлення ${orderId} виконано`);
//     } catch (error) {
//       console.error('Помилка при завершенні замовлення:', error);
//       alert('Не вдалося оновити статус замовлення');
//     }
//   };

//   if (loading) {
//     return (
//       <div
//         className={{
//           textAlign: 'center',
//           padding: '3.125rem',
//           fontSize: '1.2rem',
//         }}
//       >
//         ⏳ Завантаження замовлень...
//       </div>
//     );
//   }

//   return (
//     <div className={css['container-style']}>
//       <header className={css['header-style']}>
//         <h1 className={{ color: '#2c3e50', margin: 0 }}>☕ Панель бариста</h1>
//         <p className={{ color: '#7f8c8d' }}>
//           Останнє оновлення:{' '}
//           {lastUpdate ? lastUpdate.toLocaleTimeString() : '—'}
//         </p>
//       </header>

//       <div className={css['grid-style']}>
//         {orders.length === 0 ? (
//           <div
//             style={{
//               gridColumn: '1/-1',
//               textAlign: 'center',
//               padding: '2.5rem',
//             }}
//           >
//             <h3>Активних замовлень поки немає 😴</h3>
//           </div>
//         ) : (
//           orders.map(order => (
//             <div key={order._id} className={css['card-style']}>
//               <div className={css['header-card-style']}>
//                 <span className={css['order-number-style']}>
//                   #{order._id.slice(-4).toUpperCase()}
//                 </span>
//                 <span className={css['time-style']}>
//                   <FiClock /> {order.pickupTime || 'ASAP'}
//                 </span>
//               </div>

//               <div className={css['customer-info-style']}>
//                 <p className={{ margin: '0.3125rem 0' }}>
//                   <FiUser /> <strong>{order.customerName}</strong>
//                 </p>
//                 <p className={{ margin: '0.3125rem 0' }}>
//                   <FiPhone /> {order.customerPhone}
//                 </p>
//               </div>

//               <ul className={css['items-list-style']}>
//                 {order.items.map((item, index) => (
//                   <li key={index} className={css['item-style']}>
//                     <span className={css['quantity-style']}>
//                       {item.quantity} x
//                     </span>
//                     <span>{item.name?.uk || item.name}</span>
//                   </li>
//                 ))}
//               </ul>

//               <div className={css['footer-style']}>
//                 <span className={css['total - style']}>
//                   Сума: {order.totalAmount} грн
//                 </span>
//                 <button
//                   onClick={() => handleCompleteOrder(order._id)}
//                   className={css['button-style']}
//                 >
//                   <FiCheckCircle /> Готово
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default BaristaDashboard;
/**/
import { useEffect, useState, useCallback, useRef } from 'react';
import { fetchOrdersRequest } from '../../services/api';
import { FiClock, FiUser, FiPhone, FiCheckCircle } from 'react-icons/fi';
import css from './Baristadashboard.module.css';

const BaristaDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const isFetching = useRef(false);

  const getOrders = useCallback(async (isInitial = false) => {
    if (isFetching.current) return;
    isFetching.current = true;
    try {
      const data = await fetchOrdersRequest();
      console.log('Дані з сервера:', data); // ДОДАЙТЕ ЦЕ

      // Перевірка: чи приходить масив?
      setOrders(data || []);
      setLastUpdate(new Date());
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

  const handleCompleteOrder = async orderId => {
    try {
      // ТУТ МАЄ БУТИ ЗАПИТ ДО API, наприклад:
      // await updateOrderStatus(orderId, 'completed');

      setOrders(prev => prev.filter(order => order._id !== orderId));
    } catch (error) {
      console.error(error); // Додаємо використання змінної
      alert('Не вдалося оновити статус замовлення');
    }
  };

  if (loading) {
    return <div className={css.loader}>⏳ Завантаження замовлень...</div>;
  }

  return (
    <div className={css['container-style']}>
      <header className={css['header-style']}>
        <h1>☕ Панель бариста</h1>
        <p>
          Останнє оновлення:{' '}
          {lastUpdate ? lastUpdate.toLocaleTimeString() : '—'}
        </p>
      </header>

      <div className={css['grid-style']}>
        {orders.length === 0 ? (
          <div className={css['empty-state']}>
            <h3>Активних замовлень поки немає 😴</h3>
          </div>
        ) : (
          orders.map(order => (
            <div key={order._id} className={css['card-style']}>
              <div className={css['header-card-style']}>
                <span className={css['order-number-style']}>
                  #{order._id.slice(-4).toUpperCase()}
                </span>
                <span className={css['time-style']}>
                  <FiClock /> {order.pickupTime || 'ASAP'}
                </span>
              </div>

              <div className={css['customer-info-style']}>
                <p>
                  <FiUser /> <strong>{order.customerName}</strong>
                </p>
                <p>
                  <FiPhone /> {order.customerPhone}
                </p>
              </div>

              <ul className={css['items-list-style']}>
                {order.items.map((item, index) => (
                  <li key={index} className={css['item-style']}>
                    <span className={css['quantity-style']}>
                      {item.quantity} x
                    </span>
                    <span>{item.name?.uk || item.name}</span>
                  </li>
                ))}
              </ul>

              <div className={css['footer-style']}>
                <span className={css['total-style']}>
                  Сума: {order.totalAmount} грн
                </span>
                <button
                  onClick={() => handleCompleteOrder(order._id)}
                  className={css['button-style']}
                >
                  <FiCheckCircle /> Готово
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BaristaDashboard;
