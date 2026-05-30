import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../services/api.js';
import * as XLSX from 'xlsx';
import css from './Inventory.module.css';

const Inventory = () => {
  const { t, i18n } = useTranslation('inventory');
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const lang = (i18n.language || 'uk').substring(0, 2);
  const isUk = lang === 'uk';

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await api.get('/ingredients');
        setIngredients(res.data || []);
      } catch (err) {
        console.error('Error loading ingredients:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [lang, i18n.language]);

  const changeQuantity = async (id, currentQty, step) => {
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
      alert(t('update_error')); // Перевірено: є в локалях
    }
  };

  const exportToExcel = () => {
    if (ingredients.length === 0) {
      alert(t('no_data_to_export', 'No data to export'));
      return;
    }

    const workbook = XLSX.utils.book_new();
    const currentDateTime = new Date().toLocaleString(isUk ? 'uk-UA' : 'en-US');

    // 1. Створюємо інформаційну шапку звіту
    // ВИПРАВЛЕНО: Використовуємо ключ 'excel.generated_at'
    const headerData = [
      [t('title', 'Composition and residues')],
      [`${t('excel.generated_at', 'Formed on date')}: ${currentDateTime}`],
      [],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(headerData);

    // 2. Формуємо масив об'єктів для таблиці
    const excelData = ingredients.map(item => {
      const displayName = item.name?.[lang] || item.name?.uk || '—';
      const displayUnit = item.unit?.[lang] || item.unit?.uk || '';
      const isLow = item.quantity <= item.minLimit;

      return {
        [t('columns.product')]: displayName,
        [t('columns.balans')]:
          `${Number(item.quantity.toFixed(3))} ${displayUnit}`,
        [t('excel.min_limit', 'Minimum limit')]:
          `${item.minLimit} ${displayUnit}`,
        [t('excel.status', 'Status')]: isLow
          ? t('warning.restock')
          : t('excel.ok', 'Enough'),
      };
    });

    XLSX.utils.sheet_add_json(worksheet, excelData, { origin: 3 });

    worksheet['!cols'] = [{ wch: 32 }, { wch: 15 }, { wch: 20 }, { wch: 20 }];

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      t('excel.sheet_inventory', 'Remains')
    );

    const dateStr = new Date().toISOString().split('T')[0];
    XLSX.writeFile(workbook, `Coffee_Comfort_Inventory_${dateStr}.xlsx`);
  };

  if (isLoading) {
    return <div className={css['center-text']}>{t('loading')}</div>;
  }

  const displayDate = new Date().toLocaleDateString(isUk ? 'uk-UA' : 'en-US');

  return (
    <div className={css['container']}>
      <div className={css['header-wrapper']}>
        <div className={css['title-block']}>
          <h2>🥛 {t('title')}</h2>

          <div className={css['date-badge']}>
            {t('as_of_date', 'As of')}: {displayDate}
          </div>
        </div>

        <button
          type="button"
          onClick={exportToExcel}
          className={css['export-btn']}
        >
          💾 {t('btn_export', 'Export')}
        </button>
      </div>

      {/* ВИПРАВЛЕНО: заміна camelCase на підкреслення 'no_data' */}
      {ingredients.length === 0 ? (
        <div className={css['center-text']}>{t('no_data')}</div>
      ) : (
        <table className={css['inventory-table']}>
          <thead>
            <tr>
              <th>{t('columns.product')}</th>
              <th>{t('columns.balans')}</th>
              <th>{t('columns.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map(item => {
              const isLow = item.quantity <= item.minLimit;
              const displayName = item.name?.[lang] || item.name?.uk || '—';
              const displayUnit = item.unit?.[lang] || item.unit?.uk || '';

              return (
                <tr key={item._id} className={isLow ? css['low-stock'] : ''}>
                  <td
                    data-label={t('columns.product')}
                    className={css['product-name']}
                  >
                    {displayName}
                  </td>
                  <td data-label={t('columns.balans')}>
                    <span className={css['amount']}>
                      {Number(item.quantity.toFixed(3))} {displayUnit}
                    </span>
                    {isLow && (
                      <div className={css['warning']}>
                        {t('warning.restock')}
                      </div>
                    )}
                  </td>
                  <td
                    data-label={t('columns.actions')}
                    className={css['actions-cell']}
                  >
                    <button
                      type="button"
                      className={css['btn-plus']}
                      onClick={() => changeQuantity(item._id, item.quantity, 1)}
                    >
                      + 1
                    </button>
                    <button
                      type="button"
                      className={css['btn-minus']}
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

export default Inventory;
