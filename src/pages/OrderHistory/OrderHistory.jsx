// import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import {
//   fetchOrderHistoryRequest,
//   fetchOrderStatsRequest,
// } from '../../services/api';
// import * as XLSX from 'xlsx';
// import Loader from '../../components/Ui/Loader/Loader.jsx';
// import css from './OrderHistory.module.css';

// const OrderHistory = () => {
//   const { t, i18n } = useTranslation('order_history');
//   const currentLanguage = (i18n.language || 'uk').substring(0, 2);
//   const isUk = currentLanguage === 'uk';

//   const [history, setHistory] = useState([]);
//   const [dishStats, setDishStats] = useState([]);
//   const [cashRevenue, setCashRevenue] = useState(0);
//   const [cardRevenue, setCardRevenue] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [visibleChecksCount, setVisibleChecksCount] = useState(10);

//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split('T')[0]
//   );

//   useEffect(() => {
//     const loadAllData = async () => {
//       setLoading(true);
//       try {
//         const historyData = await fetchOrderHistoryRequest();
//         const statsData = await fetchOrderStatsRequest(selectedDate);

//         setHistory(historyData || []);

//         // Перевіряємо та безпечно розбираємо оновлену структуру відповіді бекенду
//         if (
//           statsData &&
//           typeof statsData === 'object' &&
//           'dishes' in statsData
//         ) {
//           setDishStats(statsData.dishes || []);
//           setCashRevenue(statsData.cash || 0);
//           setCardRevenue(statsData.card || 0);
//         } else {
//           // Захист на випадок, якщо бекенд повернув старий формат масиву
//           setDishStats(Array.isArray(statsData) ? statsData : []);
//           setCashRevenue(0);
//           setCardRevenue(0);
//         }

//         setVisibleChecksCount(10);
//       } catch (error) {
//         console.error('❌ Data loading error:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadAllData();
//   }, [selectedDate]);

//   // ==========================================
//   // ПЕРЕКЛАД НАЗВ СТРАВ
//   // ==========================================
//   const getDishName = dish => {
//     if (typeof dish === 'object' && dish !== null) {
//       return dish[currentLanguage] || dish.uk || dish.en;
//     }

//     const translations = {
//       'Флет-вайт': { uk: 'Флет-вайт', en: 'Flat white' },
//       Капучино: { uk: 'Капучино', en: 'Cappuccino' },
//       Американо: { uk: 'Американо', en: 'Americano' },
//       Латте: { uk: 'Латте', en: 'Latte' },
//       Мокка: { uk: 'Мокка', en: 'Mocha' },
//       Макіато: { uk: 'Макіато', en: 'Macchiato' },
//       Млинці: { uk: 'Млинці', en: 'Pancakes' },
//       Чізкейк: { uk: 'Чізкейк', en: 'Cheesecake' },
//       Круасан: { uk: 'Круасан', en: 'Croissant' },
//       Булочка: { uk: 'Булочка', en: 'Bun' },
//       Кекс: { uk: 'Кекс', en: 'Cupcake' },
//       Ватрушки: { uk: 'Ватрушки', en: 'Cheese buns' },
//     };

//     return translations[dish]?.[currentLanguage] || dish;
//   };

//   // ==========================================
//   // НАДІЙНИЙ ЕКСПОРТ В EXCEL З ДАТАМИ В ШАПЦІ
//   // ==========================================
//   const exportToExcel = () => {
//     if (history.length === 0 && dishStats.length === 0) {
//       alert(t('no_data_to_export'));
//       return;
//     }

//     const workbook = XLSX.utils.book_new();
//     const currentDateTime = new Date().toLocaleString(isUk ? 'uk-UA' : 'en-US');
//     const formattedSelectedDate = new Date(selectedDate).toLocaleDateString(
//       isUk ? 'uk-UA' : 'en-US'
//     );

//     // Спільна шапка інформації для обох аркушів файлу
//     const getHeaderInfo = sheetTitle => [
//       [sheetTitle],
//       [`${t('analytics_per_day')} ${formattedSelectedDate}`],
//       [`${t('excel.generated_at', 'Formed on date')}: ${currentDateTime}`],
//       [], // Порожній відступ
//     ];

