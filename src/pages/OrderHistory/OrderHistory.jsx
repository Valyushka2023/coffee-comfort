import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  fetchOrderHistoryRequest,
  fetchOrderStatsRequest,
} from '../../services/api';
import * as XLSX from 'xlsx';
import css from './OrderHistory.module.css';

const OrderHistory = () => {
  const { t, i18n } = useTranslation('order_history');

  const currentLanguage = (i18n.language || 'uk').substring(0, 2);

  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState([]);
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

        // console.log('📊 STATS DATA:', statsData);

        setHistory(historyData || []);
        setStats(statsData || []);
        setVisibleChecksCount(10);
      } catch (error) {
        console.error('❌ Data loading error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [selectedDate]);

  // ==========================================
  // ПЕРЕКЛАД НАЗВ СТРАВ
  // ==========================================
  const getDishName = dish => {
    // Якщо прийшов об'єкт перекладів
    if (typeof dish === 'object' && dish !== null) {
      return dish[currentLanguage] || dish.uk || dish.en;
    }

    // Fallback для старих записів у БД
    const translations = {
      'Флет-вайт': {
        uk: 'Флет-вайт',
        en: 'Flat white',
      },

      Капучино: {
        uk: 'Капучино',
        en: 'Cappuccino',
      },

      Американо: {
        uk: 'Американо',
        en: 'Americano',
      },

      Латте: {
        uk: 'Латте',
        en: 'Latte',
      },

      Мокка: {
        uk: 'Мокка',
        en: 'Mocha',
      },

      Макіато: {
        uk: 'Макіато',
        en: 'Macchiato',
      },

      Млинці: {
        uk: 'Млинці',
        en: 'Pancakes',
      },

      Чізкейк: {
        uk: 'Чізкейк',
        en: 'Cheesecake',
      },

      Круасан: {
        uk: 'Круасан',
        en: 'Croissant',
      },

      Булочка: {
        uk: 'Булочка',
        en: 'Bun',
      },

      Кекс: {
        uk: 'Кекс',
        en: 'Cupcake',
      },

      Ватрушки: {
        uk: 'Ватрушки',
        en: 'Cheese buns',
      },
    };

    return translations[dish]?.[currentLanguage] || dish;
  };

  // ==========================================
  // EXPORT EXCEL
  // ==========================================
  const exportToExcel = () => {
    if (history.length === 0 && stats.length === 0) {
      alert(t('noDataToExport'));
      return;
    }

    const workbook = XLSX.utils.book_new();

    // ==========================================
    // ІСТОРІЯ ЧЕКІВ
    // ==========================================
    const historyData = history.map(order => ({
      [t('excel.dateOfIssue')]: new Date(order.updatedAt).toLocaleString(
        currentLanguage === 'uk' ? 'uk-UA' : 'en-US'
      ),

      [t('excel.checkNumber')]:
        order.orderNumber || order._id.slice(-4).toUpperCase(),

      [t('excel.dishes')]: order.items
        .map(item => `${getDishName(item.name)} (${item.quantity} ${t('pcs')})`)
        .join(', '),

      [t('excel.amount')]: order.totalPrice,

      [t('excel.status')]: order.isPaid ? t('paid') : t('debt'),
    }));

    const historySheet = XLSX.utils.json_to_sheet(historyData);

    historySheet['!cols'] = [
      { wch: 20 },
      { wch: 15 },
      { wch: 40 },
      { wch: 15 },
      { wch: 15 },
    ];

    XLSX.utils.book_append_sheet(
      workbook,
      historySheet,
      t('excel.sheetCheckHistory')
    );

    // ==========================================
    // ПІДСУМОК ЗА ДЕНЬ
    // ==========================================
    const statsData = stats.map(item => ({
      [t('excel.dishName')]: getDishName(item._id),

      [t('excel.soldPcs')]: item.totalQuantity,

      [t('excel.totalAmount')]: item.totalPrice,
    }));

    const totalDayRevenueCalculated = stats.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    statsData.push({
      [t('excel.dishName')]: t('excel.totalPerDay'),

      [t('excel.soldPcs')]: '',

      [t('excel.totalAmount')]: totalDayRevenueCalculated,
    });

    const statsSheet = XLSX.utils.json_to_sheet(statsData);

    statsSheet['!cols'] = [{ wch: 30 }, { wch: 15 }, { wch: 20 }];

    XLSX.utils.book_append_sheet(
      workbook,
      statsSheet,
      t('excel.sheetDaySummary')
    );

    // ==========================================
    // ЗБЕРЕЖЕННЯ EXCEL
    // ==========================================
    XLSX.writeFile(workbook, `Coffee_Comfort_Report_${selectedDate}.xlsx`);
  };

  const totalDayRevenue = stats.reduce((sum, item) => sum + item.totalPrice, 0);

  if (loading && history.length === 0) {
    return <div className={css.loader}>{t('loading')}</div>;
  }

  return (
    <div className={css['container']}>
      <header className={css.header}>
        <h1>📊 {t('title')}</h1>

        <div className={css['filter-wrapper']}>
          <label htmlFor="history-date-picker">
            {t('analyticsPerDay')}

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
            {t('summaryByDishes')} (
            {new Date(selectedDate).toLocaleDateString(
              currentLanguage === 'uk' ? 'uk-UA' : 'en-US'
            )}
            )
          </h2>

          <div className={css['total-badge']}>
            {t('total')}: {totalDayRevenue} {t('currency')}
          </div>
        </div>

        <table className={css['stats-table']}>
          <thead>
            <tr>
              <th>{t('thDish')}</th>
              <th>{t('thSoldOut')}</th>
              <th>{t('thAmount')}</th>
            </tr>
          </thead>

          <tbody>
            {stats.length > 0 ? (
              stats.map((item, index) => (
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
                <td colSpan={3}>{t('noData')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* ІСТОРІЯ ЧЕКІВ */}
      <section className={css['history-section']}>
        <div className={css['flex-header']}>
          <h2>📜 {t('latestChecks')}</h2>

          <button
            type="button"
            onClick={exportToExcel}
            className={css['export-btn']}
          >
            💾 {t('btnExport')}
          </button>
        </div>

        <table className={css.table}>
          <thead>
            <tr>
              <th>{t('thDate')}</th>
              <th>№</th>
              <th>{t('thDishes')}</th>
              <th>{t('thAmount')}</th>
              <th>{t('thPayment')}</th>
            </tr>
          </thead>

          <tbody>
            {history.slice(0, visibleChecksCount).map(order => (
              <tr key={order._id}>
                <td>
                  {new Date(order.updatedAt).toLocaleString(
                    currentLanguage === 'uk' ? 'uk-UA' : 'en-US'
                  )}
                </td>

                <td>
                  #{order.orderNumber || order._id.slice(-4).toUpperCase()}
                </td>

                <td>
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {getDishName(item.name)}
                      {' — '}
                      {item.quantity} {t('pcs')}.
                    </div>
                  ))}
                </td>

                <td>
                  {order.totalPrice} {t('currency')}
                </td>

                <td className={order.isPaid ? css.paid : css.unpaid}>
                  {order.isPaid ? t('paid') : t('debt')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ПОКАЗАТИ БІЛЬШЕ */}
        {history.length > visibleChecksCount && (
          <div className={css['load-more-wrapper']}>
            <button
              type="button"
              onClick={() => setVisibleChecksCount(prev => prev + 10)}
              className={css['load-more-btn']}
            >
              🔄 {t('showMore', 'Показати більше')}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default OrderHistory;
