import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../services/api.js';
import * as XLSX from 'xlsx';
import Loader from '../../components/Ui/Loader/Loader.jsx';
import css from './InventoryPage.module.css';

const InventoryPage = () => {
  // Примусово фіксуємо українську мову для інвентаризації
  const { t } = useTranslation('inventory', { lng: 'uk' });
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const isToday = selectedDate === new Date().toISOString().split('T')[0];

  const capitalizeFirstLetter = text => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`/ingredients?date=${selectedDate}`);
        setIngredients(res.data || []);
      } catch (err) {
        console.error('Error loading ingredients:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [selectedDate]);

  const changeQuantity = async (id, currentQty, step) => {
    if (!isToday) return;

    const targetQty = currentQty + step;
    if (targetQty < 0) return;

    try {
      const res = await api.patch(`/ingredients/${id}`, {
        quantity: targetQty,
      });
      setIngredients(prev =>
        prev.map(item =>
          item._id === id ? { ...item, quantity: res.data.quantity } : item
        )
      );
    } catch (err) {
      console.error('Failed to update quantity:', err);
      alert(t('update_error', 'Failed to update stock. Please try again.'));
    }
  };

  // Фільтрація інгредієнтів — за українською назвою (.uk)
  const filteredIngredients = ingredients.filter(item => {
    const displayName = (item.name?.uk || '').toLowerCase();
    return displayName.includes(searchQuery.toLowerCase());
  });

  const exportToExcel = () => {
    if (filteredIngredients.length === 0) {
      alert(t('no_data_to_export', 'No data to export'));
      return;
    }

    const workbook = XLSX.utils.book_new();
    const currentDateTime = new Date().toLocaleString('uk-UA');
    const formattedSelectedDate = new Date(selectedDate).toLocaleDateString(
      'uk-UA'
    );

    const headerData = [
      [t('title', 'Stock & Inventory')],
      [`${t('as_of_date', 'As of')}: ${formattedSelectedDate}`],
      [`${t('excel.generated_at', 'Generated at')}: ${currentDateTime}`],
      [],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(headerData);

    const excelData = filteredIngredients.map(item => {
      const displayName = item.name?.uk || '—';
      const displayUnit = item.unit?.uk || '';
      const isLow = item.quantity <= item.minLimit;

      return {
        [t('columns.product', 'Product')]: displayName,
        [t('columns.balans', 'Balance')]:
          `${Number(item.quantity.toFixed(3))} ${displayUnit}`,
        [t('excel.min_limit', 'Minimum limit')]:
          `${item.minLimit} ${displayUnit}`,
        [t('excel.status', 'Status')]: isLow
          ? t('warning.restock', 'Order!')
          : t('excel.ok', 'Enough'),
      };
    });

    XLSX.utils.sheet_add_json(worksheet, excelData, { origin: 4 });
    worksheet['!cols'] = [{ wch: 32 }, { wch: 15 }, { wch: 20 }, { wch: 20 }];

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      t('excel.sheet_inventory', 'Inventory')
    );

    XLSX.writeFile(workbook, `Coffee_Comfort_Inventory_${selectedDate}.xlsx`);
  };

  if (isLoading) {
    return <Loader type="container" size={60} />;
  }

  return (
    <div className={css['container']}>
      <div className={css['header-wrapper']}>
        <div className={css['title-block']}>
          <h2>🥛 {t('title', 'Stock & Inventory')}</h2>
        </div>

        <div className={css['filters-panel']}>
          <div className={css['search-wrapper']}>
            <input
              type="text"
              placeholder={t('search_placeholder', 'Search ingredient...')}
              value={searchQuery}
              onChange={e =>
                setSearchQuery(capitalizeFirstLetter(e.target.value))
              }
              className={css['search-input']}
            />
            {searchQuery && (
              <button
                type="button"
                className={css['clear-search-btn']}
                onClick={() => setSearchQuery('')}
                title={t('clear_search', 'Clear search')}
              >
                ✕
              </button>
            )}
          </div>

          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className={css['date-input']}
          />

          <button
            type="button"
            onClick={exportToExcel}
            className={css['export-btn']}
          >
            {t('btn_export', 'Export to Excel')}
          </button>
        </div>
      </div>

      {filteredIngredients.length === 0 ? (
        <div className={css['center-text']}>
          {t('no_data', 'The inventory is currently empty.')}
        </div>
      ) : (
        <table className={css['inventory-table']}>
          <thead>
            <tr>
              <th>{t('columns.product', 'Product')}</th>
              <th>{t('columns.balans', 'Balance')}</th>
              <th>{t('columns.actions', 'Actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredIngredients.map(item => {
              const isLow = item.quantity <= item.minLimit;
              const displayName = item.name?.uk || '—';
              const displayUnit = item.unit?.uk || '';

              return (
                <tr key={item._id} className={isLow ? css['low-stock'] : ''}>
                  <td
                    data-label={t('columns.product', 'Product')}
                    className={css['product-name']}
                  >
                    {displayName}
                  </td>
                  <td data-label={t('columns.balans', 'Balance')}>
                    <span className={css['amount']}>
                      {Number(item.quantity.toFixed(3))} {displayUnit}
                    </span>
                    {isLow && (
                      <div className={css['warning']}>
                        {t('warning.restock', 'Order!')}
                      </div>
                    )}
                  </td>
                  <td
                    data-label={t('columns.actions', 'Actions')}
                    className={css['actions-cell']}
                  >
                    <button
                      type="button"
                      className={css['btn-plus']}
                      disabled={!isToday}
                      onClick={() => changeQuantity(item._id, item.quantity, 1)}
                    >
                      + 1
                    </button>
                    <button
                      type="button"
                      className={css['btn-minus']}
                      disabled={!isToday}
                      onClick={() =>
                        changeQuantity(item._id, item.quantity, -1)
                      }
                    >
                      - 1
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryPage;
