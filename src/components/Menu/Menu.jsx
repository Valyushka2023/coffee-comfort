// import { useState, useEffect, useMemo } from 'react';
// import { useTranslation } from 'react-i18next';
// import axios from 'axios';
// import css from './Menu.module.css';

// const Menu = () => {
//   // 1. Додаємо i18n сюди
//   const { t, i18n } = useTranslation('menu');
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 2. Додаємо функцію форматування ціни тут
//   const formatPrice = price => {
//     // Якщо в базі ціна вже з текстом "грн", нам треба отримати лише число
//     const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

//     // Визначаємо код валюти: 'uk' -> UAH, інші (en) -> USD
//     const currency = i18n.language === 'uk' ? 'UAH' : 'USD';

//     return new Intl.NumberFormat(i18n.language, {
//       style: 'currency',
//       currency: currency,
//       minimumFractionDigits: 0,
//     }).format(numericPrice);
//   };

//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         const baseUrl =
//           import.meta.env.VITE_API_URL || 'https://coffee-comfort.onrender.com';
//         const response = await axios.get(`${baseUrl}/api/menu`);
//         setMenuItems(response.data);
//       } catch (err) {
//         console.error('Помилка завантаження меню:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMenu();
//   }, []);

//   const categories = useMemo(() => {
//     const dbCategories = [
//       ...new Set(menuItems.map(item => item.categoryKey).filter(Boolean)),
//     ];
//     return ['all', ...dbCategories];
//   }, [menuItems]);

//   const filteredMenu = useMemo(() => {
//     const grouped = categories
//       .filter(cat => cat !== 'all')
//       .map(catKey => ({
//         categoryKey: catKey,
//         items: menuItems.filter(item => item.categoryKey === catKey),
//       }))
//       .filter(section => section.items.length > 0);

//     if (activeCategory === 'all') return grouped;
//     return grouped.filter(section => section.categoryKey === activeCategory);
//   }, [menuItems, activeCategory, categories]);

//   const getTranslation = (path, fallback) => {
//     const translated = t(path);
//     return translated !== path ? translated : fallback;
//   };

//   const renderMenuItem = item => {
//     const itemKey = item.Key || item.key;
//     const name = getTranslation(`items.${itemKey}.name`, itemKey);
//     const description = getTranslation(`items.${itemKey}.desc`, '');

//     return (
//       <div key={item._id} className={css['menu-card']}>
//         <div className={css['item-photo-wrapper']}>
//           <img
//             src={item.img || 'https://via.placeholder.com/150'}
//             alt={name}
//             className={css['item-photo']}
//           />
//         </div>
//         <div className={css['item-content']}>
//           <div className={css['item-header-row']}>
//             <h4 className={css['item-name']}>{name}</h4>
//             <span className={css['item-price']}>{formatPrice(item.price)}</span>
//           </div>
//           {description && (
//             <p className={css['item-description']}>{description}</p>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // if (loading) return <div className={css.loading}>Завантаження...</div>;
//   if (loading) {
//     return (
//       <div className={css['loading-container']}>
//         <div className={css.spinner}></div> {/* Можна додати спінер */}
//         <p>{t('loading')}</p>
//       </div>
//     );
//   }

//   return (
//     <section className={css['menu-section']}>
//       {/* Нижні зерна, прив'язані до секції */}
//       <div className={`${css['bean']} ${css['coffee-bean4']}`}></div>
//       <div className={`${css['bean']} ${css['coffee-bean5']}`}></div>

//       <div className={css['menu-container']}>
//         <header className={css['menu-header-wrapper']}>
//           <h2 className={css['menu-title']}>{t('menu_title')}</h2>

//           {/* Верхні зерна тепер всередині блоку заголовка */}
//           <div className={`${css['bean']} ${css['coffee-bean1']}`}></div>
//           <div className={`${css['bean']} ${css['coffee-bean2']}`}></div>
//           <div className={`${css['bean']} ${css['coffee-bean3']}`}></div>
//         </header>

//         <nav className={css['menu-filter']}>
//           {categories.map(catKey => (
//             <button
//               key={catKey}
//               onClick={() => setActiveCategory(catKey)}
//               className={`${css['filter-btn']} ${activeCategory === catKey ? css.active : ''}`}
//             >
//               {t(`categories.${catKey}`)}
//             </button>
//           ))}
//         </nav>

//         <div className={css['menu-grid-container']}>
//           {filteredMenu.length > 0 ? (
//             filteredMenu.map(section => (
//               <div
//                 key={section.categoryKey}
//                 className={css['menu-category-block']}
//               >
//                 <h3 className={css['category-title']}>
//                   <span>{t(`categories.${section.categoryKey}`)}</span>
//                 </h3>
//                 <div className={css['items-grid']}>
//                   {section.items.map(renderMenuItem)}
//                 </div>
//               </div>
//             ))
//           ) : (
//             // <div className={css['no-data']}>Меню порожнє.</div>
//             <div className={css['no-data']}>{t('no_data')}</div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Menu;
import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Loader from '../Ui/Loader/Loader.jsx';
import css from './Menu.module.css';

const Menu = () => {
  const { t, i18n } = useTranslation('menu');
  const [activeCategory, setActiveCategory] = useState('all');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } catch (err) {
        console.error('Помилка завантаження меню:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const categories = useMemo(() => {
    const dbCategories = [
      ...new Set(menuItems.map(item => item.categoryKey).filter(Boolean)),
    ];
    return ['all', ...dbCategories];
  }, [menuItems]);

  const filteredMenu = useMemo(() => {
    const grouped = categories
      .filter(cat => cat !== 'all')
      .map(catKey => ({
        categoryKey: catKey,
        items: menuItems.filter(item => item.categoryKey === catKey),
      }))
      .filter(section => section.items.length > 0);

    if (activeCategory === 'all') return grouped;
    return grouped.filter(section => section.categoryKey === activeCategory);
  }, [menuItems, activeCategory, categories]);

  const getTranslation = (path, fallback) => {
    const translated = t(path);
    return translated !== path ? translated : fallback;
  };

  const renderMenuItem = item => {
    const itemKey = item.key || item.Key;
    const name = getTranslation(`items.${itemKey}.name`, item.name || itemKey);
    const description = getTranslation(
      `items.${itemKey}.desc`,
      item.desc || ''
    );

    return (
      <div key={item._id} className={css['menu-card']}>
        <div className={css['item-photo-wrapper']}>
          <img
            src={item.img || '/images/default-coffee.webp'}
            alt={name}
            className={css['item-photo']}
          />
        </div>
        <div className={css['item-content']}>
          <div className={css['item-header-row']}>
            <h4 className={css['item-name']}>{name}</h4>
            <span className={css['item-price']}>{formatPrice(item.price)}</span>
          </div>
          {description && (
            <p className={css['item-description']}>{description}</p>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={css['loading-wrapper']}>
        <Loader type="container" color="#6f4e37" size={60} />
        <p className={css['loading-text']}>{t('loading')}</p>
      </div>
    );
  }

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
                  {section.items.map(renderMenuItem)}
                </div>
              </div>
            ))
          ) : (
            <div className={css['no-data']}>{t('no_data')}</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Menu;
