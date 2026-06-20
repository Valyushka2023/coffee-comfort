import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import CardMenu from '../Ui/Cards/CardMenu/CardMenu.jsx';
import MenuModal from '../Modal/MenuModal/MenuModal.jsx'; // Імпортуємо нову модалку
import css from './Menu.module.css';

const Menu = () => {
  const { t, i18n } = useTranslation('menu');
  const [activeCategory, setActiveCategory] = useState('all');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [visibleCounts, setVisibleCounts] = useState({});

  const formatPrice = price => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return i18n.language === 'uk'
      ? `${numericPrice} грн`
      : `${numericPrice} UAH`;
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const baseUrl =
          import.meta.env.VITE_API_URL || 'https://coffee-comfort.onrender.com';
        const response = await axios.get(`${baseUrl}/api/menu`);
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error loading menu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  useEffect(() => {
    const handleEscapeKey = event => {
      if (event.key === 'Escape') setSelectedItem(null);
    };
    if (selectedItem) window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [selectedItem]);

  useEffect(() => {
    if (selectedItem) {
      const menuSection = document.querySelector(`.${css['menu-section']}`);
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedItem]);

  const handleShowMore = categoryKey => {
    setVisibleCounts(prev => ({
      ...prev,
      [categoryKey]: (prev[categoryKey] || 4) + 4,
    }));
  };

  const handleCollapse = categoryKey => {
    setVisibleCounts(prev => ({ ...prev, [categoryKey]: 4 }));
  };

  // Логіка, що робити при натисканні кнопки "Обрати" в модалці
  const handleSelectItem = item => {
    console.log('Товар обрано:', item);
    // Тут ви можете додати товар до кошика або відкрити форму бронювання
    setSelectedItem(null);
  };

  const categories = useMemo(() => {
    const allKeys = menuItems.map(item => item.categoryKey).filter(Boolean);
    return ['all', ...new Set(allKeys)];
  }, [menuItems]);

  const filteredMenu = useMemo(() => {
    const grouped = categories
      .filter(key => key !== 'all')
      .map(key => ({
        categoryKey: key,
        items: menuItems.filter(item => item.categoryKey === key),
      }))
      .filter(section => section.items.length > 0);

    return activeCategory === 'all'
      ? grouped
      : grouped.filter(s => s.categoryKey === activeCategory);
  }, [menuItems, activeCategory, categories]);

  return (
    <section className={css['menu-section']}>
      <div className={`${css.bean} ${css['coffee-bean4']}`}></div>
      <div className={`${css.bean} ${css['coffee-bean5']}`}></div>

      <div className={css['menu-container']}>
        <header className={css['menu-header-wrapper']}>
          <h2 className={css['menu-title']}>{t('menu_title')}</h2>
          <div className={`${css.bean} ${css['coffee-bean1']}`}></div>
          <div className={`${css.bean} ${css['coffee-bean2']}`}></div>
          <div className={`${css.bean} ${css['coffee-bean3']}`}></div>
        </header>

        {!loading && (
          <nav className={css['menu-filter']}>
            {categories.map(key => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`${css['filter-btn']} ${activeCategory === key ? css.active : ''}`}
              >
                {t(`categories.${key}`)}
              </button>
            ))}
          </nav>
        )}

        <div className={css['menu-grid-container']} key={activeCategory}>
          {loading ? (
            <div className={css['menu-items-grid']}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className={css['skeleton-card']}>
                  <div className={css['skeleton-shimmer']}></div>
                </div>
              ))}
            </div>
          ) : (
            filteredMenu.map((section, index) => {
              const currentLimit = visibleCounts[section.categoryKey] || 4;
              const hasMore = section.items.length > currentLimit;
              const visibleItems = section.items.slice(0, currentLimit);

              return (
                <div
                  key={section.categoryKey}
                  className={css['menu-category-block']}
                  style={{ '--i': index }}
                >
                  <h4 className={css['category-title']}>
                    <span>{t(`categories.${section.categoryKey}`)}</span>
                  </h4>
                  <div className={css['menu-items-grid']}>
                    {visibleItems.map(item => (
                      <CardMenu
                        key={item._id}
                        item={item}
                        formatPrice={formatPrice}
                        onOpenModal={() => setSelectedItem(item)}
                      />
                    ))}
                  </div>
                  <div className={css['controls-wrapper']}>
                    {hasMore && (
                      <button
                        className={css['load-more-btn']}
                        onClick={() => handleShowMore(section.categoryKey)}
                      >
                        {t('show_more')}
                      </button>
                    )}
                    {currentLimit > 4 && (
                      <button
                        className={css['collapse-btn']}
                        onClick={() => handleCollapse(section.categoryKey)}
                      >
                        {t('collapse')}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Викликаємо новий компонент модалки */}
      <MenuModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onSelect={handleSelectItem}
        formatPrice={formatPrice}
      />
    </section>
  );
};

export default Menu;
