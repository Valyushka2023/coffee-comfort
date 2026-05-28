import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../services/api.js';
import css from './Inventory.module.css';

const Inventory = () => {
  const { t, i18n } = useTranslation('inventory');
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Визначаємо дві літери мови (uk чи en)
  const lang = (i18n.language || 'uk').substring(0, 2);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await api.get('/ingredients');

        // 🚨 ЛОГ №1: Перевіряємо що саме прилетіло з сервера у res.data
        console.log('=== ЛОГ 1: ДАНІ З БЕКЕНДУ ===');
        console.log('Поточна мова з i18n:', i18n.language);
        console.log('Обрізана мова (lang):', lang);
        console.log('Масив даних (res.data):', res.data);
        if (res.data && res.data.length > 0) {
          console.log(
            "Перший сирий об'єкт з бази повністю:",
            JSON.stringify(res.data[0], null, 2)
          );
        }
        console.log('=================================');

        setIngredients(res.data || []);
      } catch (err) {
        console.error('Помилка завантаження інгредієнтів:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [lang, i18n.language]); // Додали залежності, щоб логи оновлювалися при зміні мови

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
      console.error('Не вдалося оновити кількість:', err);
      alert(t('updateError'));
    }
  };

  if (isLoading) {
    return <div className={css.centerText}>{t('loading')}</div>;
  }

  return (
    <div className={css.container}>
      <h2>🥛 {t('title')}</h2>

      {ingredients.length === 0 ? (
        <div className={css.centerText}>{t('noData')}</div>
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
            {ingredients.map((item, index) => {
              const isLow = item.quantity <= item.minLimit;

              // Безпечно беремо мову
              const displayName = item.name?.[lang] || item.name?.uk || '—';
              const displayUnit = item.unit?.[lang] || item.unit?.uk || '';

              // 🚨 ЛОГ №2: Логуємо кожен рядок індивідуально, щоб побачити чому виходить прочерк
              if (index === 0) {
                console.log(`=== ЛОГ 2: АНАЛІЗ РЯДКА №${index + 1} ===`);
                console.log("Весь об'єкт item:", item);
                console.log(
                  'Шукаємо поле name для мови:',
                  lang,
                  '->',
                  item.name?.[lang]
                );
                console.log('Фолбек на uk:', item.name?.uk);
                console.log('Фінальне значення displayName:', displayName);
                console.log('=========================================');
              }

              return (
                <tr key={item._id} className={isLow ? css['low-stock'] : ''}>
                  <td className={css.productName}>{displayName}</td>
                  <td>
                    <span className={css.amount}>
                      {Number(item.quantity.toFixed(3))} {displayUnit}
                    </span>
                    {isLow && (
                      <div className={css.warning}>{t('warning.restock')}</div>
                    )}
                  </td>
                  <td className={css.actionsCell}>
                    <button
                      type="button"
                      className={css.btnPlus}
                      onClick={() => changeQuantity(item._id, item.quantity, 1)}
                    >
                      + 1
                    </button>
                    <button
                      type="button"
                      className={css.btnMinus}
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
