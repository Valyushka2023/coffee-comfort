import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import css from './Menu.module.css';

const Menu = () => {
  const { t } = useTranslation('menu');
  const [activeCategory, setActiveCategory] = useState('all');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        // Звертаємося до нашого нового маршруту
        const response = await axios.get('http://localhost:5001/api/menu');
        setMenuItems(response.data);
      } catch (err) {
        console.error('Помилка завантаження меню:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // Логіка категорій
  const categoriesInDb = [
    ...new Set(menuItems.map(item => item.categoryKey).filter(Boolean)),
  ];
  const categories = ['all', ...categoriesInDb];

  const groupedMenu = categoriesInDb.map(catKey => ({
    categoryKey: catKey,
    items: menuItems.filter(item => item.categoryKey === catKey),
  }));

  const filteredMenu =
    activeCategory === 'all'
      ? groupedMenu
      : groupedMenu.filter(section => section.categoryKey === activeCategory);

  if (loading) return <div className={css.loading}>Loading...</div>;

  return (
    <section className={css['menu-section']}>
      {/* {' '} */}
      {/* Декоративні зерна */}
      <div className={`${css['bean']} ${css['coffee-bean1']}`}></div>
      <div className={`${css['bean']} ${css['coffee-bean2']}`}></div>
      <div className={`${css['bean']} ${css['coffee-bean3']}`}></div>
      <div className={`${css['bean']} ${css['coffee-bean4']}`}></div>
      <div className={`${css['bean']} ${css['coffee-bean5']}`}></div>
      <div className={css['menu-container']}>
        <header className={css['menu-header']}>
          <h2 className={css['menu-title']}>{t('menu_title')}</h2>
        </header>

        <nav className={css['menu-filter']}>
          {categories.map(catKey => (
            <button
              key={catKey}
              onClick={() => setActiveCategory(catKey)}
              className={`${css['filter-btn']} ${activeCategory === catKey ? css.active : ''}`}
            >
              {t(`categories.${catKey}`)}
            </button>
          ))}
        </nav>

        <div className={css['menu-grid-container']}>
          {filteredMenu.length > 0 ? (
            filteredMenu.map(section => (
              <div
                key={section.categoryKey}
                className={css['menu-category-block']}
              >
                <h3 className={css['category-title']}>
                  <span>{t(`categories.${section.categoryKey}`)}</span>
                </h3>

                <div className={css['items-grid']}>
                  {section.items.map(item => (
                    <div key={item._id} className={css['menu-item']}>
                      <div className={css['item-photo-wrapper']}>
                        <img
                          src={item.img}
                          alt={item.key}
                          className={css['item-photo']}
                        />
                      </div>
                      <div className={css['item-content']}>
                        <div className={css['item-header-row']}>
                          <h4 className={css['item-name']}>
                            {t(`items.${item.key}.name`)}
                          </h4>
                          <span className={css['item-price']}>
                            {item.price} ₴
                          </span>
                        </div>
                        <p className={css['item-description']}>
                          {t(`items.${item.key}.desc`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className={css['no-data']}>
              Меню порожнє. Перевірте базу даних Compass!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Menu;