//     // ------------------------------------------
//     // АРКУШ 1: ІСТОРІЯ ЧЕКІВ (Фільтрована під обрану дату)
//     // ------------------------------------------
//     const historyHeader = getHeaderInfo(t('excel.sheet-check-history'));
//     const historySheet = XLSX.utils.aoa_to_sheet(historyHeader);

//     const historyFilteredByDate = history.filter(order => {
//       const orderDate = new Date(order.updatedAt).toISOString().split('T')[0];
//       return orderDate === selectedDate;
//     });

//     const historyData = historyFilteredByDate.map(order => {
//       let paymentStatusText = t('debt');
//       if (order.isPaid) {
//         paymentStatusText =
//           order.paymentMethod === 'card'
//             ? `${t('paid')} (${t('excel.card_label', 'Термінал')})`
//             : `${t('paid')} (${t('excel.cash_label', 'Готівка')})`;
//       }

//       return {
//         [t('excel.date_of_issue')]: new Date(order.updatedAt).toLocaleString(
//           isUk ? 'uk-UA' : 'en-US'
//         ),
//         [t('excel.check_number')]:
//           order.orderNumber || order._id.slice(-4).toUpperCase(),
//         [t('excel.dishes')]: order.items
//           .map(
//             item => `${getDishName(item.name)} (${item.quantity} ${t('pcs')})`
//           )
//           .join(', '),
//         [t('excel.amount')]: `${order.totalPrice} ${t('currency')}`,
//         [t('excel.status')]: paymentStatusText,
//       };
//     });

//     XLSX.utils.sheet_add_json(historySheet, historyData, { origin: 4 });
//     historySheet['!cols'] = [
//       { wch: 22 },
//       { wch: 15 },
//       { wch: 45 },
//       { wch: 15 },
//       { wch: 25 },
//     ];
//     XLSX.utils.book_append_sheet(
//       workbook,
//       historySheet,
//       t('excel.sheet-check-history')
//     );

//     // ------------------------------------------
//     // АРКУШ 2: ПІДСУМОК ЗА ДЕНЬ (З касами)
//     // ------------------------------------------
//     const statsHeader = getHeaderInfo(t('excel.sheet_day_summary'));
//     const statsSheet = XLSX.utils.aoa_to_sheet(statsHeader);

//     const statsData = dishStats.map(item => ({
//       [t('excel.dish_name')]: getDishName(item._id),
//       [t('excel.sold_pcs')]: item.totalQuantity,
//       [t('excel.total_amount')]: `${item.totalPrice} ${t('currency')}`,
//     }));

//     const totalDayRevenueCalculated = dishStats.reduce(
//       (sum, item) => sum + item.totalPrice,
//       0
//     );

//     // Додаємо фінансовий звіт по касах вниз таблиці страв
//     statsData.push({
//       [t('excel.dish_name')]: '',
//       [t('excel.sold_pcs')]: '',
//       [t('excel.total_amount')]: '',
//     });
//     statsData.push({
//       [t('excel.dish_name')]: `💵 ${t('excel.cash_total', 'Всього готівкою')}:`,
//       [t('excel.sold_pcs')]: '',
//       [t('excel.total_amount')]: `${cashRevenue} ${t('currency')}`,
//     });
//     statsData.push({
//       [t('excel.dish_name')]:
//         `💳 ${t('excel.card_total', 'Всього терміналом')}:`,
//       [t('excel.sold_pcs')]: '',
//       [t('excel.total_amount')]: `${cardRevenue} ${t('currency')}`,
//     });
//     statsData.push({
//       [t('excel.dish_name')]: `🔥 ${t('excel.total_per_day')}`,
//       [t('excel.sold_pcs')]: '',
//       [t('excel.total_amount')]:
//         `${totalDayRevenueCalculated} ${t('currency')}`,
//     });

