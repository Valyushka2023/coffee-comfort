// import { useState, useEffect, useMemo } from 'react';
// import { useTranslation } from 'react-i18next';
// import axios from 'axios';
// import CardMenu from '../Ui/Cards/CardMenu/CardMenu.jsx';
// import css from './Menu.module.css';

// const Menu = () => {
//   const { t, i18n: _i18n } = useTranslation('menu');
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const formatPrice = price => {
//     const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
//     const currency = t('currency_symbol', 'грн'); // Беремо символ з JSON
//     return `${numericPrice} ${currency}`;
//   };

//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         const baseUrl =
//           import.meta.env.VITE_API_URL || 'https://coffee-comfort.onrender.com';
//         const response = await axios.get(`${baseUrl}/api/menu`);
//         setMenuItems(response.data);
//       } catch (err) {
//         console.error('Error loading menu:', err);
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

//   return (
//     <section className={css['menu-section']}>
//       <div className={`${css.bean} ${css['coffee-bean4']}`}></div>
//       <div className={`${css.bean} ${css['coffee-bean5']}`}></div>

//       <div className={css['menu-container']}>
//         <header className={css['menu-header-wrapper']}>
//           <h2 className={css['menu-title']}>{t('menu_title')}</h2>
//           <div className={`${css.bean} ${css['coffee-bean1']}`}></div>
//           <div className={`${css.bean} ${css['coffee-bean2']}`}></div>
//           <div className={`${css.bean} ${css['coffee-bean3']}`}></div>
//         </header>

//         {/* Навігація фільтрів */}
//         {!loading && (
//           <nav className={css['menu-filter']}>
//             {categories.map(catKey => (
//               <button
//                 key={catKey}
//                 onClick={() => setActiveCategory(catKey)}
//                 className={`${css['filter-btn']} ${
//                   activeCategory === catKey ? css.active : ''
//                 }`}
//               >
//                 {t(`categories.${catKey}`)}
//               </button>
//             ))}
//           </nav>
//         )}

//         <div className={css['menu-grid-container']} key={activeCategory}>
//           {loading ? (
//             <div className={css['menu-items-grid']}>
//               {[...Array(6)].map((_, index) => (
//                 <div key={index} className={css['skeleton-card']}>
//                   <div className={css['skeleton-shimmer']}></div>
//                 </div>
//               ))}
//             </div>
//           ) : filteredMenu.length > 0 ? (
//             filteredMenu.map((section, index) => (
//               <div
//                 key={section.categoryKey}
//                 className={css['menu-category-block']}
//                 style={{ '--i': index }}
//               >
//                 <h4 className={css['category-title']}>
//                   <span>{t(`categories.${section.categoryKey}`)}</span>
//                 </h4>

//                 <div className={css['menu-items-grid']}>
//                   {section.items.map(item => (
//                     <CardMenu
//                       key={item._id}
//                       item={item}
//                       formatPrice={formatPrice}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className={css['no-data']}>{t('no_data')}</div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Menu;
/**/
// import { useState, useEffect, useMemo } from 'react';
// import { useTranslation } from 'react-i18next';
// import axios from 'axios';
// import CardMenu from '../Ui/Cards/CardMenu/CardMenu.jsx';
// import MenuSkeletons from './MenuSkeletons';
// import css from './Menu.module.css';

// const Menu = () => {
//   // Використовуємо лише t, щоб ESLint не сварився на невикористаний i18n
//   const { t, i18n } = useTranslation('menu');
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Функція для форматування ціни
//   const formatPrice = price => {
//     const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
//     // Беремо символ валюти з JSON (menu.json), якщо немає - за замовчуванням 'грн'
//     const currency = t('currency_symbol', 'грн');
//     return `${numericPrice} ${currency}`;
//   };

//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         const baseUrl =
//           import.meta.env.VITE_API_URL || 'https://coffee-comfort.onrender.com';
//         const response = await axios.get(`${baseUrl}/api/menu`);
//         setMenuItems(response.data);
//       } catch (err) {
//         console.error('Error loading menu:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMenu();
//   }, []);

//   // Формуємо список категорій на основі даних з БД
//   const categories = useMemo(() => {
//     const dbCategories = [
//       ...new Set(menuItems.map(item => item.categoryKey).filter(Boolean)),
//     ];
//     return ['all', ...dbCategories];
//   }, [menuItems]);

//   // Фільтруємо та групуємо меню
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

//   return (
//     <section className={css['menu-section']}>
//       <div className={`${css.bean} ${css['coffee-bean4']}`}></div>
//       <div className={`${css.bean} ${css['coffee-bean5']}`}></div>

//       <div className={css['menu-container']}>
//         <header className={css['menu-header-wrapper']}>
//           <h2 className={css['menu-title']}>{t('menu_title')}</h2>
//           <div className={`${css.bean} ${css['coffee-bean1']}`}></div>
//           <div className={`${css.bean} ${css['coffee-bean2']}`}></div>
//           <div className={`${css.bean} ${css['coffee-bean3']}`}></div>
//         </header>

//         {/* Навігація фільтрів */}
//         {!loading && (
//           <nav className={css['menu-filter']}>
//             {categories.map(catKey => (
//               <button
//                 key={catKey}
//                 onClick={() => setActiveCategory(catKey)}
//                 className={`${css['filter-btn']} ${
//                   activeCategory === catKey ? css.active : ''
//                 }`}
//               >
//                 {t(`categories.${catKey}`, catKey)}
//               </button>
//             ))}
//           </nav>
//         )}

//         {/* Контейнер сітки (без ключа activeCategory для кращої продуктивності) */}
//         <div className={css['menu-grid-container']}>
//           {loading ? (
//             /* СКЕЛЕТОНИ */
//             <div className={css['menu-items-grid']}>
//               {[...Array(6)].map((_, index) => (
//                 <div key={index} className={css['skeleton-card']}>
//                   <div className={css['skeleton-shimmer']}></div>
//                 </div>
//               ))}
//             </div>
//           ) : filteredMenu.length > 0 ? (
//             /* СПИСОК КАТЕГОРІЙ ТА ТОВАРІВ */
//             filteredMenu.map((section, index) => (
//               <div
//                 key={section.categoryKey}
//                 className={css['menu-category-block']}
//                 style={{ '--i': index }}
//               >
//                 <h4 className={css['category-title']}>
//                   <span>
//                     {t(
//                       `categories.${section.categoryKey}`,
//                       section.categoryKey
//                     )}
//                   </span>
//                 </h4>

//                 <div className={css['menu-items-grid']}>
//                   {section.items.map(item => (
//                     <CardMenu
//                       key={item._id}
//                       item={item}
//                       formatPrice={formatPrice}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ))
//           ) : (
//             /* ПОВІДОМЛЕННЯ ЯКЩО НЕМАЄ ДАНИХ */
//             <div className={css['no-data']}>{t('no_data')}</div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Menu;
/**/
import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import CardMenu from '../Ui/Cards/CardMenu/CardMenu.jsx';
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
        console.error('Error loading menu:', err);
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

        {/* Навігація фільтрів */}
        {!loading && (
          <nav className={css['menu-filter']}>
            {categories.map(catKey => (
              <button
                key={catKey}
                onClick={() => setActiveCategory(catKey)}
                className={`${css['filter-btn']} ${
                  activeCategory === catKey ? css.active : ''
                }`}
              >
                {t(`categories.${catKey}`)}
              </button>
            ))}
          </nav>
        )}

        <div className={css['menu-grid-container']} key={activeCategory}>
          {loading ? (
            /* Скелетони під час завантаження */
            <div className={css['menu-items-grid']}>
              {[...Array(6)].map((_, index) => (
                <div key={index} className={css['skeleton-card']}>
                  <div className={css['skeleton-shimmer']}></div>
                </div>
              ))}
            </div>
          ) : filteredMenu.length > 0 ? (
            filteredMenu.map(
              (
                section,
                index // Додаємо index тут
              ) => (
                <div
                  key={section.categoryKey}
                  className={css['menu-category-block']}
                  style={{ '--i': index }} // Передаємо індекс у CSS
                >
                  <h4 className={css['category-title']}>
                    <span>{t(`categories.${section.categoryKey}`)}</span>
                  </h4>
                  {/* ... далі твій код сітки з товарами */}
                  <div className={css['menu-items-grid']}>
                    {section.items.map(item => (
                      <CardMenu
                        key={item._id}
                        item={item}
                        formatPrice={formatPrice}
                      />
                    ))}
                  </div>
                </div>
              )
            )
          ) : (
            <div className={css['no-data']}>{t('no_data')}</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Menu;
