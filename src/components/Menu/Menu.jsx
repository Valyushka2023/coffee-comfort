import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import css from './Menu.module.css';

// Тепер тут ТІЛЬКИ структура. Ніяких текстів чи цін!
const menuData = [
  {
    categoryKey: 'drinks',
    items: [
      { id: 1, key: 'cappuccino', top: true },
      { id: 2, key: 'flatWhite', top: false },
    ],
  },
  {
    categoryKey: 'bakery',
    items: [{ id: 4, key: 'croissant', top: true }],
  },
];

const Menu = () => {
  const { t } = useTranslation('menu');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', ...menuData.map(item => item.categoryKey)];

  const filteredMenu =
    activeCategory === 'all'
      ? menuData
      : menuData.filter(section => section.categoryKey === activeCategory);

  return (
    <section className={css['menu-section']}>
      <div className={css['menu-container']}>
        <header className={css['menu-header']}>
          <h2 className={css['menu-title']}>{t('menu_title')}</h2>
          <div className={css['title-underline']}></div>
          <p className={css['menu-subtitle']}>{t('menu_subtitle')}</p>
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
          {filteredMenu.map(section => (
            <div
              key={section.categoryKey}
              className={css['menu-category-block']}
            >
              <h3 className={css['category-title']}>
                <span>{t(`categories.${section.categoryKey}`)}</span>
                <div className={css['category-line']}></div>
              </h3>

              <div className={css['items-grid']}>
                {section.items.map(item => (
                  <div key={item.id} className={css['menu-item']}>
                    <div className={css['item-info']}>
                      <div className={css['item-header']}>
                        <h4 className={css['item-name']}>
                          {t(`items.${item.key}.name`)}
                        </h4>
                        {item.top && (
                          <span className={css['top-badge']}>
                            🔥 {t('ui.top')}
                          </span>
                        )}
                      </div>
                      <p className={css['item-description']}>
                        {t(`items.${item.key}.desc`)}
                      </p>
                    </div>

                    <div className={css['item-price-block']}>
                      <span className={css['item-price']}>
                        {t(`items.${item.key}.price`)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