//     XLSX.utils.sheet_add_json(statsSheet, statsData, { origin: 4 });
//     statsSheet['!cols'] = [{ wch: 32 }, { wch: 15 }, { wch: 20 }];
//     XLSX.utils.book_append_sheet(
//       workbook,
//       statsSheet,
//       t('excel.sheet_day_summary')
//     );

//     // Зберігання звіту
//     XLSX.writeFile(workbook, `Coffee_Comfort_Report_${selectedDate}.xlsx`);
//   };

//   const totalDayRevenue = cashRevenue + cardRevenue;

//   if (loading && history.length === 0) {
//     return <Loader type="container" size={60} />;
//   }

//   const formattedSelectedDate = new Date(selectedDate).toLocaleDateString(
//     isUk ? 'uk-UA' : 'en-US'
//   );

//   return (
//     <div className={css['container']}>
//       <header className={css['header']}>
//         <h1>📊 {t('title')}</h1>

//         <div className={css['filter-wrapper']}>
//           <label htmlFor="history-date-picker">
//             {t('analytics_per_day')}
//             <input
//               id="history-date-picker"
//               type="date"
//               value={selectedDate}
//               onChange={e => setSelectedDate(e.target.value)}
//               className={css['date-input']}
//             />
//           </label>
//         </div>
//       </header>

//       {/* СТАТИСТИКА З РОЗДІЛЬНИМИ БАДЖАМИ ОПЛАТИ */}
//       <section className={css['stats-section']}>
//         <div className={css['stats-summary']}>
//           <h2>
//             {t('summary_by_dishes')} ({formattedSelectedDate})
//           </h2>

//           <div className={css['badges-container']}>
//             <div className={`${css['finance-badge']} ${css['cash-badge']}`}>
//               💵 {t('cash', 'Готівка')}:{' '}
//               <span>
//                 {cashRevenue} {t('currency')}
//               </span>
//             </div>
//             <div className={`${css['finance-badge']} ${css['card-badge']}`}>
//               💳 {t('card', 'Термінал')}:{' '}
//               <span>
//                 {cardRevenue} {t('currency')}
//               </span>
//             </div>
//             <div className={css['total-badge']}>
//               {t('total')}: {totalDayRevenue} {t('currency')}
//             </div>
//           </div>
//         </div>

//         <table className={css['stats-table']}>
//           <thead>
//             <tr>
//               <th>{t('th_dish')}</th>
//               <th>{t('th_sold_out')}</th>
//               <th>{t('th_amount')}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {dishStats.length > 0 ? (
//               dishStats.map((item, index) => (
//                 <tr key={index}>
//                   <td>{getDishName(item._id)}</td>
//                   <td>{item.totalQuantity}</td>
//                   <td>
//                     {item.totalPrice} {t('currency')}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={3}>{t('no_data')}</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </section>

//       {/* ІСТОРІЯ ЧЕКІВ */}
//       <section className={css['history-section']}>
//         <div className={css['flex-header']}>
//           <h2>📜 {t('latest_checks')}</h2>

//           <button
//             type="button"
//             onClick={exportToExcel}
//             className={css['export-btn']}
//           >
//             {t('btn_export')}
//           </button>
//         </div>

