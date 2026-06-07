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
    return dish;
  };

  const exportToExcel = () => {
    if (history.length === 0 && dishStats.length === 0) {
      alert(t('no_data_to_export', 'No data to export!'));
      return;
    }

    const workbook = XLSX.utils.book_new();
    const currentDateTime = new Date().toLocaleString(isUk ? 'uk-UA' : 'en-US');
    const formattedSelectedDate = new Date(selectedDate).toLocaleDateString(
      isUk ? 'uk-UA' : 'en-US'
    );

    const getHeaderInfo = sheetTitle => [
      [sheetTitle],
      [
        `${t('analytics_per_day', 'Analytics for the day:')} ${formattedSelectedDate}`,
      ],
      [`${t('excel.generated_at', 'Generated at')}: ${currentDateTime}`],
      [],
    ];

    // АРКУШ 1: ІСТОРІЯ ЧЕКІВ
    const historyHeader = getHeaderInfo(
      t('excel.sheet-check-history', 'Receipt History')
    );
    const historySheet = XLSX.utils.aoa_to_sheet(historyHeader);

    const historyFilteredByDate = history.filter(order => {
      return getOrderLocalDateString(order.updatedAt) === selectedDate;
    });

    const historyData = historyFilteredByDate.map(order => {
      let paymentStatusText = t('debt', 'Debt');
      if (order.isPaid) {
        paymentStatusText =
          order.paymentMethod === 'card'
            ? `${t('paid', 'Paid')} (${t('excel.card_label', 'Terminal')})`
            : `${t('paid', 'Paid')} (${t('excel.cash_label', 'Cash')})`;
      }

      return {
        [t('excel.date_of_issue', 'Date of Issue')]: new Date(
          order.updatedAt
        ).toLocaleString(isUk ? 'uk-UA' : 'en-US'),
        [t('excel.check_number', 'Receipt No.')]:
          order.orderNumber || order._id.slice(-4).toUpperCase(),
        [t('excel.dishes', 'Dishes')]: order.items
          .map(
            item =>
              `${getDishName(item.name)} (${item.quantity} ${t('pcs', 'pcs')})`
          )
          .join(', '),
        [t('excel.amount', 'Amount')]:
          `${order.totalPrice} ${t('currency', 'UAH')}`,
        [t('excel.status', 'Status')]: paymentStatusText,
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
      t('excel.sheet-check-history', 'Receipt History')
    );

    // АРКУШ 2: ПІДСУМОК ЗА ДЕНЬ
    const statsHeader = getHeaderInfo(
      t('excel.sheet_day_summary', 'Daily Summary')
    );
    const statsSheet = XLSX.utils.aoa_to_sheet(statsHeader);

    const statsData = dishStats.map(item => ({
      [t('excel.dish_name', 'Dish Name')]: getDishName(item._id),
      [t('excel.sold_pcs', 'Sold (pcs)')]: item.totalQuantity,
      [t('excel.total_amount', 'Total Amount')]:
        `${item.totalPrice} ${t('currency', 'UAH')}`,
    }));

    const totalDayRevenueCalculated = dishStats.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    statsData.push({
      [t('excel.dish_name', 'Dish Name')]: '',
      [t('excel.sold_pcs', 'Sold (pcs)')]: '',
      [t('excel.total_amount', 'Total Amount')]: '',
    });
    statsData.push({
      [t('excel.dish_name', 'Dish Name')]:
        `💵 ${t('excel.cash_total', 'Total cash')}:`,
      [t('excel.sold_pcs', 'Sold (pcs)')]: '',
      [t('excel.total_amount', 'Total Amount')]:
        `${cashRevenue} ${t('currency', 'UAH')}`,
    });
    statsData.push({
      [t('excel.dish_name', 'Dish Name')]:
        `💳 ${t('excel.card_total', 'Total terminal')}:`,
      [t('excel.sold_pcs', 'Sold (pcs)')]: '',
      [t('excel.total_amount', 'Total Amount')]:
        `${cardRevenue} ${t('currency', 'UAH')}`,
    });
    statsData.push({
      [t('excel.dish_name', 'Dish Name')]:
        `🔥 ${t('excel.total_per_day', 'Total per day')}`,
      [t('excel.sold_pcs', 'Sold (pcs)')]: '',
      [t('excel.total_amount', 'Total Amount')]:
        `${totalDayRevenueCalculated} ${t('currency', 'UAH')}`,
    });

    XLSX.utils.sheet_add_json(statsSheet, statsData, { origin: 4 });
    statsSheet['!cols'] = [{ wch: 32 }, { wch: 15 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(
      workbook,
      statsSheet,
      t('excel.sheet_day_summary', 'Daily Summary')
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
        <h1>📊 {t('title', 'Order History')}</h1>
        <div className={css['filter-wrapper']}>
          <label htmlFor="history-date-picker">
            {t('analytics_per_day', 'Analytics for the day:')}
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
            {t('summary_by_dishes', 'Summary by dishes')} (
            {formattedSelectedDate})
          </h2>
          <div className={css['badges-container']}>
            <div className={`${css['finance-badge']} ${css['cash-badge']}`}>
              💵 {t('cash', 'Cash')}:{' '}
              <span>
                {cashRevenue} {t('currency', 'UAH')}
              </span>
            </div>
            <div className={`${css['finance-badge']} ${css['card-badge']}`}>
              💳 {t('card', 'Terminal')}:{' '}
              <span>
                {cardRevenue} {t('currency', 'UAH')}
              </span>
            </div>
            <div className={css['total-badge']}>
              {t('total', 'TOTAL')}: {totalDayRevenue} {t('currency', 'UAH')}
            </div>
          </div>
        </div>

        <table className={css['stats-table']}>
          <thead>
            <tr>
              <th>{t('th_dish', 'Dish')}</th>
              <th>{t('th_sold_out', 'Sold')}</th>
              <th>{t('th_amount', 'Amount')}</th>
            </tr>
          </thead>
          <tbody>
            {dishStats.length > 0 ? (
              dishStats.map((item, index) => (
                <tr key={index}>
                  <td>{getDishName(item._id)}</td>
                  <td>{item.totalQuantity}</td>
                  <td>
                    {item.totalPrice} {t('currency', 'UAH')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>{t('no_data', 'No data for this day')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* ІСТОРІЯ ЧЕКІВ */}
      <section className={css['history-section']}>
        <div className={css['flex-header']}>
          <h2>📜 {t('latest_checks', 'Latest checks')}</h2>
          <button
            type="button"
            onClick={exportToExcel}
            className={css['export-btn']}
          >
            {t('btn_export', 'Export to Excel')}
          </button>
        </div>

        <table className={css['table']}>
          <thead>
            <tr>
              <th>{t('th_date', 'Date')}</th>
              <th>№</th>
              <th>{t('th_dishes', 'Dishes')}</th>
              <th>{t('th_amount', 'Amount')}</th>
              <th>{t('th_payment', 'Payment')}</th>
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
                        {getDishName(item.name)} — {item.quantity}{' '}
                        {t('pcs', 'pcs')}.
                      </div>
                    ))}
                  </td>
                  <td>
                    {order.totalPrice} {t('currency', 'UAH')}
                  </td>
                  <td>
                    {order.isPaid ? (
                      <span className={css.paid}>
                        {order.paymentMethod === 'card'
                          ? `💳 ${t('card', 'Terminal')}`
                          : `💵 ${t('cash', 'Cash')}`}
                      </span>
                    ) : (
                      <span className={css.unpaid}>{t('debt', 'Debt')}</span>
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
              {t('show_more', 'Show more')}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default OrderHistory;
