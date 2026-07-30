import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  fetchOrderHistoryRequest,
  fetchOrderStatsRequest,
} from '../../services/api';
import * as XLSX from 'xlsx';
import Loader from '../../components/Ui/Loader/Loader.jsx';
import css from './OrderHistoryPage.module.css';

const OrderHistoryPage = () => {
  const { t, i18n } = useTranslation('order_history', { lng: 'uk' });
  const currentLanguage = i18n.language || 'uk';

  const [history, setHistory] = useState([]);
  const [dishStats, setDishStats] = useState([]);
  const [cashRevenue, setCashRevenue] = useState(0);
  const [cardRevenue, setCardRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [visibleChecksCount, setVisibleChecksCount] = useState(10);

  const [startDate, setStartDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      try {
        const historyData = await fetchOrderHistoryRequest(startDate, endDate);
        const statsData = await fetchOrderStatsRequest(startDate, endDate);

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
        console.error('❌ Помилка завантаження даних:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [startDate, endDate]);

  const getOrderLocalDateString = dateInput => {
    const localDate = new Date(dateInput);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDishName = dish => {
    if (typeof dish === 'object' && dish !== null) {
      return dish.uk || dish.en || '';
    }
    return dish;
  };

  const isOrderInSelectedRange = orderDateStr => {
    return orderDateStr >= startDate && orderDateStr <= endDate;
  };

  const exportToExcel = () => {
    if (history.length === 0 && dishStats.length === 0) {
      alert(t('no_data_to_export', 'Немає даних для експорту!'));
      return;
    }

    const workbook = XLSX.utils.book_new();
    const localeStr = currentLanguage === 'uk' ? 'uk-UA' : 'en-US';
    const currentDateTime = new Date().toLocaleString(localeStr);

    const formattedStartDate = new Date(startDate).toLocaleDateString(
      localeStr
    );
    const formattedEndDate = new Date(endDate).toLocaleDateString(localeStr);

    const periodString =
      startDate === endDate
        ? formattedStartDate
        : `${formattedStartDate} — ${formattedEndDate}`;

    // ВИПРАВЛЕНО: Використовуємо ключ 'analytics_period' з доданим українським фолбеком 'Період:'
    const getHeaderInfo = sheetTitle => [
      [sheetTitle],
      [`${t('analytics_period', 'Період:')} ${periodString}`],
      [`${t('excel.generated_at', 'Сформовано на дату')}: ${currentDateTime}`],
      [],
    ];

    // --- АРКУШ 1: ІСТОРІЯ ЧЕКІВ ---
    const historySheetTitle = t('excel.sheet-check-history', 'Історія чеків');
    const historyHeader = getHeaderInfo(historySheetTitle);
    const historySheet = XLSX.utils.aoa_to_sheet(historyHeader);

    const historyFilteredByDate = history.filter(order => {
      return isOrderInSelectedRange(getOrderLocalDateString(order.updatedAt));
    });

    const historyData = historyFilteredByDate.map(order => {
      let paymentStatusText = t('debt', 'Борг');
      if (order.isPaid) {
        paymentStatusText =
          order.paymentMethod === 'card'
            ? `${t('paid', 'Оплачено')} (${t('excel.card_label', 'Термінал')})`
            : `${t('paid', 'Оплачено')} (${t('excel.cash_label', 'Готівка')})`;
      }

      return {
        [t('excel.date_of_issue', 'Дата видачі')]: new Date(
          order.updatedAt
        ).toLocaleString(localeStr),
        [t('excel.check_number', '№ чека')]:
          order.orderNumber || order._id.slice(-4).toUpperCase(),
        [t('excel.dishes', 'Страви')]: order.items
          .map(
            item =>
              `${getDishName(item.name)} (${item.quantity} ${t('pcs', 'шт')})`
          )
          .join(', '),
        [t('excel.amount', 'Сума')]:
          `${order.totalPrice} ${t('currency', 'грн')}`,
        [t('excel.status', 'Статус')]: paymentStatusText,
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
    XLSX.utils.book_append_sheet(workbook, historySheet, historySheetTitle);

    // --- АРКУШ 2: ПІДСУМОК ЗА ПЕРІОД ---
    // ВИПРАВЛЕНО: Замінено 'excel.sheet_day_summary' на 'excel.sheet_period_summary'
    const statsSheetTitle = t(
      'excel.sheet_period_summary',
      'Підсумок за період'
    );
    const statsHeader = getHeaderInfo(statsSheetTitle);
    const statsSheet = XLSX.utils.aoa_to_sheet(statsHeader);

    const statsData = dishStats.map(item => ({
      [t('excel.dish_name', 'Назва страви')]: getDishName(item._id),
      [t('excel.sold_pcs', 'Продано (шт)')]: item.totalQuantity,
      [t('excel.total_amount', 'Загальна сума')]:
        `${item.totalPrice} ${t('currency', 'грн')}`,
    }));

    const totalDayRevenueCalculated = dishStats.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    statsData.push({
      [t('excel.dish_name', 'Назва страви')]: '',
      [t('excel.sold_pcs', 'Продано (шт)')]: '',
      [t('excel.total_amount', 'Загальна сума')]: '',
    });
    statsData.push({
      [t('excel.dish_name', 'Назва страви')]:
        `💵 ${t('excel.cash_total', 'Всього готівкою')}:`,
      [t('excel.sold_pcs', 'Продано (шт)')]: '',
      [t('excel.total_amount', 'Загальна сума')]:
        `${cashRevenue} ${t('currency', 'грн')}`,
    });
    statsData.push({
      [t('excel.dish_name', 'Назва страви')]:
        `💳 ${t('excel.card_total', 'Всього терміналом')}:`,
      [t('excel.sold_pcs', 'Продано (шт)')]: '',
      [t('excel.total_amount', 'Загальна сума')]:
        `${cardRevenue} ${t('currency', 'грн')}`,
    });

    statsData.push({
      [t('excel.dish_name', 'Назва страви')]:
        `🔥 ${t('excel.total_period_day', 'Разом за період')}:`,
      [t('excel.sold_pcs', 'Продано (шт)')]: '',
      [t('excel.total_amount', 'Загальна сума')]:
        `${totalDayRevenueCalculated} ${t('currency', 'грн')}`,
    });

    XLSX.utils.sheet_add_json(statsSheet, statsData, { origin: 4 });
    statsSheet['!cols'] = [{ wch: 32 }, { wch: 15 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(workbook, statsSheet, statsSheetTitle);

    const fileDateName =
      startDate === endDate ? startDate : `${startDate}_до_${endDate}`;
    XLSX.writeFile(workbook, `Звіт_Кав_ярні_${fileDateName}.xlsx`);
  };

  const totalDayRevenue = cashRevenue + cardRevenue;

  if (loading && history.length === 0) {
    return <Loader type="container" size={60} />;
  }

  const localeStr = currentLanguage === 'uk' ? 'uk-UA' : 'en-US';
  const formattedStartDate = new Date(startDate).toLocaleDateString(localeStr);
  const formattedEndDate = new Date(endDate).toLocaleDateString(localeStr);
  const renderPeriodTitle =
    startDate === endDate
      ? formattedStartDate
      : `${formattedStartDate} — ${formattedEndDate}`;

  return (
    <div className={css['container']}>
      <header className={css['header']}>
        <h1>📊 {t('title', 'Історія замовлень')}</h1>
        <div className={css['filter-wrapper']}>
          <div className={css['date-picker-group']}>
            <label htmlFor="start-date-picker">З:</label>
            <input
              id="start-date-picker"
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className={css['date-input']}
            />
          </div>
          <div className={css['date-picker-group']}>
            <label htmlFor="end-date-picker">По:</label>
            <input
              id="end-date-picker"
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              min={startDate}
              className={css['date-input']}
            />
          </div>
        </div>
      </header>

      {/* СТАТИСТИКА */}
      <section className={css['stats-section']}>
        <div className={css['stats-summary']}>
          <h2>
            {t('summary_by_dishes', 'Підсумок за стравами')} (
            {renderPeriodTitle})
          </h2>
          <div className={css['badges-container']}>
            <div className={`${css['finance-badge']} ${css['cash-badge']}`}>
              {t('cash', 'Готівка')}:{' '}
              <span>
                {cashRevenue} {t('currency', 'грн')}
              </span>
            </div>
            <div className={`${css['finance-badge']} ${css['card-badge']}`}>
              {t('card', 'Термінал')}:{' '}
              <span>
                {cardRevenue} {t('currency', 'грн')}
              </span>
            </div>
            <div className={css['total-badge']}>
              <span className={css['badge-label']}>
                {t('total', 'ВСЬОГО')}:
              </span>
              <span className={css['badge-amount']}>
                {totalDayRevenue} {t('currency', 'грн')}
              </span>
            </div>
          </div>
        </div>

        <table className={css['stats-table']}>
          <thead>
            <tr>
              <th>{t('th_dish', 'Страва')}</th>
              <th>{t('th_sold_out', 'Продано')}</th>
              <th>{t('th_amount', 'Сума')}</th>
            </tr>
          </thead>
          <tbody>
            {dishStats.length > 0 ? (
              dishStats.map((item, index) => (
                <tr key={index}>
                  <td>{getDishName(item._id)}</td>
                  <td>{item.totalQuantity}</td>
                  <td>
                    {item.totalPrice} {t('currency', 'грн')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>{t('no_data', 'Немає даних за цей період')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* ІСТОРІЯ ЧЕКІВ */}
      <section className={css['history-section']}>
        <div className={css['flex-header']}>
          <h2>📜 {t('latest_checks', 'Останні чеки')}</h2>
          <button
            type="button"
            onClick={exportToExcel}
            className={css['export-btn']}
          >
            {t('btn_export', 'Експорт в Ексель')}
          </button>
        </div>

        <table className={css['table']}>
          <thead>
            <tr>
              <th>{t('th_date', 'Дата')}</th>
              <th>№</th>
              <th>{t('th_dishes', 'Страви')}</th>
              <th>{t('th_amount', 'Сума')}</th>
              <th>{t('th_payment', 'Оплата')}</th>
            </tr>
          </thead>
          <tbody>
            {history
              .filter(order =>
                isOrderInSelectedRange(getOrderLocalDateString(order.updatedAt))
              )
              .slice(0, visibleChecksCount)
              .map(order => (
                <tr key={order._id}>
                  <td>{new Date(order.updatedAt).toLocaleString(localeStr)}</td>
                  <td>
                    #{order.orderNumber || order._id.slice(-4).toUpperCase()}
                  </td>
                  <td>
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {getDishName(item.name)} — {item.quantity}{' '}
                        {t('pcs', 'шт')}.
                      </div>
                    ))}
                  </td>
                  <td>
                    {order.totalPrice} {t('currency', 'грн')}
                  </td>
                  <td>
                    {order.isPaid ? (
                      <span className={css.paid}>
                        {order.paymentMethod === 'card'
                          ? `💳 ${t('card', 'Термінал')}`
                          : `💵 ${t('cash', 'Готівка')}`}
                      </span>
                    ) : (
                      <span className={css.unpaid}>{t('debt', 'Борг')}</span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {history.filter(order =>
          isOrderInSelectedRange(getOrderLocalDateString(order.updatedAt))
        ).length > visibleChecksCount && (
          <div className={css['load-more-wrapper']}>
            <button
              type="button"
              onClick={() => setVisibleChecksCount(prev => prev + 10)}
              className={css['load-more-btn']}
            >
              {t('show_more', 'Показати більше')}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default OrderHistoryPage;