//         <table className={css['table']}>
//           <thead>
//             <tr>
//               <th>{t('th_date')}</th>
//               <th>№</th>
//               <th>{t('th_dishes')}</th>
//               <th>{t('th_amount')}</th>
//               <th>{t('th_payment')}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {history.slice(0, visibleChecksCount).map(order => (
//               <tr key={order._id}>
//                 <td>
//                   {new Date(order.updatedAt).toLocaleString(
//                     isUk ? 'uk-UA' : 'en-US'
//                   )}
//                 </td>
//                 <td>
//                   #{order.orderNumber || order._id.slice(-4).toUpperCase()}
//                 </td>
//                 <td>
//                   {order.items.map((item, index) => (
//                     <div key={index}>
//                       {getDishName(item.name)}
//                       {' — '}
//                       {item.quantity} {t('pcs')}.
//                     </div>
//                   ))}
//                 </td>
//                 <td>
//                   {order.totalPrice} {t('currency')}
//                 </td>
//                 <td>
//                   {order.isPaid ? (
//                     <span className={css.paid}>
//                       {order.paymentMethod === 'card'
//                         ? `💳 ${t('card', 'Термінал')}`
//                         : `💵 ${t('cash', 'Готівка')}`}
//                     </span>
//                   ) : (
//                     <span className={css.unpaid}>{t('debt')}</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* ПОКАЗАТИ БІЛЬШЕ */}
//         {history.length > visibleChecksCount && (
//           <div className={css['load-more-wrapper']}>
//             <button
//               type="button"
//               onClick={() => setVisibleChecksCount(prev => prev + 10)}
//               className={css['load-more-btn']}
//             >
//               {t('show_more')}
//             </button>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default OrderHistory;
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  fetchOrderHistoryRequest,
  fetchOrderStatsRequest,
} from '../../services/api';
import * as XLSX from 'xlsx';
import Loader from '../../components/Ui/Loader/Loader.jsx';
import css from './OrderHistory.module.css';

const OrderHistory = () => {
  const { t, i18n } = useTranslation('order_history');
  const currentLanguage = (i18n.language || 'uk').substring(0, 2);
  const isUk = currentLanguage === 'uk';

  const [history, setHistory] = useState([]);
  const [dishStats, setDishStats] = useState([]);
  const [cashRevenue, setCashRevenue] = useState(0);
  const [cardRevenue, setCardRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [visibleChecksCount, setVisibleChecksCount] = useState(10);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      try {
        const historyData = await fetchOrderHistoryRequest();
        const statsData = await fetchOrderStatsRequest(selectedDate);

        setHistory(historyData || []);

        if (
          statsData &&
          typeof statsData === 'object' &&
          'dishes' in statsData
        ) {
          setDishStats(statsData.dishes || []);
          setCashRevenue(statsData.cash || 0);
          setCardRevenue(statsData.card || 0);
        } else {
          setDishStats(Array.isArray(statsData) ? statsData : []);
          setCashRevenue(0);
          setCardRevenue(0);
        }

        setVisibleChecksCount(10);
      } catch (error) {
        console.error('❌ Data loading error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [selectedDate]);

  // Функція отримання локальної дати у форматі YYYY-MM-DD замість системного UTC .toISOString()
  const getOrderLocalDateString = dateInput => {
    const localDate = new Date(dateInput);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDishName = dish => {
    if (typeof dish === 'object' && dish !== null) {
      return dish[currentLanguage] || dish.uk || dish.en;
    }

    const translations = {
      'Флет-вайт': { uk: 'Флет-вайт', en: 'Flat white' },
      Капучино: { uk: 'Капучино', en: 'Cappuccino' },
      Американо: { uk: 'Американо', en: 'Americano' },
      Латте: { uk: 'Латте', en: 'Latte' },
      Мокка: { uk: 'Мокка', en: 'Mocha' },
      Макіато: { uk: 'Макіато', en: 'Macchiato' },
      Млинці: { uk: 'Млинці', en: 'Pancakes' },
      Чізкейк: { uk: 'Чізкейк', en: 'Cheesecake' },
      Круасан: { uk: 'Круасан', en: 'Croissant' },
      Булочка: { uk: 'Булочка', en: 'Bun' },
      Кекс: { uk: 'Кекс', en: 'Cupcake' },
      Ватрушки: { uk: 'Ватрушки', en: 'Cheese buns' },
    };

    return translations[dish]?.[currentLanguage] || dish;
  };

  const exportToExcel = () => {
    if (history.length === 0 && dishStats.length === 0) {
      alert(t('no_data_to_export'));
      return;
    }

    const workbook = XLSX.utils.book_new();
    const currentDateTime = new Date().toLocaleString(isUk ? 'uk-UA' : 'en-US');
    const formattedSelectedDate = new Date(selectedDate).toLocaleDateString(
      isUk ? 'uk-UA' : 'en-US'
    );

    const getHeaderInfo = sheetTitle => [
      [sheetTitle],
      [`${t('analytics_per_day')} ${formattedSelectedDate}`],
      [`${t('excel.generated_at', 'Formed on date')}: ${currentDateTime}`],
      [],
    ];

    // АРКУШ 1: ІСТОРІЯ ЧЕКІВ (Тепер фільтрується чітко за локальним часом)
    const historyHeader = getHeaderInfo(t('excel.sheet-check-history'));
    const historySheet = XLSX.utils.aoa_to_sheet(historyHeader);

    const historyFilteredByDate = history.filter(order => {
      return getOrderLocalDateString(order.updatedAt) === selectedDate;
    });

    const historyData = historyFilteredByDate.map(order => {
      let paymentStatusText = t('debt');
      if (order.isPaid) {
        paymentStatusText =
          order.paymentMethod === 'card'
            ? `${t('paid')} (${t('excel.card_label', 'Термінал')})`
            : `${t('paid')} (${t('excel.cash_label', 'Готівка')})`;
      }

      return {
        [t('excel.date_of_issue')]: new Date(order.updatedAt).toLocaleString(
          isUk ? 'uk-UA' : 'en-US'
        ),
        [t('excel.check_number')]:
          order.orderNumber || order._id.slice(-4).toUpperCase(),
        [t('excel.dishes')]: order.items
          .map(
            item => `${getDishName(item.name)} (${item.quantity} ${t('pcs')})`
          )
          .join(', '),
        [t('excel.amount')]: `${order.totalPrice} ${t('currency')}`,
        [t('excel.status')]: paymentStatusText,
      };
    });

    XLSX.utils.sheet_add_json(historySheet, historyData, { origin: 4 });
    historySheet['!cols'] = [
      { wch: 22 },
      { wch: 15 },
      { wch: 45 },
      { wch: 15 },
      { wch: 25 },
    ];
    XLSX.utils.book_append_sheet(
      workbook,
      historySheet,
      t('excel.sheet-check-history')
    );

    // АРКУШ 2: ПІДСУМОК ЗА ДЕНЬ
    const statsHeader = getHeaderInfo(t('excel.sheet_day_summary'));
    const statsSheet = XLSX.utils.aoa_to_sheet(statsHeader);

    const statsData = dishStats.map(item => ({
      [t('excel.dish_name')]: getDishName(item._id),
      [t('excel.sold_pcs')]: item.totalQuantity,
      [t('excel.total_amount')]: `${item.totalPrice} ${t('currency')}`,
    }));

    const totalDayRevenueCalculated = dishStats.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    statsData.push({
      [t('excel.dish_name')]: '',
      [t('excel.sold_pcs')]: '',
      [t('excel.total_amount')]: '',
    });
    statsData.push({
      [t('excel.dish_name')]: `💵 ${t('excel.cash_total', 'Всього готівкою')}:`,
      [t('excel.sold_pcs')]: '',
      [t('excel.total_amount')]: `${cashRevenue} ${t('currency')}`,
    });
    statsData.push({
      [t('excel.dish_name')]:
        `💳 ${t('excel.card_total', 'Всього терміналом')}:`,
      [t('excel.sold_pcs')]: '',
      [t('excel.total_amount')]: `${cardRevenue} ${t('currency')}`,
    });
    statsData.push({
      [t('excel.dish_name')]: `🔥 ${t('excel.total_per_day')}`,
      [t('excel.sold_pcs')]: '',
      [t('excel.total_amount')]:
        `${totalDayRevenueCalculated} ${t('currency')}`,
    });

    XLSX.utils.sheet_add_json(statsSheet, statsData, { origin: 4 });
    statsSheet['!cols'] = [{ wch: 32 }, { wch: 15 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(
      workbook,
      statsSheet,
      t('excel.sheet_day_summary')
    );

    XLSX.writeFile(workbook, `Coffee_Comfort_Report_${selectedDate}.xlsx`);
  };

  const totalDayRevenue = cashRevenue + cardRevenue;

  if (loading && history.length === 0) {
    return <Loader type="container" size={60} />;
  }

  const formattedSelectedDate = new Date(selectedDate).toLocaleDateString(
    isUk ? 'uk-UA' : 'en-US'
  );

  return (
    <div className={css['container']}>
      <header className={css['header']}>
        <h1>📊 {t('title')}</h1>
        <div className={css['filter-wrapper']}>
          <label htmlFor="history-date-picker">
            {t('analytics_per_day')}
            <input
              id="history-date-picker"
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className={css['date-input']}
            />
          </label>
        </div>
      </header>

      {/* СТАТИСТИКА */}
      <section className={css['stats-section']}>
        <div className={css['stats-summary']}>
          <h2>
            {t('summary_by_dishes')} ({formattedSelectedDate})
          </h2>
          <div className={css['badges-container']}>
            <div className={`${css['finance-badge']} ${css['cash-badge']}`}>
              💵 {t('cash', 'Готівка')}:{' '}
              <span>
                {cashRevenue} {t('currency')}
              </span>
            </div>
            <div className={`${css['finance-badge']} ${css['card-badge']}`}>
              💳 {t('card', 'Термінал')}:{' '}
              <span>
                {cardRevenue} {t('currency')}
              </span>
            </div>
            <div className={css['total-badge']}>
              {t('total')}: {totalDayRevenue} {t('currency')}
            </div>
          </div>
        </div>

        <table className={css['stats-table']}>
          <thead>
            <tr>
              <th>{t('th_dish')}</th>
              <th>{t('th_sold_out')}</th>
              <th>{t('th_amount')}</th>
            </tr>
          </thead>
          <tbody>
            {dishStats.length > 0 ? (
              dishStats.map((item, index) => (
                <tr key={index}>
                  <td>{getDishName(item._id)}</td>
                  <td>{item.totalQuantity}</td>
                  <td>
                    {item.totalPrice} {t('currency')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>{t('no_data')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* ІСТОРІЯ ЧЕКІВ (ВИПРАВЛЕНО: СИНХРОННА ЛОКАЛЬНА ФІЛЬТРАЦІЯ) */}
      <section className={css['history-section']}>
        <div className={css['flex-header']}>
          <h2>📜 {t('latest_checks')}</h2>
          <button
            type="button"
            onClick={exportToExcel}
            className={css['export-btn']}
          >
            {t('btn_export')}
          </button>
        </div>

        <table className={css['table']}>
          <thead>
            <tr>
              <th>{t('th_date')}</th>
              <th>№</th>
              <th>{t('th_dishes')}</th>
              <th>{t('th_amount')}</th>
              <th>{t('th_payment')}</th>
            </tr>
          </thead>
          <tbody>
            {history
              .filter(
                order =>
                  getOrderLocalDateString(order.updatedAt) === selectedDate
              )
              .slice(0, visibleChecksCount)
              .map(order => (
                <tr key={order._id}>
                  <td>
                    {new Date(order.updatedAt).toLocaleString(
                      isUk ? 'uk-UA' : 'en-US'
                    )}
                  </td>
                  <td>
                    #{order.orderNumber || order._id.slice(-4).toUpperCase()}
                  </td>
                  <td>
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {getDishName(item.name)} — {item.quantity} {t('pcs')}.
                      </div>
                    ))}
                  </td>
                  <td>
                    {order.totalPrice} {t('currency')}
                  </td>
                  <td>
                    {order.isPaid ? (
                      <span className={css.paid}>
                        {order.paymentMethod === 'card'
                          ? `💳 ${t('card', 'Термінал')}`
                          : `💵 ${t('cash', 'Готівка')}`}
                      </span>
                    ) : (
                      <span className={css.unpaid}>{t('debt')}</span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {history.filter(
          order => getOrderLocalDateString(order.updatedAt) === selectedDate
        ).length > visibleChecksCount && (
          <div className={css['load-more-wrapper']}>
            <button
              type="button"
              onClick={() => setVisibleChecksCount(prev => prev + 10)}
              className={css['load-more-btn']}
            >
              {t('show_more')}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default OrderHistory;
